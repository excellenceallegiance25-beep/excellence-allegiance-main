const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Configure transporter with Gmail settings
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100
    });

    this.fromEmail = `"Employee Management System" <${process.env.EMAIL_USER || 'noreply@ems.com'}>`;
  }

  /**
   * Send OTP Email
   */
  async sendOTP(email, otp, name = 'User') {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '🔐 Your Email Verification OTP - Employee Management System',
        html: this.getOTPEmailTemplate(otp, name)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ OTP email sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }

  /**
   * Send Password Reset OTP
   */
  async sendPasswordResetOTP(email, otp, name = 'User') {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '🔑 Password Reset OTP - Employee Management System',
        html: this.getPasswordResetOTPTemplate(otp, name)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Password reset OTP sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending password reset OTP:', error);
      throw new Error('Failed to send password reset OTP');
    }
  }

  /**
   * Send Approval Email
   */
  async sendApprovalEmail(email, name, role, comments = '') {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '✅ Your Account Has Been Approved! - Employee Management System',
        html: this.getApprovalEmailTemplate(name, role, comments)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Approval email sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending approval email:', error);
      throw new Error('Failed to send approval email');
    }
  }

  /**
   * Send Pending Approval Email
   */
  async sendPendingApprovalEmail(email, name) {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '⏳ Registration Received - Pending Admin Approval',
        html: this.getPendingApprovalEmailTemplate(name)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Pending approval email sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending pending approval email:', error);
      throw new Error('Failed to send pending approval email');
    }
  }

  /**
   * Send Rejection Email
   */
  async sendRejectionEmail(email, name, reason = '') {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '❌ Registration Status Update - Employee Management System',
        html: this.getRejectionEmailTemplate(name, reason)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Rejection email sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending rejection email:', error);
      throw new Error('Failed to send rejection email');
    }
  }

  /**
   * Send Welcome Email to Admin
   */
  async sendWelcomeEmail(email, name, role) {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '🎉 Welcome to Employee Management System!',
        html: this.getWelcomeEmailTemplate(name, role)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  /**
   * Send New User Notification to Admin
   */
  async sendNewUserNotification(adminEmail, adminName, userData) {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: adminEmail,
        subject: '👥 New User Registration Pending Approval',
        html: this.getNewUserNotificationTemplate(adminName, userData)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ New user notification sent to ${adminEmail}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending new user notification:', error);
      throw new Error('Failed to send notification');
    }
  }

  /**
   * Send Login Notification
   */
  async sendLoginNotification(email, name, ip, userAgent) {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '🔐 New Login Detected - Employee Management System',
        html: this.getLoginNotificationTemplate(name, ip, userAgent)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Login notification sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending login notification:', error);
      throw new Error('Failed to send login notification');
    }
  }

  /**
   * Send Account Suspension Email
   */
  async sendAccountSuspensionEmail(email, name, reason) {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '⚠️ Account Suspended - Employee Management System',
        html: this.getSuspensionEmailTemplate(name, reason)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Suspension email sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending suspension email:', error);
      throw new Error('Failed to send suspension email');
    }
  }

  /**
   * Send Account Activation Email
   */
  async sendAccountActivationEmail(email, name) {
    try {
      const mailOptions = {
        from: this.fromEmail,
        to: email,
        subject: '✅ Account Reactivated - Employee Management System',
        html: this.getActivationEmailTemplate(name)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Activation email sent to ${email}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending activation email:', error);
      throw new Error('Failed to send activation email');
    }
  }

  // ============ EMAIL TEMPLATES ============

  /**
   * OTP Email Template
   */
  getOTPEmailTemplate(otp, name) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 0; 
            line-height: 1.6;
          }
          .container { 
            max-width: 600px; 
            margin: 30px auto; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            padding: 40px; 
            text-align: center; 
          }
          .header h1 { 
            color: white; 
            margin: 0; 
            font-size: 28px; 
            font-weight: 600; 
          }
          .content { 
            padding: 40px; 
            background: white;
          }
          .otp-box { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            border-radius: 15px; 
            padding: 30px; 
            text-align: center; 
            margin: 30px 0; 
          }
          .otp-code { 
            font-size: 48px; 
            font-weight: bold; 
            letter-spacing: 10px; 
            color: white; 
            font-family: monospace;
          }
          .footer { 
            background: #f8f9fa; 
            padding: 30px; 
            text-align: center; 
            color: #666; 
            font-size: 13px; 
          }
          .btn {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin-top: 20px;
          }
          .warning {
            background: #fff3cd;
            border: 1px solid #ffc107;
            color: #856404;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Email Verification</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              Thank you for registering with Employee Management System. Please use the following OTP to verify your email address:
            </p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
              ⏰ This OTP will expire in <strong>${process.env.OTP_EXPIRE_MINUTES || 10} minutes</strong>
            </p>
            <div class="warning">
              <strong>⚠️ Important:</strong> Never share this OTP with anyone. Our team will never ask for your OTP.
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you didn't request this, please ignore this email or contact support.
            </p>
          </div>
          <div class="footer">
            <p style="margin-bottom: 10px;">© ${new Date().getFullYear()} Employee Management System. All rights reserved.</p>
            <p style="font-size: 12px; color: #999;">This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Approval Email Template
   */
  getApprovalEmailTemplate(name, role, comments) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            line-height: 1.6;
          }
          .container { 
            max-width: 600px; 
            margin: 30px auto; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
          }
          .header { 
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%); 
            padding: 40px; 
            text-align: center; 
          }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px; }
          .badge { 
            display: inline-block; 
            padding: 10px 25px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            border-radius: 30px; 
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
          }
          .btn {
            display: inline-block;
            padding: 14px 35px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin-top: 30px;
          }
          .comment-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #28a745;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Congratulations!</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 18px; margin-bottom: 20px;">
              Your account has been <span style="color: #28a745; font-weight: bold;">approved</span>!
            </p>
            <div style="text-align: center;">
              <span class="badge">Your Role: ${role}</span>
            </div>
            ${comments ? `
              <div class="comment-box">
                <strong style="color: #28a745; display: block; margin-bottom: 10px;">📝 Admin Comment:</strong>
                <p style="color: #666; margin: 0;">${comments}</p>
              </div>
            ` : ''}
            <p style="color: #666; font-size: 16px; margin: 30px 0 20px;">
              You can now login to your account and access the Employee Management System.
            </p>
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/login" class="btn">
                🚀 Login to Your Account
              </a>
            </div>
            <p style="color: #666; margin-top: 30px;">
              Best regards,<br>
              <strong>Admin Team</strong><br>
              Employee Management System
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Rejection Email Template
   */
  getRejectionEmailTemplate(name, reason) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
            line-height: 1.6;
          }
          .container { 
            max-width: 600px; 
            margin: 30px auto; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
          }
          .header { 
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); 
            padding: 40px; 
            text-align: center; 
          }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px; }
          .reason-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #dc3545;
            margin: 30px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❌ Registration Status</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 18px; margin-bottom: 20px;">
              We regret to inform you that your registration has been 
              <span style="color: #dc3545; font-weight: bold;">rejected</span>.
            </p>
            ${reason ? `
              <div class="reason-box">
                <strong style="color: #dc3545; display: block; margin-bottom: 10px;">📋 Reason:</strong>
                <p style="color: #666; margin: 0; font-size: 16px;">${reason}</p>
              </div>
            ` : ''}
            <p style="color: #666; font-size: 16px; margin-top: 30px;">
              Please contact HR department for more information or to reapply.
            </p>
            <p style="color: #666; margin-top: 30px;">
              Best regards,<br>
              <strong>Admin Team</strong><br>
              Employee Management System
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Pending Approval Email Template
   */
  getPendingApprovalEmailTemplate(name) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
          }
          .container { 
            max-width: 600px; 
            margin: 30px auto; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
          }
          .header { 
            background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); 
            padding: 40px; 
            text-align: center; 
          }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px; }
          .info-box {
            background: #fff3cd;
            border: 1px solid #ffc107;
            color: #856404;
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏳ Registration Received</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 18px; margin-bottom: 20px;">
              Thank you for registering with Employee Management System!
            </p>
            <div class="info-box">
              <p style="margin: 0 0 15px 0; font-size: 16px;">
                <strong>Your account is now pending admin approval.</strong>
              </p>
              <p style="margin: 0; font-size: 15px;">
                ⏱️ This process typically takes 24-48 hours.<br>
                📧 You will receive an email notification once your account is approved.
              </p>
            </div>
            <p style="color: #666; margin-top: 30px;">
              If you have any questions, please contact the HR department.
            </p>
            <p style="color: #666; margin-top: 30px;">
              Best regards,<br>
              <strong>Admin Team</strong><br>
              Employee Management System
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * New User Notification for Admin
   */
  getNewUserNotificationTemplate(adminName, user) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f7fb; }
          .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { padding: 40px; }
          .user-card { 
            background: #f8f9fa; 
            padding: 25px; 
            border-radius: 15px; 
            margin: 30px 0;
            border: 1px solid #e0e0e0;
          }
          .btn {
            display: inline-block;
            padding: 14px 35px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>👥 New Registration</h1>
          </div>
          <div class="content">
            <h2 style="color: #333;">Hello ${adminName},</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              A new user has registered and is pending your approval.
            </p>
            
            <div class="user-card">
              <h3 style="color: #667eea; margin-bottom: 20px;">User Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 40%;"><strong>Full Name:</strong></td>
                  <td style="padding: 10px 0; color: #333;">${user.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0; color: #333;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Employee ID:</strong></td>
                  <td style="padding: 10px 0; color: #333;">${user.employeeId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Department:</strong></td>
                  <td style="padding: 10px 0; color: #333;">${user.department}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Position:</strong></td>
                  <td style="padding: 10px 0; color: #333;">${user.position}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Registered:</strong></td>
                  <td style="padding: 10px 0; color: #333;">${new Date().toLocaleDateString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/admin/dashboard" class="btn">
                ⚡ Review Application
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Welcome Email for Admin
   */
  getWelcomeEmailTemplate(name, role) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px; }
          .admin-badge { 
            background: #ffc107; 
            color: #856404; 
            padding: 12px 30px; 
            border-radius: 30px; 
            display: inline-block;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to the Team!</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 18px; margin-bottom: 20px;">
              Your administrator account has been created successfully!
            </p>
            <div style="text-align: center;">
              <span class="admin-badge">👑 ${role === 'super_admin' ? 'Super Admin' : 'Admin'}</span>
            </div>
            <p style="color: #666; font-size: 16px; margin: 30px 0;">
              You now have full access to the Employee Management System. You can:
            </p>
            <ul style="color: #666; font-size: 16px; margin-left: 20px; line-height: 1.8;">
              <li>✅ Approve/reject user registrations</li>
              <li>✅ Manage employee roles and permissions</li>
              <li>✅ View system statistics and reports</li>
              <li>✅ Configure system settings</li>
            </ul>
            <div style="text-align: center; margin-top: 40px;">
              <a href="${process.env.FRONTEND_URL}/admin/dashboard" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                🚀 Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Password Reset OTP Template
   */
  getPasswordResetOTPTemplate(otp, name) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); }
          .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
          .header { background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); padding: 40px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px; }
          .otp-box { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 15px; 
            text-align: center; 
            margin: 30px 0;
            border: 2px dashed #ffc107;
          }
          .otp-code { 
            font-size: 48px; 
            font-weight: bold; 
            letter-spacing: 10px; 
            color: #ffc107; 
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔑 Password Reset</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              We received a request to reset your password. Use the following OTP to proceed:
            </p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <p style="color: #666; margin-top: 20px; font-size: 14px;">
                ⏰ This OTP will expire in 10 minutes
              </p>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you didn't request this, please ignore this email and ensure your account is secure.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Login Notification Template
   */
  getLoginNotificationTemplate(name, ip, userAgent) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); }
          .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
          .header { background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); padding: 40px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px; }
          .info-box { 
            background: #f8f9fa; 
            padding: 25px; 
            border-radius: 15px; 
            margin: 30px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 New Login Detected</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              A new login was detected on your account.
            </p>
            <div class="info-box">
              <h3 style="color: #17a2b8; margin-bottom: 15px;">Login Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Time:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>IP Address:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${ip}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Device:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${userAgent}</td>
                </tr>
              </table>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              <strong>⚠️ Not you?</strong> If this wasn't you, please contact admin immediately and change your password.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Account Suspension Template
   */
  getSuspensionEmailTemplate(name, reason) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); }
          .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
          .header { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 40px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚠️ Account Suspended</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 18px; margin-bottom: 20px;">
              Your account has been <span style="color: #dc3545; font-weight: bold;">suspended</span>.
            </p>
            ${reason ? `
              <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 30px 0;">
                <strong style="color: #dc3545;">Reason:</strong>
                <p style="color: #666; margin-top: 10px;">${reason}</p>
              </div>
            ` : ''}
            <p style="color: #666; font-size: 16px;">
              Please contact administrator for more information.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Account Activation Template
   */
  getActivationEmailTemplate(name) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); }
          .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { padding: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Account Reactivated</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name},</h2>
            <p style="color: #666; font-size: 18px; margin-bottom: 20px;">
              Your account has been <span style="color: #28a745; font-weight: bold;">reactivated</span>!
            </p>
            <p style="color: #666; font-size: 16px; margin-bottom: 30px;">
              You can now login to your account and access the Employee Management System.
            </p>
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
                🚀 Login Now
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();