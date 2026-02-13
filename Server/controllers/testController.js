import bcrypt from "bcryptjs";
import { database } from "../utils/database.js";
import { sendEmail } from "../services/email.service.js";

// 🧪 Test Register (No OTP)
export const testRegisterBypass = async (req, res) => {
  const { email, password, fullName, phone } = req.body;

  const employeeId = "TEST" + Date.now().toString().slice(-6);
  const username = "testuser" + Date.now().toString().slice(-4);

  const hashedPassword = await bcrypt.hash(password || "test123", 10);

  const newEmployee = {
    id: Date.now().toString(),
    fullName: fullName || "Test User",
    email: email || "test@example.com",
    phone: phone || "1234567890",
    employeeId,
    department: "IT",
    position: "Software Engineer",
    username,
    password: hashedPassword,
    emailVerified: true,
    status: "active",
    createdAt: new Date(),
  };

  database.employees.push(newEmployee);

  res.json({
    success: true,
    message: "Test registration successful",
    data: {
      employee: newEmployee,
      password: password || "test123",
    },
  });
};

// 🔧 Debug Data
export const debugData = (req, res) => {
  res.json({
    success: true,
    employees: database.employees,
    otps: database.otps,
    counts: {
      employees: database.employees.length,
      otps: database.otps.length,
    },
  });
};

// 📧 Test Email
export const testEmail = async (req, res) => {
  const { to } = req.body;

  await sendEmail(to, "Test Email", "<h2>Email system working ✅</h2>");

  res.json({
    success: true,
    message: "Test email triggered (check console/email)",
  });
};
