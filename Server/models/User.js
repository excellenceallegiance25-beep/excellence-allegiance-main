const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters'],
    maxlength: [50, 'Full name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Please enter a valid phone number']
  },
  
  // Employment Information
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: true,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: [
      'Information Technology',
      'Human Resources', 
      'Finance',
      'Marketing',
      'Sales',
      'Operations',
      'Research & Development',
      'Administration'
    ]
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  managerEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid manager email']
  },
  
  // Account Information
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  
  // 🔴 ROLE & APPROVAL SYSTEM (Enhanced)
  role: {
    type: String,
    enum: ['pending', 'employee', 'manager', 'admin', 'super_admin'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['pending_approval', 'active', 'suspended', 'inactive'],
    default: 'pending_approval'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  approvalNote: {
    type: String
  },
  
  // Email Verification
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerifiedAt: {
    type: Date
  },
  
  // OTP Fields
  otp: {
    type: String,
    select: false
  },
  otpExpiry: {
    type: Date,
    select: false
  },
  otpPurpose: {
    type: String,
    enum: ['registration', 'password_reset', 'login'],
    select: false
  },
  otpAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  
  // Profile Information
  profile: {
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say']
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    emergencyContact: {
      name: String,
      relation: String,
      phone: String
    },
    education: [{
      degree: String,
      institution: String,
      year: Number,
      grade: String
    }],
    skills: [String],
    bio: {
      type: String,
      maxlength: 500
    },
    avatar: {
      type: String,
      default: 'default-avatar.png'
    }
  },
  
  // System Fields
  lastLogin: Date,
  lastLoginIP: String,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full profile
userSchema.virtual('profileComplete').get(function() {
  return !!(this.profile.dateOfBirth && 
           this.profile.address?.city && 
           this.profile.emergencyContact?.phone);
});

// Update timestamps
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);