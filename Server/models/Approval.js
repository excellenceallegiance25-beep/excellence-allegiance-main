const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  employeeId: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
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
    required: true,
    trim: true
  },
  
  // Approval Details
  type: {
    type: String,
    enum: ['registration', 'role_change', 'profile_update', 'permission_request'],
    default: 'registration'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled', 'on_hold'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Role Assignment
  assignedRole: {
    type: String,
    enum: ['employee', 'manager', 'admin', 'user'],
    default: 'employee'
  },
  
  // Review Information
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewerName: {
    type: String
  },
  reviewComments: {
    type: String,
    maxlength: 500
  },
  reviewNotes: [{
    comment: String,
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    commentedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Admin Notes
  adminNotes: {
    type: String,
    maxlength: 1000
  },
  internalNotes: {
    type: String,
    maxlength: 1000
  },
  
  // Timestamps
  requestedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  
  // Metadata
  ipAddress: String,
  userAgent: String,
  
  // Expiry
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
approvalSchema.index({ userId: 1, status: 1 });
approvalSchema.index({ status: 1, createdAt: -1 });
approvalSchema.index({ reviewedBy: 1, reviewedAt: -1 });

// Virtual for time elapsed
approvalSchema.virtual('timeElapsed').get(function() {
  const diff = Date.now() - this.requestedAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return 'Just now';
});

// Virtual for isExpired
approvalSchema.virtual('isExpired').get(function() {
  return this.expiresAt && new Date() > this.expiresAt;
});

// Pre-save middleware
approvalSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'approved') {
    this.reviewedAt = new Date();
  }
  next();
});

// Static method to get pending count
approvalSchema.statics.getPendingCount = async function() {
  return await this.countDocuments({ status: 'pending' });
};

// Static method to get approval statistics
approvalSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgResponseTime: {
          $avg: {
            $subtract: ['$reviewedAt', '$requestedAt']
          }
        }
      }
    }
  ]);
  
  return stats;
};

module.exports = mongoose.model('Approval', approvalSchema);