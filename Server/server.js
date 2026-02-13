import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== RATE LIMITING ====================
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many attempts, please try again after 15 minutes"
  }
});

// ==================== DATABASE CONNECTION ====================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// ==================== SCHEMAS ====================
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true, minlength: 6, select: false },
  phone: { type: String, required: true, trim: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  profileImage: { type: String, default: "/uploads/default-avatar.png" },
  
  role: {
    type: String,
    enum: ["pending", "employee", "manager", "admin", "super_admin"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["pending_approval", "active", "rejected", "inactive", "suspended"],
    default: "pending_approval",
  },
  
  employeeId: { type: String, unique: true, sparse: true },
  joiningDate: { type: Date },
  salary: { type: Number, default: 0 },
  shift: { type: String, default: "Day" },
  reportsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  isEmailVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approvedAt: { type: Date },
  rejectionReason: { type: String },
  
  lastLogin: { type: Date },
  loginHistory: [{
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    userAgent: { type: String }
  }],
  
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: Date, select: false },
  
  notifications: [{
    title: String,
    message: String,
    type: { type: String, enum: ["info", "warning", "success", "error"], default: "info" },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    theme: { type: String, default: "light" },
    language: { type: String, default: "en" }
  }
}, { timestamps: true });

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const approvalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userEmail: { type: String, required: true, lowercase: true },
  userName: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  phone: { type: String, required: true },
  requestedRole: { type: String, enum: ["employee", "manager"], required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewerName: { type: String },
  reviewedAt: { type: Date },
  reviewNotes: { type: String }
}, { timestamps: true });

// Virtual for timeElapsed
approvalSchema.virtual('timeElapsed').get(function() {
  const diff = Date.now() - this.createdAt;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return 'Just now';
});

approvalSchema.set('toJSON', { virtuals: true });
approvalSchema.set('toObject', { virtuals: true });

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true },
  otp: { type: String, required: true },
  type: { type: String, enum: ["registration", "password_reset"], required: true },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true }
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
  status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
  dueDate: { type: Date }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["planning", "in_progress", "completed"], default: "planning" },
  progress: { type: Number, default: 0 }
}, { timestamps: true });

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  status: { type: String, enum: ["present", "absent", "late", "leave"], default: "absent" }
}, { timestamps: true });

attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

const leaveSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  leaveType: { type: String, enum: ["sick", "casual", "annual", "unpaid"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  module: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userEmail: { type: String },
  userRole: { type: String },
  details: { type: Object },
  ipAddress: { type: String },
  userAgent: { type: String }
}, { timestamps: true });

// ==================== MODELS ====================
const User = mongoose.model("User", userSchema);
const OTP = mongoose.model("OTP", otpSchema);
const Approval = mongoose.model("Approval", approvalSchema);
const Task = mongoose.model("Task", taskSchema);
const Project = mongoose.model("Project", projectSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);
const Leave = mongoose.model("Leave", leaveSchema);
const AuditLog = mongoose.model("AuditLog", auditLogSchema);
const Counter = mongoose.model("Counter", counterSchema);

// ==================== HELPER FUNCTIONS ====================
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const generateEmployeeId = async () => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "employeeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const seq = counter.seq;
    const year = new Date().getFullYear().toString().slice(-2);
    return `EMP${year}${seq.toString().padStart(5, "0")}`;
  } catch (error) {
    return `EMP${Date.now().toString().slice(-8)}`;
  }
};

const createAuditLog = async (data) => {
  try {
    await AuditLog.create(data);
  } catch (error) {
    console.error("Audit log error:", error);
  }
};

const addNotification = async (userId, notification) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { notifications: { ...notification, createdAt: new Date() } }
    });
  } catch (error) {
    console.error("Add notification error:", error);
  }
};

// ==================== EMAIL CONFIGURATION - REAL EMAIL ====================
let transporter;

try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS?.replace(/\s+/g, ''), // স্পেস রিমুভ করছি
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // ট্রান্সপোর্টার ভেরিফাই
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email configuration error:', error.message);
      console.log('🔧 Fix:');
      console.log('1. Go to https://myaccount.google.com/security');
      console.log('2. Enable 2-Step Verification');
      console.log('3. Go to App Passwords');
      console.log('4. Generate new app password');
      console.log('5. Update .env with the new password (NO SPACES)');
    } else {
      console.log('✅ Email server ready to send messages');
    }
  });
} catch (error) {
  console.error('❌ Failed to create email transporter:', error.message);
}

const sendEmail = async (to, subject, html) => {
  // ডেভেলপমেন্ট মোডে ইমেইল না পাঠিয়ে কনসোলে দেখান
  if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_USER) {
    console.log(`\n📧 ====== DEVELOPMENT MODE ======`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`OTP: ${html.match(/\d{6}/)?.[0] || 'N/A'}`);
    console.log(`================================\n`);
    return true;
  }

  try {
    if (!transporter) {
      throw new Error('Email transporter not configured');
    }

    const mailOptions = {
      from: `"Employee Management System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
    
    // Fallback: কনসোলে OTP দেখান
    console.log(`\n📧 ====== FALLBACK MODE ======`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`OTP: ${html.match(/\d{6}/)?.[0] || 'N/A'}`);
    console.log(`==============================\n`);
    
    return false;
  }
};

// ==================== MIDDLEWARE ====================
app.use(helmet({ 
  crossOriginResourcePolicy: { policy: "cross-origin" } 
}));

app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ["http://localhost:5173", "http://localhost:3000", "http://192.168.68.106:5173"], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan('dev'));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create uploads directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ==================== FILE UPLOAD ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ 
  storage, 
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|txt|csv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images, documents, and spreadsheets are allowed"));
    }
  }
});

// ==================== AUTH MIDDLEWARE ====================
const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -resetPasswordToken -resetPasswordExpires');
    
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    
    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: "Account suspended" });
    }
    
    if (user.status === 'inactive') {
      return res.status(403).json({ success: false, message: "Account inactive" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

const requireApproved = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  if (req.user.status === 'pending_approval') {
    return res.status(403).json({ 
      success: false, 
      message: "Your account is pending admin approval",
      isPending: true 
    });
  }
  if (req.user.status !== 'active') {
    return res.status(403).json({ 
      success: false, 
      message: "Your account is not active" 
    });
  }
  next();
};

// ==================== AUTH ROUTES ====================

// Check First User
app.get("/api/auth/check-first-user", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const adminCount = await User.countDocuments({ 
      role: { $in: ["admin", "super_admin"] } 
    });
    
    res.json({ 
      success: true, 
      isFirstUser: userCount === 0,
      hasAdmin: adminCount > 0 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Send OTP
app.post("/api/auth/send-otp", authLimiter, async (req, res) => {
  try {
    const { email, type = "registration" } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    if (type === "registration") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already registered" });
      }
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.deleteMany({ email, type });
    await OTP.create({ email, otp, type, expiresAt });

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Email Verification</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
          <h2 style="color: #333; margin-top: 0;">Your OTP Code</h2>
          <p style="color: #666; font-size: 16px;">Use the following code to verify your email address:</p>
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h1 style="color: white; font-size: 48px; letter-spacing: 10px; margin: 0; font-family: monospace;">${otp}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">This code will expire in <strong>10 minutes</strong>.</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    `;

    await sendEmail(email, "Your OTP Code - Employee Management System", html);

    res.json({ 
      success: true, 
      message: "OTP sent successfully",
      expiresIn: 600 
    });
    
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// Verify OTP
app.post("/api/auth/verify-otp", authLimiter, async (req, res) => {
  try {
    const { email, otp, type = "registration" } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP required" });
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP format" });
    }

    const otpRecord = await OTP.findOne({ email, type, expiresAt: { $gt: new Date() } });
    
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    if (otpRecord.otp !== otp) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      
      const attemptsLeft = 5 - otpRecord.attempts;
      if (attemptsLeft <= 0) {
        await OTP.deleteOne({ _id: otpRecord._id });
        return res.status(400).json({ success: false, message: "Too many failed attempts. Please request new OTP." });
      }
      
      return res.status(400).json({ 
        success: false, 
        message: `Invalid OTP. ${attemptsLeft} attempts remaining.` 
      });
    }

    await OTP.deleteOne({ _id: otpRecord._id });
    
    if (type === "registration") {
      await User.findOneAndUpdate(
        { email },
        { 
          isEmailVerified: true,
          emailVerifiedAt: new Date()
        }
      );
    }

    res.json({ success: true, message: "OTP verified successfully" });
    
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

// 🔥 **REGISTER - ফার্স্ট ইউজার SUPER_ADMIN, বাকিরা PENDING**
app.post("/api/auth/register", authLimiter, async (req, res) => {
  try {
    const { 
      firstName, lastName, email, password, phone, department, position, 
      requestedRole = "employee" 
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !phone || !department || !position) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Check if first user
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let employeeId = null;
    let role = "pending";
    let status = "pending_approval";
    let isActive = false;
    let isApproved = false;
    let joiningDate = null;

    // 🔥 **ফার্স্ট ইউজার = SUPER_ADMIN (কোনো এপ্রুভাল লাগবে না)**
    if (isFirstUser) {
      role = "super_admin";
      status = "active";
      isActive = true;
      isApproved = true;
      joiningDate = new Date();
      employeeId = await generateEmployeeId();
      console.log("🔥 FIRST USER - CREATING SUPER ADMIN");
    }

    // Create user
    const user = await User.create({
      firstName, 
      lastName, 
      email: email.toLowerCase(), 
      password: hashedPassword,
      phone, 
      department, 
      position, 
      role, 
      status, 
      isActive, 
      isApproved,
      employeeId, 
      joiningDate, 
      isEmailVerified: true
    });

    // 🔥 **ফার্স্ট ইউজার না হলে = এপ্রুভাল রিকোয়েস্ট**
    if (!isFirstUser) {
      await Approval.create({
        userId: user._id, 
        userEmail: user.email, 
        userName: `${user.firstName} ${user.lastName}`,
        department, 
        position, 
        phone, 
        requestedRole, 
        status: "pending"
      });
      
      // Notify admins
      const admins = await User.find({ 
        role: { $in: ["admin", "super_admin"] }, 
        status: "active" 
      });
      
      for (const admin of admins) {
        await addNotification(admin._id, {
          title: "New Registration Pending",
          message: `${user.firstName} ${user.lastName} (${department}) requires approval`,
          type: "info"
        });
        
        await sendEmail(
          admin.email,
          "🔔 New Registration Requires Approval",
          `<h2>New Registration Pending</h2>
           <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
           <p><strong>Email:</strong> ${user.email}</p>
           <p><strong>Department:</strong> ${department}</p>
           <p><strong>Position:</strong> ${position}</p>
           <p><a href="${process.env.FRONTEND_URL}/admin/pending-approvals">Review Application</a></p>`
        );
      }
    }

    // 🔥 **ফার্স্ট ইউজারের জন্য টোকেন জেনারেট**
    let token = null;
    if (isFirstUser) {
      token = jwt.sign(
        { 
          id: user._id, 
          email: user.email, 
          role: user.role,
          employeeId: user.employeeId 
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      });
    }

    // Create audit log
    await createAuditLog({
      action: isFirstUser ? "SUPER_ADMIN_REGISTRATION" : "USER_REGISTRATION",
      module: "AUTH", 
      userId: user._id, 
      userEmail: user.email, 
      userRole: user.role,
      details: { isFirstUser, department, position }, 
      ipAddress: req.ip, 
      userAgent: req.headers["user-agent"]
    });

    // Response
    res.status(201).json({
      success: true,
      message: isFirstUser 
        ? "🎉 Super Admin created successfully! You can login now."
        : "✅ Registration submitted! Pending admin approval.",
      data: {
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email, 
        role: user.role, 
        status: user.status,
        employeeId: user.employeeId, 
        isFirstUser,
        ...(token && { token })
      }
    });

  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        success: false, 
        message: `${field} already exists` 
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false, 
        message: "Validation failed", 
        errors 
      });
    }

    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// 🔥 **LOGIN - শুধুমাত্র active ইউজাররা লগইন করতে পারবে**
app.post("/api/auth/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 🔥 **স্ট্যাটাস চেক**
    if (user.status === "pending_approval") {
      return res.status(403).json({ 
        success: false, 
        message: "Your account is pending admin approval", 
        isPending: true 
      });
    }
    
    if (user.status === "rejected") {
      return res.status(403).json({ 
        success: false, 
        message: "Your registration was rejected", 
        isRejected: true 
      });
    }
    
    if (user.status === "suspended") {
      return res.status(403).json({ 
        success: false, 
        message: "Your account has been suspended", 
        isSuspended: true 
      });
    }
    
    if (!user.isActive || user.status === "inactive") {
      return res.status(403).json({ 
        success: false, 
        message: "Your account is inactive", 
        isInactive: true 
      });
    }

    // Update login history
    user.lastLogin = new Date();
    user.loginHistory.push({ 
      timestamp: new Date(), 
      ipAddress: req.ip || req.connection.remoteAddress, 
      userAgent: req.headers["user-agent"] 
    });
    
    // Keep only last 50 login records
    if (user.loginHistory.length > 50) {
      user.loginHistory = user.loginHistory.slice(-50);
    }
    
    await user.save();

    // Generate token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role, 
        employeeId: user.employeeId,
        department: user.department,
        position: user.position
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    // Create audit log
    await createAuditLog({
      action: "LOGIN", 
      module: "AUTH", 
      userId: user._id, 
      userEmail: user.email, 
      userRole: user.role,
      ipAddress: req.ip, 
      userAgent: req.headers["user-agent"]
    });

    // Response
    res.json({
      success: true, 
      message: "Login successful",
      data: {
        user: {
          id: user._id, 
          firstName: user.firstName, 
          lastName: user.lastName,
          fullName: user.fullName, 
          email: user.email, 
          role: user.role,
          status: user.status, 
          employeeId: user.employeeId,
          department: user.department, 
          position: user.position,
          phone: user.phone, 
          profileImage: user.profileImage,
          isApproved: user.isApproved, 
          isActive: user.isActive,
          lastLogin: user.lastLogin,
          profileCompletion: user.profileCompletion || 0
        },
        token,
        redirectUrl: user.role === 'super_admin' || user.role === 'admin' 
          ? '/admin/dashboard' 
          : user.role === 'manager' 
            ? '/manager/dashboard' 
            : '/employee/dashboard'
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// Logout
app.post("/api/auth/logout", authenticate, async (req, res) => {
  try {
    res.clearCookie("token");
    
    await createAuditLog({
      action: "LOGOUT", 
      module: "AUTH", 
      userId: req.user._id, 
      userEmail: req.user.email, 
      userRole: req.user.role,
      ipAddress: req.ip, 
      userAgent: req.headers["user-agent"]
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
});

// Get Current User
app.get("/api/auth/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password -resetPasswordToken -resetPasswordExpires -loginHistory')
      .populate("reportsTo", "firstName lastName email position department")
      .populate("approvedBy", "firstName lastName email");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const [totalTasks, completedTasks, pendingTasks, projects] = await Promise.all([
      Task.countDocuments({ assignedTo: user._id }),
      Task.countDocuments({ assignedTo: user._id, status: "completed" }),
      Task.countDocuments({ 
        assignedTo: user._id, 
        status: { $in: ["pending", "in_progress"] } 
      }),
      Project.countDocuments({ 
        $or: [
          { manager: user._id },
          { teamMembers: user._id }
        ] 
      })
    ]);

    res.json({
      success: true,
      data: {
        user,
        stats: {
          tasks: {
            total: totalTasks,
            completed: completedTasks,
            pending: pendingTasks,
            completionRate: totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0
          },
          projects,
          unreadNotifications: user.notifications?.filter(n => !n.read).length || 0
        }
      }
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ success: false, message: "Failed to get user profile" });
  }
});

// Update Profile
app.put("/api/auth/profile", authenticate, upload.single("profileImage"), async (req, res) => {
  try {
    const updates = req.body;
    const user = req.user;

    if (req.file) {
      const relativePath = '/uploads/' + req.file.filename;
      updates.profileImage = relativePath;
      
      // Delete old profile image
      if (user.profileImage && 
          user.profileImage !== '/uploads/default-avatar.png' && 
          user.profileImage.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    if (updates.skills && typeof updates.skills === "string") {
      updates.skills = updates.skills.split(",").map(s => s.trim()).filter(s => s);
    }

    const allowedUpdates = [
      'firstName', 'lastName', 'phone', 'dateOfBirth', 'experience',
      'skills', 'address', 'city', 'country', 'postalCode', 'bio',
      'profileImage', 'preferences'
    ];

    const filteredUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    filteredUpdates.updatedAt = new Date();

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      filteredUpdates,
      { new: true, runValidators: true }
    ).select("-password -resetPasswordToken -resetPasswordExpires");

    await createAuditLog({
      action: "UPDATE_PROFILE",
      module: "USER",
      userId: user._id,
      userEmail: user.email,
      userRole: user.role,
      details: { updatedFields: Object.keys(filteredUpdates) },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
    
  } catch (error) {
    console.error("Update profile error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});

// Change Password
app.post("/api/auth/change-password", authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ success: false, message: "New password must be different from current password" });
    }

    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    await createAuditLog({
      action: "CHANGE_PASSWORD",
      module: "AUTH",
      userId: user._id,
      userEmail: user.email,
      userRole: user.role,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });

    await sendEmail(
      user.email,
      "🔐 Password Changed Successfully",
      `<h2>Password Changed Successfully</h2>
       <p>Hello ${user.firstName} ${user.lastName},</p>
       <p>Your password has been changed successfully.</p>
       <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
       <p>If you did not make this change, please contact support immediately.</p>`
    );

    res.json({ success: true, message: "Password changed successfully" });
    
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ success: false, message: "Failed to change password" });
  }
});

// Forgot Password
app.post("/api/auth/forgot-password", authLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.json({ 
        success: true, 
        message: "If your email is registered, you will receive a password reset link." 
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    await sendEmail(
      user.email,
      "🔑 Password Reset Request",
      `<h2>Password Reset Request</h2>
       <p>Hello ${user.firstName} ${user.lastName},</p>
       <p>Click the link below to reset your password:</p>
       <p><a href="${resetUrl}" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
       <p>This link will expire in 1 hour.</p>
       <p>If you didn't request this, please ignore this email.</p>`
    );

    await createAuditLog({
      action: "FORGOT_PASSWORD",
      module: "AUTH",
      userId: user._id,
      userEmail: user.email,
      userRole: user.role,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.json({ 
      success: true, 
      message: "If your email is registered, you will receive a password reset link." 
    });
    
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, message: "Failed to process request" });
  }
});

// Reset Password
app.post("/api/auth/reset-password", authLimiter, async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;

    if (!token || !email || !newPassword) {
      return res.status(400).json({ success: false, message: "Token, email, and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const resetTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    await createAuditLog({
      action: "RESET_PASSWORD",
      module: "AUTH",
      userId: user._id,
      userEmail: user.email,
      userRole: user.role,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });

    await sendEmail(
      user.email,
      "✅ Password Reset Successful",
      `<h2>Password Reset Successful</h2>
       <p>Hello ${user.firstName} ${user.lastName},</p>
       <p>Your password has been reset successfully.</p>
       <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login Now</a></p>`
    );

    res.json({ 
      success: true, 
      message: "Password reset successful. You can now login with your new password." 
    });
    
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Failed to reset password" });
  }
});

// ==================== ADMIN ROUTES ====================

// 🔥 **পেন্ডিং এপ্রুভাল লিস্ট**
app.get("/api/admin/pending-approvals", authenticate, requireRole(["admin", "super_admin"]), async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.query;

    const query = {
      status: "pending_approval",
      role: "pending"
    };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [pendingUsers, total] = await Promise.all([
      User.find(query)
        .select('-password -loginHistory -notifications')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ]);

    const userIds = pendingUsers.map(user => user._id);
    const approvals = await Approval.find({ 
      userId: { $in: userIds }, 
      status: "pending" 
    });

    const approvalsWithUsers = pendingUsers.map(user => {
      const approval = approvals.find(a => a.userId?.toString() === user._id.toString());
      return {
        ...user.toObject(),
        approvalRequest: approval || null
      };
    });

    res.json({ 
      success: true, 
      data: { 
        approvals: approvalsWithUsers,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      } 
    });
    
  } catch (error) {
    console.error("Get pending approvals error:", error);
    res.status(500).json({ success: false, message: "Failed to get pending approvals" });
  }
});

// 🔥 **এপ্রুভ ইউজার**
app.post("/api/admin/approve-user/:userId", authenticate, requireRole(["admin", "super_admin"]), async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, salary, shift, reportsTo, notes } = req.body;

    if (!role || !["employee", "manager"].includes(role)) {
      return res.status(400).json({ success: false, message: "Valid role (employee or manager) is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    if (user.status === "active") {
      return res.status(400).json({ success: false, message: "User is already approved" });
    }

    // Generate employee ID if not exists
    if (!user.employeeId) {
      user.employeeId = await generateEmployeeId();
    }

    // Update user
    user.role = role;
    user.status = "active";
    user.isActive = true;
    user.isApproved = true;
    user.approvedBy = req.user._id;
    user.approvedAt = new Date();
    user.joiningDate = new Date();
    user.rejectionReason = null;
    
    if (salary) user.salary = salary;
    if (shift) user.shift = shift;
    if (reportsTo) user.reportsTo = reportsTo;
    
    await user.save();

    // Update approval request
    await Approval.findOneAndUpdate(
      { userId: user._id, status: "pending" },
      {
        status: "approved",
        reviewedBy: req.user._id,
        reviewerName: `${req.user.firstName} ${req.user.lastName}`,
        reviewedAt: new Date(),
        reviewNotes: notes || `Approved as ${role} by admin`,
        $push: {
          reviewHistory: {
            status: "approved",
            notes: notes || `Approved as ${role}`,
            reviewedBy: req.user._id,
            reviewedAt: new Date()
          }
        }
      },
      { new: true, upsert: true }
    );

    // Add notification
    await addNotification(user._id, {
      title: "✅ Account Approved",
      message: `Your account has been approved as ${role}. You can now login.`,
      type: "success"
    });

    // Send email
    await sendEmail(
      user.email,
      "🎉 Account Approved - Welcome to Employee Management System",
      `<h2>Congratulations!</h2>
       <p>Hello ${user.firstName} ${user.lastName},</p>
       <p>Your account has been <strong>approved</strong> as ${role}.</p>
       <p><strong>Employee ID:</strong> ${user.employeeId}</p>
       <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login to Your Account</a></p>`
    );

    // Create audit log
    await createAuditLog({
      action: "APPROVE_USER", 
      module: "ADMIN", 
      userId: req.user._id,
      userEmail: req.user.email, 
      userRole: req.user.role,
      details: { 
        approvedUserId: user._id, 
        approvedUserEmail: user.email, 
        assignedRole: role,
        employeeId: user.employeeId 
      },
      ipAddress: req.ip, 
      userAgent: req.headers["user-agent"]
    });

    res.json({
      success: true,
      message: `User approved successfully as ${role}`,
      data: { 
        id: user._id, 
        email: user.email, 
        role: user.role, 
        status: user.status, 
        employeeId: user.employeeId 
      }
    });

  } catch (error) {
    console.error("Approve user error:", error);
    res.status(500).json({ success: false, message: "Failed to approve user" });
  }
});

// 🔥 **রিজেক্ট ইউজার**
app.post("/api/admin/reject-user/:userId", authenticate, requireRole(["admin", "super_admin"]), async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ success: false, message: "Rejection reason is required" });
    }

    if (reason.length > 500) {
      return res.status(400).json({ success: false, message: "Rejection reason cannot exceed 500 characters" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    if (user.status !== "pending_approval") {
      return res.status(400).json({ success: false, message: "User is not pending approval" });
    }

    // Update user
    user.status = "rejected";
    user.rejectionReason = reason;
    user.isActive = false;
    await user.save();

    // Update approval request
    await Approval.findOneAndUpdate(
      { userId: user._id, status: "pending" },
      {
        status: "rejected",
        reviewedBy: req.user._id,
        reviewerName: `${req.user.firstName} ${req.user.lastName}`,
        reviewedAt: new Date(),
        reviewNotes: reason,
        $push: {
          reviewHistory: {
            status: "rejected",
            notes: reason,
            reviewedBy: req.user._id,
            reviewedAt: new Date()
          }
        }
      },
      { new: true, upsert: true }
    );

    // Add notification
    await addNotification(user._id, {
      title: "❌ Registration Rejected",
      message: `Your registration has been rejected. Reason: ${reason}`,
      type: "error"
    });

    // Send email
    await sendEmail(
      user.email,
      "❌ Registration Status Update",
      `<h2>Registration Update</h2>
       <p>Hello ${user.firstName} ${user.lastName},</p>
       <p>We regret to inform you that your registration has been <strong>rejected</strong>.</p>
       <p><strong>Reason:</strong> ${reason}</p>
       <p>If you believe this is a mistake, please contact our support team.</p>`
    );

    // Create audit log
    await createAuditLog({
      action: "REJECT_USER", 
      module: "ADMIN", 
      userId: req.user._id,
      userEmail: req.user.email, 
      userRole: req.user.role,
      details: { 
        rejectedUserId: user._id, 
        rejectedUserEmail: user.email, 
        reason 
      },
      ipAddress: req.ip, 
      userAgent: req.headers["user-agent"]
    });

    res.json({ 
      success: true, 
      message: "User registration rejected successfully" 
    });

  } catch (error) {
    console.error("Reject user error:", error);
    res.status(500).json({ success: false, message: "Failed to reject user" });
  }
});

// 🔥 **ড্যাশবোর্ড স্ট্যাটস**
app.get("/api/admin/dashboard-stats", authenticate, requireRole(["admin", "super_admin"]), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      activeUsers,
      pendingApprovals,
      totalManagers,
      totalEmployees,
      totalAdmins,
      todaysAttendance,
      pendingLeaves,
      recentRegistrations
    ] = await Promise.all([
      User.countDocuments({ role: { $ne: "pending" } }),
      User.countDocuments({ status: "active", role: { $ne: "pending" } }),
      User.countDocuments({ status: "pending_approval", role: "pending" }),
      User.countDocuments({ role: "manager", status: "active" }),
      User.countDocuments({ role: "employee", status: "active" }),
      User.countDocuments({ role: { $in: ["admin", "super_admin"] }, status: "active" }),
      Attendance.countDocuments({ 
        date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } 
      }),
      Leave.countDocuments({ status: "pending" }),
      User.find({ role: { $ne: "pending" } })
        .select("firstName lastName email role department status createdAt")
        .sort({ createdAt: -1 })
        .limit(10)
    ]);

    // Calculate department statistics
    const departmentStats = await User.aggregate([
      { $match: { status: "active", role: { $ne: "pending" } } },
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Calculate monthly registrations
    const monthlyStats = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 12 }
    ]);

    res.json({
      success: true,
      data: {
        overview: { 
          totalUsers, 
          activeUsers, 
          pendingApprovals, 
          totalManagers, 
          totalEmployees,
          totalAdmins,
          todaysAttendance,
          pendingLeaves
        },
        departmentStats,
        monthlyStats,
        recentRegistrations
      }
    });
    
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ success: false, message: "Failed to get dashboard statistics" });
  }
});

// 🔥 **সকল ইউজার (এডমিনদের জন্য)**
app.get("/api/admin/users", authenticate, requireRole(["admin", "super_admin", "manager"]), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = "", 
      department, 
      role, 
      status,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    const query = { role: { $ne: "pending" } };

    // For managers, only show their team members
    if (req.user.role === "manager") {
      query.$or = [
        { reportsTo: req.user._id },
        { _id: req.user._id }
      ];
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } }
      ];
    }

    if (department) query.department = department;
    if (role) query.role = role;
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password -resetPasswordToken -resetPasswordExpires -loginHistory -notifications')
        .populate("reportsTo", "firstName lastName email position department")
        .populate("approvedBy", "firstName lastName email")
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
    
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
});

// 🔥 **এপ্রুভাল হিস্টোরি**
app.get("/api/admin/approval-history", authenticate, requireRole(["admin", "super_admin"]), async (req, res) => {
  try {
    const { page = 1, limit = 20, status = "", search = "" } = req.query;

    const query = {};
    if (status) query.status = status;

    if (search) {
      query.$or = [
        { userEmail: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [approvals, total] = await Promise.all([
      Approval.find(query)
        .populate("userId", "firstName lastName email employeeId profileImage")
        .populate("reviewedBy", "firstName lastName email")
        .sort({ reviewedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Approval.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        approvals,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
    
  } catch (error) {
    console.error("Get approval history error:", error);
    res.status(500).json({ success: false, message: "Failed to get approval history" });
  }
});

// ==================== NOTIFICATION ROUTES ====================
app.get("/api/notifications", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("notifications");
    
    const notifications = user.notifications
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 50);

    res.json({
      success: true,
      data: {
        notifications,
        unreadCount: user.notifications.filter(n => !n.read).length
      }
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ success: false, message: "Failed to get notifications" });
  }
});

app.put("/api/notifications/:id/read", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    
    const notification = user.notifications.id(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    notification.read = true;
    await user.save();

    res.json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    console.error("Mark notification as read error:", error);
    res.status(500).json({ success: false, message: "Failed to mark notification as read" });
  }
});

app.put("/api/notifications/read-all", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.notifications.forEach(notification => {
      notification.read = true;
    });
    
    await user.save();

    res.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    res.status(500).json({ success: false, message: "Failed to mark all notifications as read" });
  }
});

app.delete("/api/notifications/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    
    user.notifications.id(id).deleteOne();
    await user.save();

    res.json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({ success: false, message: "Failed to delete notification" });
  }
});

// ==================== FILE UPLOAD ====================
app.post("/api/upload", authenticate, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const relativePath = '/uploads/' + req.file.filename;

    await createAuditLog({
      action: "UPLOAD_FILE",
      module: "FILE",
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      details: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: relativePath
      },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: relativePath,
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
    
  } catch (error) {
    console.error("File upload error:", error);
    
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ success: false, message: "File size too large. Maximum size is 10MB" });
      }
    }

    res.status(500).json({ success: false, message: "Failed to upload file" });
  }
});

// ==================== HEALTH CHECK ====================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    version: "2.0.0"
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "🚀 Employee Management System API", 
    version: "2.0.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Endpoint not found",
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("❌ Server error:", error);

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map(e => e.message);
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return res.status(400).json({ 
      success: false, 
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, message: "Token expired" });
  }

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "File size too large. Maximum size is 10MB" });
    }
  }

  if (error.message === "Only images, documents, and spreadsheets are allowed") {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(error.status || 500).json({ 
    success: false, 
    message: error.message || "Internal server error" 
  });
});

// ==================== START SERVER ====================
const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🚀 EMPLOYEE MANAGEMENT SYSTEM - SERVER RUNNING            ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   📍 Server: http://localhost:${PORT}                         ║
║   🗄️  Database: MongoDB Connected                            ║
║   📧 Email: ${process.env.EMAIL_USER ? 'Configured ✓' : 'Not Configured ⚠️'}  ║
║   🔥 First User = SUPER_ADMIN (No Approval)                 ║
║   👥 All Others = PENDING (Admin Approval Required)         ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n👋 ${signal} received. Closing server...`);
      server.close(() => {
        console.log("🛑 HTTP server closed");
        mongoose.connection.close(false, () => {
          console.log("🗄️  Database connection closed");
          process.exit(0);
        });
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("unhandledRejection", (err) => {
      console.error("❌ Unhandled Rejection:", err);
      gracefulShutdown("UNHANDLED_REJECTION");
    });
    process.on("uncaughtException", (err) => {
      console.error("❌ Uncaught Exception:", err);
      gracefulShutdown("UNCAUGHT_EXCEPTION");
    });

    return server;
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// 🔥 এই চেকটা সবচেয়ে গুরুত্বপূর্ণ - এটা নিশ্চিত করে যে 
// সার্ভার শুধু তখনই চালু হবে যখন আপনি সরাসরি এই ফাইলটা run করবেন
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export { app, startServer };
export default app;