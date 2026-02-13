const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Approval = require('../models/Approval');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const emailService = require('../utils/emailService');

// ============ DASHBOARD ROUTES ============

// 📊 Get Dashboard Statistics
router.get('/dashboard-stats', protect, adminOnly, async (req, res) => {
  try {
    const [
      pendingCount,
      approvedCount,
      totalUsers,
      adminCount,
      activeToday,
      pendingApprovals
    ] = await Promise.all([
      User.countDocuments({ status: 'pending_approval', role: 'pending' }),
      User.countDocuments({ status: 'active', role: { $in: ['employee', 'manager'] } }),
      User.countDocuments(),
      User.countDocuments({ role: { $in: ['admin', 'super_admin'] } }),
      User.countDocuments({
        lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }),
      Approval.countDocuments({ status: 'pending' })
    ]);

    // Get recent registrations
    const recentRegistrations = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName email role status createdAt');

    res.json({
      success: true,
      stats: {
        pending: pendingCount,
        approved: approvedCount,
        total: totalUsers,
        admins: adminCount,
        activeToday,
        pendingApprovals,
        recentRegistrations
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch dashboard statistics' 
    });
  }
});

// ============ USER MANAGEMENT ROUTES ============

// 👥 Get Pending Approvals (with pagination & search)
router.get('/pending-approvals', protect, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    const query = {
      status: 'pending_approval',
      role: 'pending'
    };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    const pendingUsers = await User.find(query)
      .select('-password -otp -otpExpiry -__v')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    // Also get approval records
    const approvalRecords = await Approval.find({
      status: 'pending',
      type: 'registration'
    }).populate('userId', 'fullName email');

    res.json({
      success: true,
      users: pendingUsers,
      approvals: approvalRecords,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Get pending approvals error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch pending approvals' 
    });
  }
});

// ✅ Approve User
router.post('/approve-user/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, comments } = req.body;
    const adminId = req.user.id;

    // Validate role
    if (!role || !['employee', 'manager'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Please select a valid role (employee/manager)'
      });
    }

    // Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if already approved
    if (user.status === 'active') {
      return res.status(400).json({
        success: false,
        error: 'User is already approved'
      });
    }

    // Update user
    user.role = role;
    user.status = 'active';
    user.isApproved = true;
    user.isActive = true;
    user.approvedBy = adminId;
    user.approvedAt = new Date();
    user.approvalNote = comments || '';
    await user.save();

    // Create approval record
    const approval = await Approval.create({
      userId: user._id,
      userEmail: user.email,
      userName: user.fullName,
      employeeId: user.employeeId,
      department: user.department,
      position: user.position,
      type: 'registration',
      status: 'approved',
      assignedRole: role,
      reviewedBy: adminId,
      reviewerName: req.user.fullName,
      reviewComments: comments,
      reviewedAt: new Date()
    });

    // Get admin info
    const admin = await User.findById(adminId).select('fullName email');

    // Send approval email
    try {
      await emailService.sendApprovalEmail(
        user.email,
        user.fullName,
        role,
        comments
      );
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
    }

    res.json({
      success: true,
      message: `✅ User approved successfully as ${role}`,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
        approvedBy: admin,
        approvedAt: user.approvedAt
      },
      approval
    });

  } catch (error) {
    console.error('Approve user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to approve user'
    });
  }
});

// ❌ Reject User
router.post('/reject-user/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const adminId = req.user.id;

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Store user info for email and approval record
    const userEmail = user.email;
    const userName = user.fullName;
    const userData = {
      email: user.email,
      fullName: user.fullName,
      employeeId: user.employeeId,
      department: user.department,
      position: user.position
    };

    // Create rejection record
    const approval = await Approval.create({
      userId: user._id,
      userEmail: user.email,
      userName: user.fullName,
      employeeId: user.employeeId,
      department: user.department,
      position: user.position,
      type: 'registration',
      status: 'rejected',
      reviewedBy: adminId,
      reviewerName: req.user.fullName,
      reviewComments: reason || 'No reason provided',
      reviewedAt: new Date()
    });

    // Delete user
    await User.findByIdAndDelete(id);

    // Send rejection email
    try {
      await emailService.sendRejectionEmail(
        userEmail,
        userName,
        reason || 'Your registration was rejected'
      );
    } catch (emailError) {
      console.error('Failed to send rejection email:', emailError);
    }

    res.json({
      success: true,
      message: '❌ User registration rejected successfully',
      approval
    });

  } catch (error) {
    console.error('Reject user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reject user'
    });
  }
});

// 👥 Get Approved Users
router.get('/approved-users', protect, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;

    const query = {
      status: 'active',
      role: { $in: ['employee', 'manager'] }
    };

    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    const approvedUsers = await User.find(query)
      .select('-password -otp -otpExpiry -__v')
      .populate('approvedBy', 'fullName email')
      .sort({ approvedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users: approvedUsers,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Get approved users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch approved users'
    });
  }
});

// 👑 Get All Admins
router.get('/admins', protect, adminOnly, async (req, res) => {
  try {
    const admins = await User.find({
      role: { $in: ['admin', 'super_admin'] },
      isActive: true
    })
      .select('fullName email role username lastLogin createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: admins.length,
      admins
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admins'
    });
  }
});

// 📈 Get Approval History
router.get('/approval-history', protect, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 20, status = '' } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const approvals = await Approval.find(query)
      .populate('userId', 'fullName email')
      .populate('reviewedBy', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Approval.countDocuments(query);

    res.json({
      success: true,
      approvals,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Get approval history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch approval history'
    });
  }
});

// 🚫 Suspend User
router.put('/suspend-user/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        status: 'suspended',
        isActive: false,
        suspensionReason: reason,
        suspendedAt: new Date(),
        suspendedBy: req.user.id
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Send suspension email
    try {
      await emailService.sendAccountSuspensionEmail(
        user.email,
        user.fullName,
        reason
      );
    } catch (emailError) {
      console.error('Failed to send suspension email:', emailError);
    }

    res.json({
      success: true,
      message: '⚠️ User suspended successfully',
      user
    });
  } catch (error) {
    console.error('Suspend user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to suspend user'
    });
  }
});

// 🔄 Activate User
router.put('/activate-user/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        status: 'active',
        isActive: true,
        suspensionReason: null,
        suspendedAt: null,
        suspendedBy: null,
        activatedAt: new Date(),
        activatedBy: req.user.id
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Send activation email
    try {
      await emailService.sendAccountActivationEmail(
        user.email,
        user.fullName
      );
    } catch (emailError) {
      console.error('Failed to send activation email:', emailError);
    }

    res.json({
      success: true,
      message: '✅ User activated successfully',
      user
    });
  } catch (error) {
    console.error('Activate user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to activate user'
    });
  }
});

// 📊 Get User Statistics by Department
router.get('/department-stats', protect, adminOnly, async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $match: {
          role: { $in: ['employee', 'manager'] },
          status: 'active'
        }
      },
      {
        $group: {
          _id: '$department',
          total: { $sum: 1 },
          managers: {
            $sum: { $cond: [{ $eq: ['$role', 'manager'] }, 1, 0] }
          },
          employees: {
            $sum: { $cond: [{ $eq: ['$role', 'employee'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    res.json({
      success: true,
      departmentStats: stats
    });
  } catch (error) {
    console.error('Department stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch department statistics'
    });
  }
});

module.exports = router;