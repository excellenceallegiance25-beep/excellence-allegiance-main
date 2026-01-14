import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Key, 
  AlertCircle, 
  Check, 
  ArrowLeft,
  Clock,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    // Get email from location state or localStorage
    const pendingReg = localStorage.getItem('pendingRegistration');
    const locationEmail = location.state?.email;
    
    if (locationEmail) {
      setEmail(locationEmail);
    } else if (pendingReg) {
      try {
        const regData = JSON.parse(pendingReg);
        setEmail(regData.email);
      } catch (err) {
        console.error('Error parsing registration data:', err);
      }
    } else {
      navigate('/register');
    }
  }, [location, navigate]);

  useEffect(() => {
    // Auto-focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Countdown timer for resend OTP
    let interval;
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
      setTimer(60);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendDisabled, timer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const otpArray = pastedData.split('');
      const newOtp = [...otp];
      otpArray.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      // Real OTP verification API call
      // const response = await authAPI.verifyOTP(email, otpString);
      
      // Mock response (replace with real API)
      const mockResponse = {
        success: true,
        message: 'Email verified successfully',
        token: 'verified-jwt-token',
        user: {
          email: email,
          role: 'employee', // Get from registration data
          profileCompleted: false
        }
      };

      if (mockResponse.success) {
        setSuccess(true);
        
        // Clear pending registration
        localStorage.removeItem('pendingRegistration');
        
        // Auto login with verified account
        setTimeout(async () => {
          // You need to get the password from registration flow
          // For now, redirect to login
          navigate('/login', { 
            state: { 
              message: 'Email verified successfully! Please login.',
              verifiedEmail: email
            } 
          });
        }, 2000);
      } else {
        setError(mockResponse.message || 'Invalid OTP code');
        // Clear OTP on error
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setResendDisabled(true);
    setTimer(60);

    try {
      // Real resend OTP API call
      // await authAPI.resendOTP(email);
      
      // Mock success
      console.log('OTP resent to:', email);
      
      // Clear OTP inputs
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError('Failed to resend OTP. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4">
              <Check className="text-white" size={36} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Email Verified!</h1>
            <p className="text-gray-600 mt-2">Your account is now ready</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-green-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification Complete</h2>
              <p className="text-gray-600 mb-4">
                Your email has been successfully verified.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="font-medium text-gray-900">{email}</p>
                <p className="text-sm text-gray-500 mt-1">✓ Email verified successfully</p>
              </div>
            </div>

            <div className="animate-pulse">
              <p className="text-sm text-gray-500">Redirecting to login...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <Key className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600 mt-2">Enter the 6-digit code sent to your email</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Email Display */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-3">
              <Mail size={18} className="text-gray-500" />
              <p className="font-medium text-gray-900 truncate">{email}</p>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              Check your inbox for the OTP code
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                6-Digit Verification Code
              </label>
              
              <div className="flex justify-center space-x-3" onPaste={handlePaste}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Enter the code you received via email
              </p>
            </div>

            {/* Timer & Resend */}
            <div className="flex flex-col items-center space-y-4">
              {resendDisabled ? (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">
                    Resend code in <span className="font-bold">{timer}s</span>
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  <RefreshCw size={16} />
                  <span>Resend OTP Code</span>
                </button>
              )}
              
              <p className="text-xs text-gray-500 text-center">
                Didn't receive the code? Check your spam folder or request a new code.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </span>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          {/* Back to Registration */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              <span>Back to Registration</span>
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-5 w-5 bg-blue-400 rounded-full flex items-center justify-center">
                  <Key className="text-white" size={12} />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Important Security Note</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>• Never share your OTP with anyone</p>
                  <p>• OTP expires in 10 minutes</p>
                  <p>• Valid for one-time use only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;