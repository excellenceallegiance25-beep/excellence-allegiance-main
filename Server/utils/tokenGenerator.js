const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generate JWT token for user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
      isApproved: user.isApproved
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * Generate refresh token
 * @param {Object} user - User object
 * @returns {string} Refresh token
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

/**
 * Generate email verification token
 * @param {string} email - User email
 * @returns {string} Verification token
 */
const generateVerificationToken = (email) => {
  return jwt.sign(
    { email, purpose: 'email_verification' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

/**
 * Generate password reset token
 * @param {string} email - User email
 * @returns {string} Password reset token
 */
const generatePasswordResetToken = (email) => {
  return jwt.sign(
    { email, purpose: 'password_reset' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

/**
 * Generate API key
 * @returns {string} API key
 */
const generateApiKey = () => {
  return `ems_${crypto.randomBytes(24).toString('hex')}`;
};

/**
 * Generate CSRF token
 * @returns {string} CSRF token
 */
const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token or null
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Decode JWT token without verification
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token or null
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  generateVerificationToken,
  generatePasswordResetToken,
  generateApiKey,
  generateCsrfToken,
  verifyToken,
  decodeToken
};