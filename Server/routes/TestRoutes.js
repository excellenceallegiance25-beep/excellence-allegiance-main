import express from "express";
import {
  testRegisterBypass,
  debugData,
  testEmail,
} from "../controllers/testController.js";

const router = express.Router();

// 🧪 Test registration (OTP bypass)
router.post("/test/register-bypass", testRegisterBypass);

// 🔧 Debug all in-memory data
router.get("/debug/data", debugData);

// 📧 Test email service
router.post("/test-email", testEmail);

export default router;
