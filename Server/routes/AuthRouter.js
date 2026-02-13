const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// 🔴 PUBLIC ROUTES
router.get('/check-first-user', authController.checkFirstUser);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// 🔒 PROTECTED ROUTES
router.get('/me', protect, authController.getMe);

module.exports = router;