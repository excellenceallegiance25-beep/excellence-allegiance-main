const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes - Verify JWT token and attach user to request
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized - No token provided'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id || decoded.userId)
        .select('-password -otp -otpExpiry -__v')
        .lean();

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Not authorized - User not found'
        });
      }

      // Check if user is active
      if (user.status === 'suspended') {
        return res.status(403).json({
          success: false,
          error: 'Account suspended. Please contact admin.'
        });
      }

      if (user.status === 'inactive') {
        return res.status(403).json({
          success: false,
          error: 'Account inactive. Please contact admin.'
        });
      }

      // Attach user to request
      req.user = user;
      next();

    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);

      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          error: 'Not authorized - Invalid token'
        });
      }

      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Not authorized - Token expired'
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Not authorized - Token verification failed'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
};

/**
 * Check if user is admin
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized - Please login'
    });
  }

  if (req.user.role === 'admin' || req.user.role === 'super_admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      error: 'Not authorized - Admin access required'
    });
  }
};

/**
 * Check if user is super admin
 */
const isSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized - Please login'
    });
  }

  if (req.user.role === 'super_admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      error: 'Not authorized - Super admin access required'
    });
  }
};

/**
 * Check if user is verified
 */
const isVerified = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized - Please login'
    });
  }

  if (req.user.emailVerified) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      error: 'Please verify your email first',
      requiresVerification: true
    });
  }
};

/**
 * Check if user is approved
 */
const isApproved = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized - Please login'
    });
  }

  if (req.user.isApproved) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      error: 'Your account is pending approval',
      isPending: true
    });
  }
};

/**
 * Optional authentication - doesn't require token
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        req.user = user;
      } catch (error) {
        // Ignore token errors
      }
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  protect,
  isAdmin,
  isSuperAdmin,
  isVerified,
  isApproved,
  optionalAuth
};