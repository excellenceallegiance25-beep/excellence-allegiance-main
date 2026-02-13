
const axios = require('axios');

const sendSMSViaTwilio = async (phone, message) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    
    console.log('SMS sent via Twilio:', response.sid);
    return true;
  } catch (error) {
    console.error('Twilio SMS error:', error);
    return false;
  }
};

const sendSMSViaTextLocal = async (phone, message) => {
  try {
    const response = await axios.post('https://api.textlocal.in/send/', null, {
      params: {
        apikey: process.env.TEXTLOCAL_API_KEY,
        sender: 'EXLIT', 
        numbers: phone.replace('+', ''),
        message: message
      }
    });
    
    console.log('SMS sent via TextLocal:', response.data);
    return response.data.status === 'success';
  } catch (error) {
    console.error('TextLocal SMS error:', error);
    return false;
  }
};

const sendSMSVia2Factor = async (phone, otp) => {
  try {
    const response = await axios.get('https://2factor.in/API/V1/' + process.env.TWO_FACTOR_API_KEY + '/SMS/' + phone + '/' + otp);
    console.log('SMS sent via 2Factor:', response.data);
    return response.data.Status === 'Success';
  } catch (error) {
    console.error('2Factor SMS error:', error);
    return false;
  }
};


const sendSMSViaFast2SMS = async (phone, message) => {
  try {
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'q',
      message,
      language: 'english',
      numbers: phone.replace('+', '')
    }, {
      headers: {
        'authorization': process.env.FAST2SMS_API_KEY
      }
    });
    
    console.log('SMS sent via Fast2SMS:', response.data);
    return response.data.return;
  } catch (error) {
    console.error('Fast2SMS error:', error);
    return false;
  }
};
const sendOTPSMS = async (phone, otp) => {
  const message = `Your OTP for Excellence IT Services is ${otp}. Valid for 5 minutes.`;
  
  // Choose your SMS provider
  try {
    // Method 1: Twilio (Paid)
    // return await sendSMSViaTwilio(phone, message);
    
    // Method 2: TextLocal
    // return await sendSMSViaTextLocal(phone, message);
    
    // Method 3: 2Factor
    // return await sendSMSVia2Factor(phone, otp);
    
    // Method 4: Fast2SMS
    // return await sendSMSViaFast2SMS(phone, message);
    
    // For testing - log to console
    console.log(`SMS OTP for ${phone}: ${otp}`);
    return true;
  } catch (error) {
    console.error('SMS sending failed:', error);
    return false;
  }
};

module.exports = {
  sendOTPSMS
};