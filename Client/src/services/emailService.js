const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOTP(to, otpCode) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Your OTP Code - ExcellencePro",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0;">ExcellencePro</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Employee Management System</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Your OTP Code</h2>
            
            <div style="background: white; padding: 30px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="font-size: 48px; font-weight: bold; color: #667eea; letter-spacing: 10px; margin: 20px 0;">
                ${otpCode}
              </div>
              
              <p style="color: #666; margin-bottom: 30px;">
                This OTP is valid for 5 minutes. Please do not share it with anyone.
              </p>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; color: #999; font-size: 12px;">
                <p>If you didn't request this OTP, please ignore this email.</p>
                <p>© ${new Date().getFullYear()} ExcellencePro. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Email sending error:", error);
      return false;
    }
  }

  async sendWelcomeEmail(to, name, credentials) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Welcome to ExcellencePro!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0;">Welcome to ExcellencePro!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Your Employee Management Portal</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Your account has been successfully created. Here are your login credentials:
            </p>
            
            <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Your Account Details
              </h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 120px;"><strong>Registration ID:</strong></td>
                  <td style="padding: 10px 0; color: #333; font-weight: bold;">${
                    credentials.registrationId
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Company Email:</strong></td>
                  <td style="padding: 10px 0; color: #333; font-weight: bold;">${
                    credentials.companyEmail
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Password:</strong></td>
                  <td style="padding: 10px 0; color: #e74c3c; font-weight: bold;">${
                    credentials.password
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Role:</strong></td>
                  <td style="padding: 10px 0; color: #333; font-weight: bold; text-transform: capitalize;">${
                    credentials.role
                  }</td>
                </tr>
              </table>
              
              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="margin: 0; color: #856404;">
                  <strong>Important:</strong> Please change your password after first login.
                  Keep your credentials secure and do not share with anyone.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.CLIENT_URL}/login" 
                 style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; 
                        border-radius: 5px; display: inline-block; font-weight: bold;">
                Login to Your Dashboard
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 40px; color: #999; font-size: 12px;">
              <p>This is an automated email. Please do not reply.</p>
              <p>© ${new Date().getFullYear()} ExcellencePro. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Welcome email error:", error);
      return false;
    }
  }
}

module.exports = new EmailService();
