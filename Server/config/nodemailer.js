// File: utils/email.js (বা তোমার file path)
import nodemailer from "nodemailer";

// Environment variables check
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error(
    "❌ Error: SMTP_USER or SMTP_PASS environment variables are not set!"
  );
  console.error("Please set them in your .env file:");
  console.error("SMTP_USER=your_email@example.com");
  console.error("SMTP_PASS=your_email_password");
}

// Create a transporter using Brevo (Sendinblue) SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "your_email@example.com",
    pass: process.env.SMTP_PASS || "your_password",
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// Test connection function
export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email server is ready to send messages");
    return { success: true, message: "Email server is ready" };
  } catch (error) {
    console.error("❌ Email server connection failed:", error.message);
    return {
      success: false,
      message: `Email server connection failed: ${error.message}`,
    };
  }
};

// Send email function
export const sendEmail = async (to, subject, html, text = "") => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || '"EAPL" <noreply@eapl.com>',
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
      success: false,
      error: error.message,
      message: "Failed to send email",
    };
  }
};

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  const subject = "Your OTP Code - EAPL";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">EAPL - Excellence Allegiance</h1>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333;">Your One-Time Password</h2>
        <p style="color: #666; font-size: 16px;">
          Use the following OTP to complete your verification process. 
          This OTP is valid for 10 minutes.
        </p>
        <div style="background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #667eea;">
            ${otp}
          </div>
        </div>
        <p style="color: #999; font-size: 14px;">
          If you didn't request this OTP, please ignore this email.
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
        <p>© ${new Date().getFullYear()} EAPL Technologies. All rights reserved.</p>
      </div>
    </div>
  `;

  return await sendEmail(email, subject, html);
};

// Send contact form email
export const sendContactEmail = async (name, email, message) => {
  const subject = `New Contact Form Submission from ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">New Contact Message</h1>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;"><strong>Message:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${message}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 5px;">
          <p style="margin: 0; color: #2e7d32;">
            <strong>Note:</strong> Please respond to this inquiry within 24 hours.
          </p>
        </div>
      </div>
    </div>
  `;

  return await sendEmail(
    process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject,
    html
  );
};

export default transporter;
