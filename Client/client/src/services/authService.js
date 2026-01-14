import api from './api';

export const authService = {
  // Login
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  // Register
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },
  
  // Logout
  logout: async () => {
    return api.post('/auth/logout');
  },
  
  // Get current user
  getCurrentUser: async () => {
    return api.get('/auth/me');
  },
  
  // Verify OTP
  verifyOtp: async (email, otp) => {
    return api.post('/auth/verify-otp', { email, otp });
  },
  
  // Resend OTP
  resendOtp: async (email) => {
    return api.post('/auth/resend-otp', { email });
  }
};