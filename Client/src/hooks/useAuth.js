import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        // Verify token with backend
        const isValid = await authService.verifyToken(token);

        if (isValid) {
          setUser(JSON.parse(userData));
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(email, password);

      if (response.success) {
        const { user, token } = response.data;

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);

        // Redirect based on role
        switch (user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "manager":
            navigate("/manager/dashboard");
            break;
          case "employee":
            navigate("/employee/dashboard");
            break;
          default:
            navigate("/");
        }

        return { success: true, user };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
      return { success: false, message: "An error occurred during login" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.register(userData);

      if (response.success) {
        // Auto login after registration
        const loginResponse = await login(userData.email, userData.password);

        if (loginResponse.success) {
          return { success: true, user: loginResponse.user };
        }

        return {
          success: false,
          message: "Registration successful but auto-login failed",
        };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration");
      return {
        success: false,
        message: "An error occurred during registration",
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.updateProfile(profileData);

      if (response.success) {
        // Update local user data
        const updatedUser = { ...user, ...response.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        return { success: true, user: updatedUser };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setError("An error occurred while updating profile");
      return {
        success: false,
        message: "An error occurred while updating profile",
      };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.changePassword(
        currentPassword,
        newPassword
      );

      if (response.success) {
        return { success: true };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Change password error:", error);
      setError("An error occurred while changing password");
      return {
        success: false,
        message: "An error occurred while changing password",
      };
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem("token");
  };

  const hasRole = (role) => {
    return user?.role === role || user?.role === "admin";
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role) || user?.role === "admin";
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    checkAuth,
  };
};
