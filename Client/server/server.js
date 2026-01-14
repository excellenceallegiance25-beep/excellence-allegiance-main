import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Simple email service (console based for development)
const sendOtpEmail = async (email, name, otp) => {
  console.log('\n📧 ===== OTP EMAIL =====');
  console.log('To:', email);
  console.log('Name:', name);
  console.log('OTP Code:', otp);
  console.log('⏰ Expires in 10 minutes');
  console.log('========================\n');
  
  return {
    success: true,
    preview: 'Check console for OTP',
    otp: otp
  };
};

const sendWelcomeEmail = async (email, name) => {
  console.log('\n🎉 ===== WELCOME EMAIL =====');
  console.log('To:', email);
  console.log('Welcome to Excellence Allegiance,', name);
  console.log('==============================\n');
  
  return {
    success: true,
    preview: 'Welcome email logged in console'
  };
};

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((error) => console.log('❌ MongoDB connection error:', error));

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ==================== BASIC ROUTES ====================

app.get('/', (req, res) => {
  res.json({ 
    message: 'Excellence Allegiance Backend Server is running!',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    endpoints: {
      health: '/api/health',
      sendOTP: '/api/auth/send-otp',
      verifyOTP: '/api/auth/verify-otp',
      register: '/api/auth/register',
      login: '/api/auth/login',
      profile: '/api/auth/profile'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ==================== AUTH ROUTES ====================

// Check if email exists
app.post('/api/auth/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });
    
    res.json({
      success: true,
      exists: !!user
    });
    
  } catch (error) {
    console.error('Check email error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    console.log('📧 Sending OTP request for:', { email, name });

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email and name are required'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in database with expiry (10 minutes)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    // Update or create user with OTP
    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name: name,
          otp: {
            code: otp,
            expiresAt: otpExpiry
          },
          updatedAt: new Date()
        }
      },
      { upsert: true, new: true }
    );

    console.log(`✅ OTP generated for ${email}: ${otp}`);
    console.log(`⏰ OTP expires at: ${otpExpiry}`);
    
    // Send OTP email (console based for now)
    const emailResult = await sendOtpEmail(email, name, otp);
    
    return res.json({
      success: true,
      message: 'OTP generated successfully',
      otp: otp,
      expiresIn: '10 minutes',
      emailPreview: emailResult.preview
    });
    
  } catch (error) {
    console.error('❌ Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
});

// Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    console.log('🔐 Verifying OTP for:', email);

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.otp || !user.otp.code) {
      console.log('❌ No OTP found for user:', email);
      return res.json({
        success: false,
        message: 'No OTP found. Please request a new one.'
      });
    }

    // Check expiry
    const now = new Date();
    if (now > user.otp.expiresAt) {
      console.log('❌ OTP expired for:', email);
      await User.updateOne({ email }, { $unset: { otp: 1 } });
      return res.json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (user.otp.code === otp) {
      console.log('✅ OTP verified successfully for:', email);
      
      await User.updateOne(
        { email }, 
        { 
          $unset: { otp: 1 },
          $set: { isVerified: true, updatedAt: new Date() }
        }
      );
      
      // Send welcome email
      const welcomeResult = await sendWelcomeEmail(email, user.name);
      
      return res.json({
        success: true,
        message: 'OTP verified successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: true
        },
        welcomePreview: welcomeResult.preview
      });
    } else {
      console.log('❌ Invalid OTP for:', email);
      res.json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }
    
  } catch (error) {
    console.error('❌ Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: error.message
    });
  }
});

// Register User (without OTP - for testing)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('📝 Registration attempt:', { name, email });

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      isVerified: true
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send welcome email
    await sendWelcomeEmail(email, name);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: true
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Get user profile (protected)
app.get('/api/auth/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password -otp');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Get all users (for testing - remove in production)
app.get('/api/auth/test-users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email role isVerified createdAt')
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// ==================== ERROR HANDLING ====================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'POST /api/auth/send-otp',
      'POST /api/auth/verify-otp',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile',
      'GET /api/auth/test-users'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  🚀 Server Information:
  =====================
  ✅ Server running on: http://localhost:${PORT}
  📊 MongoDB: ${process.env.MONGODB_URI ? 'Connected ✓' : 'Not set ✗'}
  🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Set ✓' : 'Not set ✗'}
  🌍 Environment: ${process.env.NODE_ENV || 'development'}
  
  📍 Available Endpoints:
  =====================
  ❤️  Health Check: http://localhost:${PORT}/api/health
  📧  Send OTP: POST http://localhost:${PORT}/api/auth/send-otp
  ✅  Verify OTP: POST http://localhost:${PORT}/api/auth/verify-otp
  📝  Register: POST http://localhost:${PORT}/api/auth/register
  🔐  Login: POST http://localhost:${PORT}/api/auth/login
  👤  Profile: GET http://localhost:${PORT}/api/auth/profile
  📊  Test Users: GET http://localhost:${PORT}/api/auth/test-users
  `);
});