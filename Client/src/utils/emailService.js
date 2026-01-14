const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Email templates
const templates = {
  welcome: {
    subject: "Welcome to Excellence Allegiance!",
    template: "welcome.html",
  },
  "password-reset": {
    subject: "Password Reset Request",
    template: "password-reset.html",
  },
  "email-verification": {
    subject: "Verify Your Email Address",
    template: "email-verification.html",
  },
  "two-factor": {
    subject: "Your Two-Factor Authentication Code",
    template: "two-factor.html",
  },
};

// Load template
const loadTemplate = async (templateName, context) => {
  try {
    const templateConfig = templates[templateName];
    if (!templateConfig) {
      throw new Error(`Template ${templateName} not found`);
    }

    const templatePath = path.join(
      __dirname,
      "email-templates",
      templateConfig.template
    );
    let html = await fs.readFile(templatePath, "utf8");

    // Replace variables in template
    Object.keys(context).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      html = html.replace(regex, context[key]);
    });

    return {
      subject: templateConfig.subject,
      html: html,
    };
  } catch (error) {
    // Fallback to simple text email if template not found
    return {
      subject: templateName,
      html: `<div>${JSON.stringify(context)}</div>`,
    };
  }
};

// Send email
const sendEmail = async ({ email, subject, template, context }) => {
  try {
    // Check if email is enabled
    if (process.env.EMAIL_ENABLED !== "true") {
      console.log("Email service is disabled");
      return true;
    }

    const templateData = await loadTemplate(template, context);

    const mailOptions = {
      from: `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: subject || templateData.subject,
      html: templateData.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

module.exports = sendEmail;
