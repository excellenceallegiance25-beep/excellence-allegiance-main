import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};
const createTestTransporter = () => {
  return {
    sendMail: async (options) => {
      console.log("📧 Email would be sent:", {
        to: options.to,
        subject: options.subject,
        html: options.html ? "HTML content" : options.text,
      });
      return { messageId: "test-message-id" };
    },
  };
};
const transporter =
  process.env.NODE_ENV === "production"
    ? createTransporter()
    : createTestTransporter();
export const sendVerificationEmail = async (email, token, name, role) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@yourapp.com",
    to: email,
    subject: `${
      role.charAt(0).toUpperCase() + role.slice(1)
    } Account - Verify Your Email`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Email Verification</h2>
        <p>Hello ${name},</p>
        <p>Welcome to our platform as a <strong>${role}</strong>! Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email Address
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="background-color: #f3f4f6; padding: 10px; border-radius: 5px; 
                   word-break: break-all; font-size: 12px;">
          ${verificationUrl}
        </p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          © ${new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
export const sendWelcomeEmail = async (email, name, role) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@yourapp.com",
    to: email,
    subject: `Welcome to Our Platform - ${
      role.charAt(0).toUpperCase() + role.slice(1)
    } Account`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Welcome ${name}!</h2>
        <p>Your ${role} account has been successfully verified and is now active.</p>
        <p>You can now login to your account and start using our platform.</p>
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #0369a1;">Your Account Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Role:</strong> ${
              role.charAt(0).toUpperCase() + role.slice(1)
            }</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Status:</strong> ✅ Verified</li>
          </ul>
        </div>
        <a href="${process.env.FRONTEND_URL}/login" 
           style="background-color: #059669; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 5px; font-weight: bold;">
          Go to Login
        </a>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          Need help? Contact our support team.
        </p>
      </div>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
