// pages/LoginPage.js
import React, { useState, useRef, useEffect } from 'react';
import Popup from '../components/Popup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [popupState, setPopupState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
    showCancel: false,
    confirmText: 'OK',
    cancelText: 'Cancel'
  });
  const navigate = useNavigate();
  const { login, isUserRegistered, verifyLogin, loginApi } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const redirectTimeout = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Try server-side login first (recommended)
      let loginResult = null;
      try {
        loginResult = await loginApi({ email: formData.email, password: formData.password });
      } catch (serverErr) {
        console.warn('Server login failed, falling back to local auth:', serverErr.message || serverErr);
      }

      if (loginResult && loginResult.success) {
        const loginData = {
          ...loginResult.user,
          isLoggedIn: true,
          loginTime: new Date().toISOString(),
          token: loginResult.token
        };
        login(loginData);
      } else {
        // Fallback to localStorage-based auth (existing behavior)
        if (!isUserRegistered(formData.email)) {
          throw new Error('No account found with this email. Please register first.');
        }

        const user = verifyLogin(formData.email, formData.password);
        if (!user) {
          throw new Error('Invalid password. Please try again.');
        }

        const loginData = {
          ...user,
          isLoggedIn: true,
          loginTime: new Date().toISOString(),
          token: 'auth-token-' + Math.random().toString(36).substr(2, 9)
        };

        login(loginData);
      }
      // show success popup and auto-redirect shortly (keeps popup visible)
      setPopupState({
        isOpen: true,
        title: 'Login successful',
        message: 'Welcome back! Redirecting to admin dashboard...',
        type: 'success',
        showCancel: false,
        confirmText: 'Continue',
        onConfirm: () => {
          if (redirectTimeout.current) {
            clearTimeout(redirectTimeout.current);
            redirectTimeout.current = null;
          }
          setPopupState(prev => ({ ...prev, isOpen: false }));
          navigate('/admin-dashboard');
        }
      });

      
      redirectTimeout.current = setTimeout(() => {
        setPopupState(prev => ({ ...prev, isOpen: false }));
        redirectTimeout.current = null;
        navigate('/admin-dashboard');
      }, 800);
      
    } catch (err) {
      setError(err.message);
    
      setPopupState({
        isOpen: true,
        title: 'Login failed',
        message: err.message,
        type: 'error',
        showCancel: false,
        confirmText: 'Close',
        onConfirm: () => {
          if (redirectTimeout.current) {
            clearTimeout(redirectTimeout.current);
            redirectTimeout.current = null;
          }
          setPopupState(prev => ({ ...prev, isOpen: false }));
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    if (redirectTimeout.current) {
      clearTimeout(redirectTimeout.current);
      redirectTimeout.current = null;
    }
    setPopupState(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    return () => {
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-20 right-16 w-20 h-20 bg-purple-300 rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full opacity-25 animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{animationDuration: '5s'}}></div>
        
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-yellow-300 rounded-lg opacity-30 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-green-300 rounded-lg opacity-25 animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-10 h-10 bg-red-300 rounded-full opacity-40 animate-bounce" style={{animationDuration: '6s'}}></div>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-200 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-200 opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Navbar />
      
      <div className="pt-24 pb-12 relative z-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome Back
              </h2>
              <p className="text-gray-600 mt-2">
                Sign in to your Excellence Allegiance account
              </p>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.83 3.83" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
  );
};

export default LoginPage;