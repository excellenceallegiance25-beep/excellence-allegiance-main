// src/pages/auth/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Shield, Users, Building } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Role-based email templates
  const roleEmails = {
    admin: [
      "admin@excellence.com",
      "superadmin@excellence.com",
      "administrator@excellence.com",
      "sysadmin@excellence.com",
    ],
    manager: [
      "manager@excellence.com",
      "project.manager@excellence.com",
      "team.lead@excellence.com",
      "department.head@excellence.com",
    ],
    employee: [
      "employee@excellence.com",
      "john.doe@excellence.com",
      "sarah.smith@excellence.com",
      "mike.johnson@excellence.com",
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success && result.redirectTo) {
        navigate(result.redirectTo);
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowEmailSuggestions(true);
  };

  const handleEmailSelect = (selectedEmail) => {
    setEmail(selectedEmail);
    setShowEmailSuggestions(false);

    // Auto-fill password based on selected email
    if (selectedEmail.includes("@excellence.com")) {
      // You can modify this logic as needed
      // For demo, using a common password
      const passwordField = document.querySelector('input[type="password"]');
      if (passwordField) {
        passwordField.value = "password123";
      }
    }
  };

  const EmailSuggestionsPopup = () => {
    if (!showEmailSuggestions || !selectedRole) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Select{" "}
                  {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}{" "}
                  Email
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Choose from available {selectedRole} email accounts
                </p>
              </div>
              <button
                onClick={() => setShowEmailSuggestions(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Building className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-gray-900">
                  @excellence.com Accounts
                </h3>
              </div>

              <div className="space-y-3">
                {roleEmails[selectedRole]?.map((emailOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmailSelect(emailOption)}
                    className="w-full p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-blue-700">
                          {emailOption}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedRole === "admin" && "Administrator Account"}
                          {selectedRole === "manager" && "Manager Account"}
                          {selectedRole === "employee" && "Employee Account"}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Default Password:</span>{" "}
                    password123
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    All demo accounts use the same password for testing
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                // Custom email input
                const customEmail = prompt(
                  `Enter custom ${selectedRole} email:`
                );
                if (customEmail) {
                  handleEmailSelect(customEmail);
                }
              }}
              className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors"
            >
              + Use Custom Email
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleQuickLogin = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      if (result.success && result.redirectTo) {
        navigate(result.redirectTo);
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Excellence Allegiance
              </h2>
              <p className="mt-1 text-gray-600">Employee Management System</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">IT Solutions & Services</p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md flex items-start">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter company email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  defaultValue="password123"
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in to Excellence Allegiance"
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-gray-500 text-sm font-medium">
                  Quick Company Login
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Admin Button */}
              <button
                onClick={() => handleRoleSelect("admin")}
                className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-red-100 rounded-lg mb-2 group-hover:bg-red-200">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-red-700">
                    Admin
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Administrator Access
                  </span>
                </div>
              </button>

              {/* Manager Button */}
              <button
                onClick={() => handleRoleSelect("manager")}
                className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg mb-2 group-hover:bg-yellow-200">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-yellow-700">
                    Manager
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Team Management
                  </span>
                </div>
              </button>

              {/* Employee Button */}
              <button
                onClick={() => handleRoleSelect("employee")}
                className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mb-2 group-hover:bg-blue-200">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                    Employee
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Staff Access
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 mt-1">
                Click any role to see available company emails
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have a company account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Request Access
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <Building className="w-4 h-4 mr-2" />
            <span>Excellence Allegiance IT Solutions © 2024</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            All rights reserved. Company internal use only.
          </p>
        </div>
      </div>

      {/* Email Suggestions Popup */}
      {showEmailSuggestions && <EmailSuggestionsPopup />}
    </div>
  );
};

export default LoginPage;
