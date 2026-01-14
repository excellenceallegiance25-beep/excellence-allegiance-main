// client/src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookies
    const token =
      localStorage.getItem("access_token") ||
      getCookie("access_token") ||
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Store tokens after successful login/registration
const storeAuthTokens = (data) => {
  if (data.accessToken) {
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("token", data.accessToken); // For backward compatibility
  }
  if (data.refreshToken) {
    localStorage.setItem("refresh_token", data.refreshToken);
  }
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

const authService = {
  // Register new user
  register: async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      if (response.data.success && response.data.data) {
        storeAuthTokens(response.data.data);
      }
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Verify OTPs after registration
  verifyRegistrationOTP: async (data) => {
    try {
      const response = await api.post("/auth/verify-otp", data);
      if (response.data.success && response.data.data) {
        storeAuthTokens(response.data.data);
      }
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Step 1: Send OTP
  sendOTP: async (data) => {
    try {
      const response = await api.post("/auth/send-otp", {
        email: data.email,
        name: data.name,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Step 2: Verify OTP
  verifyOTP: async (data) => {
    try {
      const response = await api.post("/auth/verify-otp", {
        email: data.email,
        otp: data.otp,
        registrationId: data.registrationId,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Step 3: Complete Registration with Company Info
  completeRegistration: async (data) => {
    try {
      const response = await api.post("/auth/verify-and-register", {
        email: data.email,
        otp: data.otp,
        registrationId: data.registrationId,
        password: data.password,
        companyName: data.companyName,
        companyType: data.companyType || "IT",
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Step 4: Resend OTP
  resendOTP: async (data) => {
    try {
      const response = await api.post("/auth/resend-otp", {
        email: data.email,
        name: data.name,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Forgot password - request reset email
  forgotPassword: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Reset password using token from email
  resetPassword: async (data) => {
    try {
      const response = await api.post("/auth/reset-password", {
        token: data.token,
        email: data.email,
        newPassword: data.newPassword,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Login
  login: async (data) => {
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false,
        deviceInfo: data.deviceInfo || {},
      });

      if (response.data.success && response.data.data) {
        storeAuthTokens(response.data.data);
      }

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Get current user - This endpoint doesn't exist in your backend!
  // Use getProfile instead
  getCurrentUser: async () => {
    try {
      // Try to get from localStorage first
      const userData = localStorage.getItem("user");
      if (userData) {
        return {
          success: true,
          data: { user: JSON.parse(userData) },
        };
      }

      // If not in localStorage, use getProfile
      return await authService.getProfile();
    } catch (error) {
      console.error("Get current user error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Not authenticated",
        }
      );
    }
  },

  // Get profile (detailed) - This is the correct endpoint
  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile");

      // Update localStorage with fresh data
      if (response.data.success && response.data.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }

      return response.data;
    } catch (error) {
      console.error("Get profile error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: error.response?.data?.message || "Failed to fetch profile",
        }
      );
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put("/auth/profile", profileData);

      // Update localStorage if successful
      if (response.data.success && response.data.data?.user) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            ...response.data.data.user,
          })
        );
      }

      return response.data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: error.response?.data?.message || "Failed to update profile",
        }
      );
    }
  },

  // Upload avatar (multipart/form-data)
  uploadAvatar: async (formData, onUploadProgress) => {
    try {
      const response = await api.post("/auth/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
      });

      // Update localStorage if successful
      if (response.data.success && response.data.data?.user) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            ...response.data.data.user,
          })
        );
      }

      return response.data;
    } catch (error) {
      console.error("Upload avatar error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: error.response?.data?.message || "Failed to upload avatar",
        }
      );
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post("/auth/logout");

      // Clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear cookies
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      return response.data;
    } catch (error) {
      // Still clear storage even if API call fails
      localStorage.clear();
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Logout all sessions
  logoutAll: async () => {
    try {
      const response = await api.post("/auth/logout-all", { logoutAll: true });

      // Clear local storage
      localStorage.clear();

      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      return response.data;
    } catch (error) {
      localStorage.clear();
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Change password
  changePassword: async (data) => {
    try {
      const response = await api.post("/auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword || data.newPassword,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Delete account (soft-delete)
  deleteAccount: async (password) => {
    try {
      const response = await api.delete("/auth/profile", {
        data: { password },
      });

      // Clear local storage after account deletion
      localStorage.clear();

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Get security settings
  getSecuritySettings: async () => {
    try {
      const response = await api.get("/auth/security-settings");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Update security settings
  updateSecuritySettings: async (payload) => {
    try {
      const response = await api.put("/auth/security-settings", payload);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Sessions
  getSessions: async () => {
    try {
      const response = await api.get("/auth/sessions");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  revokeSession: async (sessionId) => {
    try {
      const response = await api.post(`/auth/sessions/revoke/${sessionId}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // 2FA
  enable2FA: async () => {
    try {
      const response = await api.post("/auth/enable-2fa");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  verify2FASetup: async (data) => {
    try {
      const response = await api.post("/auth/verify-2fa-setup", data);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  disable2FA: async (password) => {
    try {
      const response = await api.post("/auth/disable-2fa", { password });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Verify 2FA token (for login)
  verify2FA: async (data) => {
    try {
      const response = await api.post("/auth/verify-2fa", data);
      if (response.data.success && response.data.data) {
        storeAuthTokens(response.data.data);
      }
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { success: false, message: "Network error" }
      );
    }
  },

  // Check backend connection
  checkConnection: async () => {
    try {
      const response = await api.get("/auth/health");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Backend not reachable",
        }
      );
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const refreshToken =
        localStorage.getItem("refresh_token") || getCookie("refresh_token");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/auth/refresh-token", { refreshToken });

      if (response.data.success && response.data.data) {
        storeAuthTokens(response.data.data);
      }

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to refresh token",
        }
      );
    }
  },
};

export default authService;
