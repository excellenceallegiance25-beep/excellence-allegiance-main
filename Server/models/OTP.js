const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  otp: {
    type: String,
    required: [true, 'OTP is required'],
    minlength: 6,
    maxlength: 6
  },
  purpose: {
    type: String,
    enum: ['registration', 'password_reset', 'login', 'email_change'],
    default: 'registration'
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  },
  attempts: {
    type: Number,
    default: 0
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // TTL index - auto delete after 10 minutes
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster queries
otpSchema.index({ email: 1, otp: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

// Check if OTP is expired
otpSchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Verify OTP method
otpSchema.methods.verify = function(inputOtp) {
  // Check if already used
  if (this.isUsed) {
    throw new Error('OTP already used');
  }

  // Check if expired
  if (this.isExpired()) {
    throw new Error('OTP expired');
  }

  // Check attempts
  if (this.attempts >= 5) {
    throw new Error('Maximum verification attempts exceeded');
  }

  // Increment attempts
  this.attempts += 1;

  // Check OTP match
  if (this.otp !== inputOtp) {
    return false;
  }

  // Mark as used
  this.isUsed = true;
  return true;
};

// Static method to generate OTP
otpSchema.statics.generateOTP = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Static method to clean expired OTPs
otpSchema.statics.cleanExpired = async function() {
  return await this.deleteMany({ 
    $or: [
      { expiresAt: { $lt: new Date() } },
      { isUsed: true }
    ]
  });
};

module.exports = mongoose.model('OTP', otpSchema);