// services/email.service.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "test@example.com",
    pass: process.env.EMAIL_PASS || "test123",
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    // If real email not configured → console fallback
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      process.env.EMAIL_USER === "test@example.com"
    ) {
      console.log("\n📧 ===== EMAIL (CONSOLE MODE) =====");
      console.log("TO:", to);
      console.log("SUBJECT:", subject);
      console.log("CONTENT:", html);
      console.log("=================================\n");
      return { success: true, consoleOnly: true };
    }

    await transporter.sendMail({
      from: `"EAPL System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Email error:", error.message);

    console.log("\n📧 ===== EMAIL FALLBACK =====");
    console.log("TO:", to);
    console.log("SUBJECT:", subject);
    console.log("CONTENT:", html);
    console.log("============================\n");

    return { success: false, consoleOnly: true };
  }
};
