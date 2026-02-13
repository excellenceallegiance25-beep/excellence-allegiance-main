const User = require('../models/User');
const Approval = require('../models/Approval');
const emailService = require('../utils/emailService');

class AdminController {
  // 📊 GET DASHBOARD STATS
  async getDashboardStats(req, res) {
    try {
      const [
        pendingCount,
        approvedCount,
        totalUsers,
        adminCount,
        activeToday,
        recentRegistrations
      ] = await Promise.all([
        User.countDocuments({ status: 'pending_approval', role: 'pending' }),
        User.countDocuments({ status: 'active', role: { $in: ['employee', 'manager'] } }),
        User.countDocuments(),
        User.countDocuments({ role: { $in: ['admin', 'super_admin'] } }),
        User.countDocuments({
          lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        }),
        User.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select('fullName email role status createdAt')
      ]);

      res.json({
        success: true,
        stats: {
          pending: pendingCount,
          approved: approvedCount,
          total: totalUsers,
          admins: adminCount,
          activeToday,
          recentRegistrations
        }
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch dashboard statistics'
      });
    }
  }

  // 👥 GET PENDING USERS
  async getPendingUsers(req, res) {
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
          { employeeId: { $regex: search, $options: 'i' } }
        ];
      }

      const pendingUsers = await User.find(query)
        .select('-password -otp -otpExpiry -__v')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await User.countDocuments(query);

      res.json({
        success: true,
        users: pendingUsers,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      });
    } catch (error) {
      console.error('Get pending users error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch pending users'
      });
    }
  }

  // ✅ APPROVE USER
  async approveUser(req, res) {
    try {
      const { userId } = req.params;
      const { role, note } = req.body;
      const adminId = req.user.id;

      // Validate role
      if (!role || !['employee', 'manager'].includes(role)) {
        return res.status(400).json({
          success: false,
          error: 'Please select a valid role (employee/manager)'
        });
      }

      // Find user
      const user = await User.findById(userId);
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
      user.approvalNote = note || '';
      await user.save();

      // Create approval record
      await Approval.create({
        userId: user._id,
        approvedBy: adminId,
        role,
        status: 'approved',
        note: note || '',
        approvedAt: new Date()
      });

      // Send approval email
      await emailService.sendApprovalEmail(
        user.email,
        user.fullName,
        role,
        note
      );

      // Get admin info for response
      const admin = await User.findById(adminId).select('fullName email');

      res.json({
        success: true,
        message: `User approved successfully as ${role}`,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          status: user.status,
          approvedBy: admin,
          approvedAt: user.approvedAt
        }
      });

    } catch (error) {
      console.error('Approve user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to approve user'
      });
    }
  }

  // ❌ REJECT USER
  async rejectUser(req, res) {
    try {
      const { userId } = req.params;
      const { reason } = req.body;
      const adminId = req.user.id;

      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Store user info for email
      const userEmail = user.email;
      const userName = user.fullName;

      // Create rejection record
      await Approval.create({
        userId: user._id,
        approvedBy: adminId,
        status: 'rejected',
        note: reason || 'No reason provided',
        approvedAt: new Date()
      });

      // Delete user
      await User.findByIdAndDelete(userId);

      // Send rejection email
      await emailService.sendRejectionEmail(
        userEmail,
        userName,
        reason
      );

      res.json({
        success: true,
        message: 'User registration rejected successfully'
      });

    } catch (error) {
      console.error('Reject user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to reject user'
      });
    }
  }

  // 👥 GET APPROVED USERS
  async getApprovedUsers(req, res) {
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
        currentPage: page,
        total
      });
    } catch (error) {
      console.error('Get approved users error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch approved users'
      });
    }
  }

  // 👑 GET ALL ADMINS
  async getAdmins(req, res) {
    try {
      const admins = await User.find({
        role: { $in: ['admin', 'super_admin'] },
        isActive: true
      })
        .select('fullName email role username lastLogin')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        admins
      });
    } catch (error) {
      console.error('Get admins error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch admins'
      });
    }
  }

  // 📈 GET USER STATISTICS
  async getUserStatistics(req, res) {
    try {
      const stats = await User.aggregate([
        {
          $group: {
            _id: '$department',
            total: { $sum: 1 },
            active: {
              $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
            },
            pending: {
              $sum: { $cond: [{ $eq: ['$status', 'pending_approval'] }, 1, 0] }
            }
          }
        },
        { $sort: { total: -1 } }
      ]);

      const roleStats = await User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        departmentStats: stats,
        roleStats
      });
    } catch (error) {
      console.error('Get user statistics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user statistics'
      });
    }
  }

  // 🚫 SUSPEND USER
  async suspendUser(req, res) {
    try {
      const { userId } = req.params;
      const { reason } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        {
          status: 'suspended',
          isActive: false,
          suspensionReason: reason,
          suspendedAt: new Date(),
          suspendedBy: req.user.id
        },
        { new: true }
      );

      // Send suspension email
      await emailService.sendAccountSuspensionEmail(
        user.email,
        user.fullName,
        reason
      );

      res.json({
        success: true,
        message: 'User suspended successfully',
        user
      });
    } catch (error) {
      console.error('Suspend user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to suspend user'
      });
    }
  }

  // 🔄 ACTIVATE USER
  async activateUser(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
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
      );

      // Send activation email
      await emailService.sendAccountActivationEmail(
        user.email,
        user.fullName
      );

      res.json({
        success: true,
        message: 'User activated successfully',
        user
      });
    } catch (error) {
      console.error('Activate user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to activate user'
      });
    }
  }
}

module.exports = new AdminController();