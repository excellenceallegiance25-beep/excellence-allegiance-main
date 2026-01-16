// OTP storage (in production, use database)
const otpStore = new Map();

// Generate random 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP with expiration (5 minutes)
export const storeOTP = (email, phone, otp) => {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  
  otpStore.set(email, { 
    otp, 
    phone, 
    expiresAt,
    attempts: 0 
  });
  
  // Auto remove after expiration
  setTimeout(() => {
    if (otpStore.has(email)) {
      otpStore.delete(email);
    }
  }, 5 * 60 * 1000);
  
  return { 
    otp, 
    expiresAt: new Date(expiresAt),
    phone 
  };
};

// Verify OTP
export const verifyOTP = (email, otp) => {
  const storedData = otpStore.get(email);
  
  if (!storedData) {
    return { 
      success: false, 
      message: 'OTP not found or expired' 
    };
  }
  
  // Check expiration
  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(email);
    return { 
      success: false, 
      message: 'OTP expired' 
    };
  }
  
  // Check attempts limit
  if (storedData.attempts >= 3) {
    otpStore.delete(email);
    return { 
      success: false, 
      message: 'Too many attempts. OTP has been reset.' 
    };
  }
  
  // Increment attempts
  storedData.attempts += 1;
  otpStore.set(email, storedData);
  
  // Verify OTP
  if (storedData.otp !== otp) {
    return { 
      success: false, 
      message: 'Invalid OTP',
      attemptsLeft: 3 - storedData.attempts
    };
  }
  
  // OTP verified successfully
  const { phone } = storedData;
  otpStore.delete(email);
  
  return { 
    success: true, 
    message: 'OTP verified successfully',
    phone: phone
  };
};

// REAL EMAIL SENDING FUNCTION
export const sendOTPViaEmail = async (email, otp) => {
  try {
    console.log(`📧 Attempting to send email to: ${email}`);
    console.log(`📧 OTP: ${otp}`);
    
    // Call your backend API to send real email
    const response = await fetch('http://192.168.68.109:10000/api/auth/send-otp-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
        subject: 'Your OTP Verification Code - Excellence Allegiance',
        message: `Your OTP code is: ${otp}. This code will expire in 5 minutes.`
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Email sent successfully to: ${email}`);
      return { 
        success: true, 
        message: 'OTP sent to email successfully',
        data: data 
      };
    } else {
      console.error('❌ Email sending failed:', data.message);
      // Fallback to mock for testing
      return sendMockEmail(email, otp);
    }
  } catch (error) {
    console.error('❌ Email API error:', error);
    // Fallback to mock for testing
    return sendMockEmail(email, otp);
  }
};

// REAL SMS SENDING FUNCTION
export const sendOTPViaSMS = async (phone, otp) => {
  try {
    console.log(`📱 Attempting to send SMS to: ${phone}`);
    console.log(`📱 OTP: ${otp}`);
    
    // Call your backend API to send real SMS
    const response = await fetch('http://192.168.68.109:10000/api/auth/send-otp-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        otp: otp,
        message: `Your Excellence Allegiance OTP is: ${otp}. Valid for 5 minutes.`
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ SMS sent successfully to: ${phone}`);
      return { 
        success: true, 
        message: 'OTP sent to phone successfully',
        data: data 
      };
    } else {
      console.error('❌ SMS sending failed:', data.message);
      // Fallback to mock for testing
      return sendMockSMS(phone, otp);
    }
  } catch (error) {
    console.error('❌ SMS API error:', error);
    // Fallback to mock for testing
    return sendMockSMS(phone, otp);
  }
};

// MOCK FUNCTIONS (for testing when backend is not available)
const sendMockEmail = async (email, otp) => {
  console.log(`📧 [MOCK] Email would be sent to: ${email}`);
  console.log(`📧 [MOCK] OTP: ${otp}`);
  console.log(`📧 [MOCK] Subject: Your Verification Code - ${otp}`);
  console.log(`📧 [MOCK] Body: Your OTP code is ${otp}. Valid for 5 minutes.`);
  
  // Show alert for testing
  alert(`📧 MOCK EMAIL:\nTo: ${email}\nOTP: ${otp}\n\n(In production, real email would be sent)`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        message: 'Mock email sent (testing mode)',
        isMock: true 
      });
    }, 1000);
  });
};

const sendMockSMS = async (phone, otp) => {
  console.log(`📱 [MOCK] SMS would be sent to: ${phone}`);
  console.log(`📱 [MOCK] OTP: ${otp}`);
  console.log(`📱 [MOCK] Message: Your verification code is ${otp}. Valid for 5 minutes.`);
  
  // Show alert for testing
  alert(`📱 MOCK SMS:\nTo: ${phone}\nOTP: ${otp}\n\n(In production, real SMS would be sent)`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        message: 'Mock SMS sent (testing mode)',
        isMock: true 
      });
    }, 1000);
  });
};

// Send OTP to both email and SMS
export const sendOTP = async (email, phone) => {
  try {
    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP
    storeOTP(email, phone, otp);
    
    console.log(`🎯 Generated OTP: ${otp} for ${email}`);
    console.log(`🎯 Stored OTP with expiry: 5 minutes`);
    
    // Send to both channels
    const [smsResult, emailResult] = await Promise.all([
      sendOTPViaSMS(phone, otp),
      sendOTPViaEmail(email, otp)
    ]);
    
    return {
      success: smsResult.success && emailResult.success,
      otp: otp, // For testing only
      message: 'OTP sent successfully',
      sms: smsResult,
      email: emailResult,
      isMock: smsResult.isMock || emailResult.isMock
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: 'Failed to send OTP'
    };
  }
};