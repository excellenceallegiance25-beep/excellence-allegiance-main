const User = require('../models/User');

/**
 * Check if user has admin role
 */
const adminOnly = (req, res, next) => {
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
      error: 'Access denied. Admin privileges required.'
    });
  }
};

/**
 * Check if user has super admin role
 */
const superAdminOnly = (req, res, next) => {
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
      error: 'Access denied. Super admin privileges required.'
    });
  }
};

/**
 * Check if user has specific role
 */
const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized - Please login'
      });
    }

    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }
  };
};

/**
 * Check if user is the owner or admin
 */
const isOwnerOrAdmin = (paramIdField = 'id') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized - Please login'
      });
    }

    const resourceId = req.params[paramIdField];
    
    if (req.user.role === 'admin' || req.user.role === 'super_admin' || req.user.id === resourceId) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        error: 'Access denied. You can only access your own resources.'
      });
    }
  };
};

module.exports = {
  adminOnly,
  superAdminOnly,
  hasRole,
  isOwnerOrAdmin
};