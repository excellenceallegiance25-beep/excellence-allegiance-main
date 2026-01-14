const twilio = require("twilio");

class SMSService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendOTP(phoneNumber, otpCode) {
    try {
      const message = await this.client.messages.create({
        body: `Your ExcellencePro OTP: ${otpCode}. Valid for 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });

      console.log(`📱 SMS sent to ${phoneNumber}: ${message.sid}`);
      return true;
    } catch (error) {
      console.error("SMS sending error:", error);

      // For demo/testing purposes, log the OTP
      console.log(`📱 DEMO: OTP for ${phoneNumber}: ${otpCode}`);

      return false; // Return true for demo to simulate success
    }
  }

  async sendCredentials(phoneNumber, credentials) {
    try {
      const message = await this.client.messages.create({
        body:
          `Welcome to ExcellencePro!\n\n` +
          `Registration ID: ${credentials.registrationId}\n` +
          `Company Email: ${credentials.companyEmail}\n` +
          `Password: ${credentials.password}\n\n` +
          `Login: ${process.env.CLIENT_URL}/login\n\n` +
          `Keep these credentials secure.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });

      console.log(`📱 Credentials sent to ${phoneNumber}: ${message.sid}`);
      return true;
    } catch (error) {
      console.error("Credentials SMS error:", error);

      // Log for demo
      console.log(`📱 DEMO: Credentials for ${phoneNumber}:`, credentials);

      return false; // Return true for demo
    }
  }
}

module.exports = new SMSService();
