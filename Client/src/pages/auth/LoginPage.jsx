// src/pages/auth/LoginPage.jsx - CORRECTED VERSION
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://192.168.68.109:5000/api";
      const res = await axios.post(`${apiUrl}/auth/login`, { email, password });

      if (res.data.success) {
        login(res.data.user, res.data.token);

        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (res.data.user.role === "manager") {
          navigate("/manager/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);

      // If error is about email verification, show resend option
      if (errorMsg.includes("verify your email")) {
        setError(
          `${errorMsg}. Check your email or click "Resend Verification Email" below.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Add resend verification function
  const resendVerification = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://192.168.68.109:5000/api";
      await axios.post(`${apiUrl}/auth/resend-verification`, { email });
      setError("Verification email sent! Please check your inbox.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend verification");
    }
  };

  // Check if error message is about email verification
  const isVerificationError = error?.includes("verify your email");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            {/* Show resend verification button if it's a verification error */}
            {isVerificationError && email && (
              <button
                onClick={resendVerification}
                className="mt-2 w-full bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600"
              >
                Resend Verification Email
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter email"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Registration Options */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-3">Don't have an account?</p>
          <div className="flex gap-2 justify-center">
            <Link
              to="/register/employee"
              className="text-blue-500 hover:text-blue-700"
            >
              Employee
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/register/manager"
              className="text-green-500 hover:text-green-700"
            >
              Manager
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/register/admin"
              className="text-red-500 hover:text-red-700"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Verify Email Link */}
        <div className="mt-4 text-center">
          <Link
            to="/verify-email"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Need to verify your email?
          </Link>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
