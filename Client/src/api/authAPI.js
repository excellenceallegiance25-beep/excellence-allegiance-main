// src/api/authAPI.js
const API_URL = "http://localhost:5000/api"; // তোমার backend URL

const authAPI = {
  // Send OTP
  sendOTP: async (email, name) => {
    try {
      const response = await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });
      const data = await response.json();
      return { data }; // তোমার কোডে response.data.success চেক করে
    } catch (error) {
      console.error("Send OTP error:", error);
      return {
        data: {
          success: false,
          message: "Network error",
        },
      };
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp, registrationId) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, registrationId }),
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("Verify OTP error:", error);
      return {
        data: {
          success: false,
          message: "Network error",
        },
      };
    }
  },

  // Resend OTP
  resendOTP: async (email, name) => {
    try {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("Resend OTP error:", error);
      return {
        data: {
          success: false,
          message: "Network error",
        },
      };
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        data: {
          success: false,
          message: "Network error",
        },
      };
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return { data };
    } catch (error) {
      console.error("Login error:", error);
      return {
        data: {
          success: false,
          message: "Network error",
        },
      };
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("Forgot password error:", error);
      return {
        data: {
          success: false,
          message: "Network error",
        },
      };
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-email/${token}`);
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("Verify email error:", error);
      return {
        data: {
          success: false,
          message: "Network error",
        },
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default authAPI;
