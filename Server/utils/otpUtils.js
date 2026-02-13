const crypto = require('crypto');

/**
 * Generate 6-digit OTP
 * @returns {string} 6-digit OTP
 */
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Generate numeric OTP with custom length
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} OTP of specified length
 */
const generateCustomOTP = (length = 6) => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += crypto.randomInt(0, 10);
  }
  return otp;
};

/**
 * Generate alphanumeric OTP
 * @param {number} length - Length of OTP (default: 8)
 * @returns {string} Alphanumeric OTP
 */
const generateAlphanumericOTP = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += chars.charAt(crypto.randomInt(0, chars.length));
  }
  return otp;
};

/**
 * Generate registration ID
 * @returns {string} Unique registration ID
 */
const generateRegistrationId = () => {
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `REG${timestamp}${random}`;
};

/**
 * Generate employee ID
 * @param {string} department - Department code
 * @returns {string} Employee ID
 */
const generateEmployeeId = (department = 'EMP') => {
  const timestamp = Date.now().toString().slice(-6);
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${department}${timestamp}${random}`;
};

/**
 * Generate session ID
 * @returns {string} Session ID
 */
const generateSessionId = () => {
  return crypto.randomBytes(16).toString('hex');
};

/**
 * Verify OTP with expiry check
 * @param {string} inputOTP - User provided OTP
 * @param {string} storedOTP - Stored OTP
 * @param {Date} expiryTime - OTP expiry time
 * @returns {boolean} Whether OTP is valid
 */
const verifyOTP = (inputOTP, storedOTP, expiryTime) => {
  if (!storedOTP || !expiryTime) {
    return false;
  }

  // Check if expired
  if (new Date() > new Date(expiryTime)) {
    return false;
  }

  // Check if match
  return inputOTP === storedOTP;
};

module.exports = {
  generateOTP,
  generateCustomOTP,
  generateAlphanumericOTP,
  generateRegistrationId,
  generateEmployeeId,
  generateSessionId,
  verifyOTP
};