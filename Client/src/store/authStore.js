import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000/api";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,

  // Set user and token
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },

  // Send OTP for email verification
  sendOTP: async (email, name) => {
    try {
      const response = await axios.post(`${API_URL}/auth/send-otp`, {
        email,
        name,
      });

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        return {
          success: true,
          otp: response.data.otp,
        };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send OTP";
      toast.error(message);
      return { success: false, message };
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      if (response.data.success) {
        toast.success("Email verified successfully!");
        return {
          success: true,
          data: response.data.data,
        };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Invalid OTP";
      toast.error(message);
      return { success: false, message };
    }
  },

  // Login function
  login: async (identifier, password) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        identifier,
        password,
      });

      if (response.data.success) {
        const { token, employee } = response.data.data;
        get().setToken(token);
        set({ user: employee, loading: false });
        toast.success("Login successful!");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      set({ loading: false });
      return { success: false, message };
    }
  },

  // Register function
  register: async (formData) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData);

      if (response.data.success) {
        const { token, employee } = response.data.data;
        get().setToken(token);
        set({ user: employee, loading: false });
        toast.success("Registration successful!");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      set({ loading: false });
      return { success: false, message };
    }
  },

  // Logout function
  logout: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    }
    get().setToken(null);
    set({ user: null });
    toast.success("Logged out successfully");
  },

  // Check authentication
  checkAuth: async () => {
    const token = get().token;
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        set({ user: response.data.data.employee });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      get().setToken(null);
      set({ user: null });
    }
  },
}));
