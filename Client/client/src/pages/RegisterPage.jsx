import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const { sendOtp, verifyOtpApi, registerApi, login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // UI state
  const [step, setStep] = useState('form'); // 'form', 'otp', 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

 
  const [pendingData, setPendingData] = useState(null);

 
  const [popup, setPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

 
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showPopup('Validation Error', error, 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      
      const data = await sendOtp(formData.email, formData.name);

      if (data.success) {
        setPendingData(formData);
        setStep('otp');
        showPopup(
          '✉️ Verification Code Sent',
          `We've sent a 6-digit OTP to ${formData.email}. Check your email and enter it below.`,
          'success'
        );
      } else {
        setError(data.message || 'Failed to send OTP');
        showPopup('Error', data.message || 'Failed to send OTP', 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Connection error. Please try again.');
      showPopup('Connection Error', 'Failed to connect to server', 'error');
    } finally {
      setLoading(false);
    }
  };

  
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await verifyOtpApi(pendingData.email, otp);

      if (data.success) {
      
        const registerData = await registerApi({
          name: pendingData.name,
          email: pendingData.email,
          password: pendingData.password
        });

        if (registerData.success) {
          
          if (registerData.token && registerData.user) {
            login({ ...registerData.user, token: registerData.token, isLoggedIn: true });
          }

          setStep('success');
          showPopup(
            '🎉 Registration Successful!',
            `Welcome ${pendingData.name}! Your account is ready. You will be redirected to login.`,
            'success'
          );

          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setError(registerData.message || 'Registration failed');
          showPopup('Registration Failed', registerData.message || 'Failed to create account', 'error');
        }
      } else {
        setError(data.message || 'Invalid OTP');
        showPopup('Verification Failed', data.message || 'Invalid OTP. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Verification failed. Please try again.');
      showPopup('Error', 'Failed to verify OTP', 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleResendOtp = async () => {
    if (resendDisabled) return;

    setLoading(true);

    try {
      const data = await sendOtp(pendingData.email, pendingData.name);

      if (data.success) {
        setResendDisabled(true);
        setResendTimer(60);
        setOtp('');
        
        const interval = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setResendDisabled(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        showPopup('✉️ Code Resent', `A new OTP has been sent to ${pendingData.email}`, 'success');
      } else {
        showPopup('Error', data.message || 'Failed to resend OTP', 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showPopup('Error', 'Failed to resend OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

 
  const showPopup = (title, message, type) => {
    setPopup({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };
  const handleBackToForm = () => {
    setStep('form');
    setOtp('');
    setError('');
    setPendingData(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-20 right-16 w-20 h-20 bg-purple-300 rounded-full opacity-40 animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full opacity-25 animate-pulse" style={{ animationDuration: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{ animationDuration: '5s' }}></div>
      </div>

      <Navbar />

      <div className="pt-24 pb-12 relative z-10">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500">
                <span className="text-2xl">
                  {step === 'form' ? '👤' : step === 'otp' ? '📧' : '✓'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 'form' ? 'Create Account' : step === 'otp' ? 'Verify Email' : 'Registration Complete'}
              </h2>
              <p className="text-gray-600 mt-2">
                {step === 'form'
                  ? 'Join Excellence Allegiance'
                  : step === 'otp'
                  ? 'Enter the code sent to your email'
                  : 'Your account is ready!'}
              </p>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            {step === 'form' && (
              <form onSubmit={handleSubmitForm} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to{' '}
                    <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-md font-medium text-white transition-all ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {loading ? 'Sending Code...' : 'Send Verification Code'}
                </button>

                <div className="text-center text-sm text-gray-600 pt-4 border-t">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </form>
            )}
            {step === 'otp' && pendingData && (
              <div className="space-y-5">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> {pendingData.email}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Check your email inbox (and spam folder) for the 6-digit code
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">6-Digit Code *</label>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                      setError('');
                    }}
                    placeholder="000000"
                    className="w-full px-3 py-3 text-center text-3xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 tracking-widest"
                  />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-600">Code expires in 10 minutes</p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendDisabled || loading}
                    className="text-blue-600 hover:underline disabled:text-gray-400 font-medium"
                  >
                    {resendDisabled ? `Resend in ${resendTimer}s` : 'Resend Code'}
                  </button>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || loading}
                  className={`w-full py-3 rounded-md font-medium text-white transition-all ${
                    otp.length !== 6 || loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {loading ? 'Verifying...' : 'Verify & Create Account'}
                </button>

                <button
                  onClick={handleBackToForm}
                  className="w-full py-2 text-blue-600 hover:underline font-medium"
                >
                  ← Back to Registration
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <span className="text-3xl">🎉</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Welcome {pendingData?.name}!
                  </h3>
                  <p className="text-gray-600">
                    Your account has been created successfully. You can now login with your credentials.
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm">
                    <strong>Email:</strong> {pendingData?.email}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    A welcome email has been sent to your inbox
                  </p>
                </div>

                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium rounded-md shadow-md hover:shadow-lg"
                >
                  Go to Login
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-gray-700">
            <p className="font-semibold mb-2">📧 Email Verification</p>
            <ul className="text-xs space-y-1 text-gray-600">
              <li>✓ OTP sent to your email</li>
              <li>✓ Check spam folder if needed</li>
              <li>✓ Code expires in 10 minutes</li>
              <li>✓ Welcome email after verification</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {popup.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-2">{popup.title}</h3>
            <p className="text-gray-600 mb-6">{popup.message}</p>
            <button
              onClick={closePopup}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;