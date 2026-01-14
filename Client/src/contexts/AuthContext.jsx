// src/contexts/AuthContext.jsx - সম্পূর্ণ আপডেটেড
import { createContext, useState, useContext, useEffect } from "react";
import { authAPI, userAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          // await authAPI.verifyToken();
          setUser(JSON.parse(savedUser));
        } catch (err) {
          console.warn("Token validation failed, clearing storage");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate User ID function
  const generateUserId = (role) => {
    const prefix =
      {
        admin: "ADM",
        manager: "MGR",
        employee: "EMP",
        user: "USR",
      }[role] || "USR";

    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}-${timestamp}${random}`;
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      let userRole = "employee";
      let userId = "EMP-001";

      if (email.includes("admin")) {
        userRole = "admin";
        userId = "ADM-001";
      } else if (email.includes("manager")) {
        userRole = "manager";
        userId = "MGR-001";
      } else {
        userId = generateUserId("employee");
      }

      const mockResponse = {
        success: true,
        message: "Login successful",
        token: "mock-jwt-token-12345",
        user: {
          id: "1",
          userId: userId,
          name: email.includes("admin")
            ? "Admin User"
            : email.includes("manager")
            ? "Manager User"
            : "Employee User",
          email: email,
          role: userRole,
          profileCompleted: email.includes("completed") ? true : false,
          department: "IT",
          avatar: null,
          createdAt: new Date().toISOString(),
          emailVerified: true,
        },
      };

      if (!mockResponse.success) {
        return {
          success: false,
          message: mockResponse.message || "Invalid credentials",
        };
      }

      const userData = {
        ...mockResponse.user,
        token: mockResponse.token,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", mockResponse.token);

      let redirectTo = determineRedirectPath(userData);

      return {
        success: true,
        message: mockResponse.message,
        redirectTo,
        user: userData,
      };
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Server error. Please try again.";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const determineRedirectPath = (userData) => {
    if (!userData) return "/login";

    switch (userData.role) {
      case "admin":
        return "/admin/dashboard";
      case "manager":
        return "/manager/dashboard";
      case "employee":
      case "user":
        return userData.profileCompleted
          ? "/employee/dashboard"
          : "/profile/setup";
      default:
        return "/dashboard";
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const userId = generateUserId(userData.role);

      const mockResponse = {
        success: true,
        message: "Registration successful. Please verify your email with OTP.",
        user: {
          userId: userId,
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          requiresVerification: true,
          role: userData.role,
        },
        otpSent: true,
      };

      if (mockResponse.success) {
        localStorage.setItem(
          "pendingRegistration",
          JSON.stringify({
            userId: userId,
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            role: userData.role,
            password: userData.password,
            expires: Date.now() + 30 * 60 * 1000,
          })
        );

        return {
          success: true,
          message: mockResponse.message,
          user: mockResponse.user,
          otpSent: true,
        };
      } else {
        return {
          success: false,
          message: mockResponse.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage =
              "Invalid registration data. Please check your information.";
            break;
          case 409:
            errorMessage =
              "Email already registered. Please use a different email or login.";
            break;
          case 422:
            errorMessage =
              "Validation failed. Please check all required fields.";
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage =
          "Unable to connect to server. Please check your internet connection.";
      }

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);

      const mockResponse = {
        success: true,
        message: "Email verified successfully",
        verified: true,
        token: "verified-jwt-token-67890",
      };

      if (mockResponse.success) {
        const pendingReg = localStorage.getItem("pendingRegistration");
        if (pendingReg) {
          const regData = JSON.parse(pendingReg);

          const userData = {
            id: Date.now().toString(),
            userId: regData.userId,
            name: regData.name,
            email: email,
            role: regData.role || "employee",
            profileCompleted: false,
            department: "IT",
            avatar: null,
            emailVerified: true,
            token: mockResponse.token,
          };

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", mockResponse.token);
          localStorage.removeItem("pendingRegistration");

          return {
            success: true,
            message: "Email verified successfully. Account created.",
            user: userData,
            token: mockResponse.token,
          };
        } else {
          return {
            success: false,
            message: "Registration session expired. Please register again.",
          };
        }
      }

      return {
        success: false,
        message: mockResponse.message || "Invalid OTP",
      };
    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        message: error.message || "OTP verification failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);

      const mockResponse = {
        success: true,
        message: "OTP resent successfully to your email",
      };

      return mockResponse;
    } catch (error) {
      console.error("Resend OTP error:", error);
      return {
        success: false,
        message: error.message || "Failed to resend OTP",
      };
    } finally {
      setLoading(false);
    }
  };

  // 🔥 UPDATED completeProfile FUNCTION
  const completeProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Completing profile with data:", profileData);
      console.log("👤 Current user before update:", user);

      // ✅ Ensure name is properly set from user input
      const userName =
        profileData.name || profileData.fullName || user?.name || "User";

      console.log("✅ User name to save:", userName);

      // Create updated user data
      const updatedUserData = {
        ...user,
        name: userName, // 🔥 THIS IS THE KEY - Save user's entered name
        jobTitle: profileData.jobTitle || user?.jobTitle,
        department: profileData.department || user?.department,
        skills: profileData.skills || user?.skills || [],
        education: profileData.education || user?.education,
        location: profileData.location || user?.location,
        bio: profileData.bio || user?.bio,
        profileCompleted: true, // ✅ Mark as completed
        // Handle avatar if provided
        ...(profileData.avatar && {
          avatar: URL.createObjectURL(profileData.avatar),
        }),
      };

      console.log("✅ Updated user data to save:", updatedUserData);

      // Mock response
      const mockResponse = {
        success: true,
        message: "Profile completed successfully",
        user: updatedUserData,
      };

      if (mockResponse.success) {
        const updatedUser = {
          ...user,
          ...mockResponse.user,
          profileCompleted: true,
        };

        console.log("💾 Saving user to localStorage:", updatedUser);
        console.log("👤 User name after save:", updatedUser.name);

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return {
          success: true,
          message: mockResponse.message,
          user: updatedUser,
        };
      }

      return {
        success: false,
        message: "Profile completion failed",
      };
    } catch (error) {
      console.error("❌ Complete profile error:", error);
      const errorMessage = error.message || "Profile completion failed";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      console.log("🔄 Updating profile with:", profileData);

      // Handle name update separately
      const updatedData = {
        ...user,
        ...profileData,
        // If name is being updated
        ...(profileData.name && { name: profileData.name }),
        ...(profileData.fullName && { name: profileData.fullName }),
      };

      const mockResponse = {
        success: true,
        message: "Profile updated successfully",
        user: updatedData,
      };

      if (mockResponse.success) {
        const updatedUser = { ...user, ...mockResponse.user };
        console.log("✅ Updated user:", updatedUser);

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return {
          success: true,
          message: mockResponse.message,
          user: updatedUser,
        };
      }

      return {
        success: false,
        message: "Update failed",
      };
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: error.message || "Update failed",
      };
    }
  };

  const logout = async () => {
    try {
      // await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setError(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("pendingRegistration");
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        verifyOTP,
        resendOTP,
        logout,
        completeProfile,
        updateProfile,
        clearError,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
