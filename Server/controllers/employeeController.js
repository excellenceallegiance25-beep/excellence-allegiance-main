import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// OTP Store (simple memory)
const otpStore = {};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
export const sendOTP = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name)
    return res.json({ success: false, message: "Email & name required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: `"Excellence Allegiance" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Employee Registration",
      html: `<p>Hi ${name},</p><p>Your OTP is: <b>${otp}</b></p>`,
    });

    console.log(`OTP sent to ${email}: ${otp}`); // debug
    res.json({ success: true, message: "OTP sent to your email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// Verify OTP
export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email];
    return res.json({ success: true, message: "OTP verified!" });
  } else {
    return res.json({ success: false, message: "Invalid OTP" });
  }
};

// Register Employee
export const register = async (req, res) => {
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
  } = req.body;

  try {
    const existEmail = await Employee.findOne({ email });
    if (existEmail)
      return res.json({ success: false, message: "Email already registered" });

    const existUsername = await Employee.findOne({ username });
    if (existUsername)
      return res.json({ success: false, message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new Employee({
      fullName,
      email,
      phone,
      employeeId,
      department,
      position,
      managerEmail,
      username,
      password: hashedPassword,
    });

    await employee.save();

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ success: true, data: { employee, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};
