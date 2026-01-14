
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const registeredUsers = localStorage.getItem('registeredUsers');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (!registeredUsers) {
      localStorage.setItem('registeredUsers', JSON.stringify([]));
    }
    
    setLoading(false);
  }, []);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


  const apiRegister = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (error) {
      console.error('API register error', error);
      return { success: false, message: error.message };
    }
  };

  const apiLogin = async (credentials) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await res.json();
    } catch (error) {
      console.error('API login error', error);
      return { success: false, message: error.message };
    }
  };

  const apiSendOtp = async (email, name) => {
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      return await res.json();
    } catch (error) {
      console.error('API send-otp error', error);
      return { success: false, message: error.message };
    }
  };

  const apiVerifyOtp = async (email, otp) => {
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      return await res.json();
    } catch (error) {
      console.error('API verify-otp error', error);
      return { success: false, message: error.message };
    }
  };
 
  const sendOtp = (email, name) => apiSendOtp(email, name);
  const verifyOtpApi = (email, otp) => apiVerifyOtp(email, otp);
  const registerApi = (userData) => apiRegister(userData);
  const loginApi = (credentials) => apiLogin(credentials);
  const isUserRegistered = (email) => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      return registeredUsers.some(user => user.email === email);
    } catch (error) {
      console.error('Error checking user registration:', error);
      return false;
    }
  };

 
  const verifyLogin = (email, password) => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(user => 
        user.email === email && user.password === password
      );
      return user || null;
    } catch (error) {
      console.error('Error verifying login:', error);
      return null;
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  const generateOTP = (identifier, ttlMinutes = 5) => {
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
      const otps = JSON.parse(localStorage.getItem('otps') || '{}');
      otps[identifier] = { code, expiresAt };
      localStorage.setItem('otps', JSON.stringify(otps));
      
      console.info(`[OTP] Sent to ${identifier}: ${code} (expires in ${ttlMinutes} min)`);
      return code;
    } catch (error) {
      console.error('Error generating OTP', error);
      return null;
    }
  };

  const verifyOTP = (identifier, code) => {
    try {
      const otps = JSON.parse(localStorage.getItem('otps') || '{}');
      const record = otps[identifier];
      if (!record) return false;
      if (Date.now() > record.expiresAt) {
        delete otps[identifier];
        localStorage.setItem('otps', JSON.stringify(otps));
        return false;
      }
      if (record.code === String(code)) {
        delete otps[identifier];
        localStorage.setItem('otps', JSON.stringify(otps));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying OTP', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return newUser;
  };

  const value = {
    user,
    login,
    logout,
    register,
    isUserRegistered,
    verifyLogin,
    loading,
    generateOTP,
    verifyOTP,
    apiRegister,
    apiLogin,
    apiSendOtp,
    apiVerifyOtp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};