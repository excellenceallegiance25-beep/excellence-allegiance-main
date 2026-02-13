const User = require('../models/User');
const OTP = require('../models/OTP');
const Approval = require('../models/Approval');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailService = require('../utils/emailService');
const { generateOTP } = require('../utils/otpGenerator');
const { generateToken } = require('../utils/tokenGenerator');

class AuthController {
  // 🔴 CHECK FIRST USER - Admin Creation Logic
  async checkFirstUser(req, res) {
    try {
      const userCount = await User.countDocuments();
      res.json({ 
        success: true,
        isFirstUser: userCount === 0 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // 📧 SEND OTP
  async sendOTP(req, res) {
    try {
      const { email, purpose = 'registration' } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required'
        });
      }

      // Generate 6-digit OTP
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Delete any existing OTP for this email
      await OTP.deleteMany({ email, isUsed: false });

      // Create new OTP
      await OTP.create({
        email,
        otp,
        purpose,
        expiresAt
      });

      // Send REAL email
      console.log(`📨 Sending OTP to: ${email}`);
      await emailService.sendOTP(email, otp);

      res.json({
        success: true,
        message: 'OTP sent successfully to your email'
      });

    } catch (error) {
      console.error('Send OTP error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to send OTP. Please try again.'
      });
    }
  }

  // ✅ VERIFY OTP
  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      // Find valid OTP
      const otpRecord = await OTP.findOne({
        email,
        otp,
        isUsed: false,
        expiresAt: { $gt: new Date() }
      });

      if (!otpRecord) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired OTP'
        });
      }

      // Mark OTP as used
      otpRecord.isUsed = true;
      await otpRecord.save();

      // If this is for registration, update user's email verification
      if (otpRecord.purpose === 'registration') {
        await User.findOneAndUpdate(
          { email },
          { 
            emailVerified: true,
            emailVerifiedAt: new Date()
          }
        );
      }

      res.json({
        success: true,
        message: 'OTP verified successfully'
      });

    } catch (error) {
      console.error('Verify OTP error:', error);
      res.status(500).json({
        success: false,
        error: 'OTP verification failed'
      });
    }
  }

  // 📝 REGISTER - Complete Registration with Admin Logic
  async register(req, res) {
    try {
      const {
        fullName,
        email,
        phone,
        employeeId,
        department,
        position,
        managerEmail,
        username,
        password,
        confirmPassword,
        otp
      } = req.body;

      // VALIDATION
      if (!fullName || !email || !employeeId || !department || !position || !username || !password) {
        return res.status(400).json({
          success: false,
          error: 'All required fields must be filled'
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          error: 'Passwords do not match'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Password must be at least 6 characters'
        });
      }

      // Check if user exists
      const existingUser = await User.findOne({
        $or: [
          { email: email.toLowerCase() },
          { employeeId },
          { username: username.toLowerCase() }
        ]
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ success: false, error: 'Email already registered' });
        }
        if (existingUser.employeeId === employeeId) {
          return res.status(400).json({ success: false, error: 'Employee ID already exists' });
        }
        if (existingUser.username === username) {
          return res.status(400).json({ success: false, error: 'Username already taken' });
        }
      }

      // Verify OTP
      const otpRecord = await OTP.findOne({
        email,
        otp,
        purpose: 'registration',
        isUsed: false,
        expiresAt: { $gt: new Date() }
      });

      if (!otpRecord) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired OTP. Please request new OTP.'
        });
      }

      // Mark OTP as used
      otpRecord.isUsed = true;
      await otpRecord.save();

      // 🔥 ADMIN DETECTION LOGIC
      const userCount = await User.countDocuments();
      const isFirstUser = userCount === 0;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Determine role and approval status
      let role = 'pending';
      let status = 'pending_approval';
      let isApproved = false;
      let isActive = false;

      if (isFirstUser) {
        role = 'super_admin';
        status = 'active';
        isApproved = true;
        isActive = true;
      }

      // Create user
      const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        phone,
        employeeId,
        department,
        position,
        managerEmail: managerEmail?.toLowerCase() || '',
        username: username.toLowerCase(),
        password: hashedPassword,
        role,
        status,
        isApproved,
        isActive,
        emailVerified: true,
        emailVerifiedAt: new Date()
      });

      // Generate JWT token for admin
      let token = null;
      if (isApproved) {
        token = jwt.sign(
          { 
            id: user._id, 
            email: user.email,
            role: user.role,
            isAdmin: true
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        // Send welcome email to admin
        await emailService.sendWelcomeEmail(user.email, user.fullName, user.role);
      } else {
        // Send pending approval email to user
        await emailService.sendPendingApprovalEmail(user.email, user.fullName);
        
        // Send notification to all admins
        const admins = await User.find({ 
          role: { $in: ['admin', 'super_admin'] },
          isActive: true 
        });
        
        for (const admin of admins) {
          await emailService.sendNewUserNotification(
            admin.email,
            admin.fullName,
            user
          );
        }
      }

      res.status(201).json({
        success: true,
        message: isFirstUser 
          ? '🎉 Super Admin account created successfully! You can now login.'
          : '✅ Registration successful! Your account is pending admin approval.',
        isAdmin: isFirstUser,
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          status: user.status,
          isApproved: user.isApproved
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'Registration failed. Please try again.'
      });
    }
  }

  // 🔐 LOGIN - Complete Login System
  async login(req, res) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res.status(400).json({
          success: false,
          error: 'Please provide email/username and password'
        });
      }

      // Find user by email OR username
      const user = await User.findOne({
        $or: [
          { email: identifier.toLowerCase() },
          { username: identifier.toLowerCase() }
        ]
      }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // Increment login attempts
        user.loginAttempts += 1;
        
        // Lock account after 5 failed attempts
        if (user.loginAttempts >= 5) {
          user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        }
        
        await user.save();
        
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Reset login attempts on successful login
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      user.lastLogin = new Date();
      user.lastLoginIP = req.ip;
      await user.save();

      // 🔴 CHECK ACCOUNT STATUS
      if (user.status === 'pending_approval') {
        return res.status(403).json({
          success: false,
          error: 'Your account is pending admin approval. You will receive an email once approved.',
          isPending: true
        });
      }

      if (user.status === 'suspended') {
        return res.status(403).json({
          success: false,
          error: 'Your account has been suspended. Please contact administrator.'
        });
      }

      if (user.status === 'inactive') {
        return res.status(403).json({
          success: false,
          error: 'Your account is inactive. Please contact administrator.'
        });
      }

      if (user.lockUntil && user.lockUntil > new Date()) {
        const minutesLeft = Math.ceil((user.lockUntil - new Date()) / (60 * 1000));
        return res.status(403).json({
          success: false,
          error: `Account locked. Please try again after ${minutesLeft} minutes.`
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          username: user.username,
          isApproved: user.isApproved,
          isActive: user.isActive
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Send login notification email
      await emailService.sendLoginNotification(
        user.email,
        user.fullName,
        req.ip,
        req.headers['user-agent']
      );

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          username: user.username,
          role: user.role,
          department: user.department,
          position: user.position,
          employeeId: user.employeeId,
          status: user.status,
          isApproved: user.isApproved,
          isActive: user.isActive,
          profileComplete: user.profileComplete
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Login failed. Please try again.'
      });
    }
  }

  // 👤 GET CURRENT USER
  async getMe(req, res) {
    try {
      const user = await User.findById(req.user.id)
        .select('-password -otp -otpExpiry -__v');

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user data'
      });
    }
  }

  // 🔑 FORGOT PASSWORD
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'No account found with this email'
        });
      }

      // Generate OTP
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await OTP.create({
        email: user.email,
        otp,
        purpose: 'password_reset',
        expiresAt
      });

      // Send password reset email
      await emailService.sendPasswordResetOTP(user.email, otp, user.fullName);

      res.json({
        success: true,
        message: 'Password reset OTP sent to your email'
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process request'
      });
    }
  }

  // 🔄 RESET PASSWORD
  async resetPassword(req, res) {
    try {
      const { email, otp, newPassword } = req.body;

      // Verify OTP
      const otpRecord = await OTP.findOne({
        email: email.toLowerCase(),
        otp,
        purpose: 'password_reset',
        isUsed: false,
        expiresAt: { $gt: new Date() }
      });

      if (!otpRecord) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired OTP'
        });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update user password
      await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
          password: hashedPassword,
          passwordChangedAt: new Date()
        }
      );

      // Mark OTP as used
      otpRecord.isUsed = true;
      await otpRecord.save();

      res.json({
        success: true,
        message: 'Password reset successfully'
      });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to reset password'
      });
    }
  }
}

module.exports = new AuthController();