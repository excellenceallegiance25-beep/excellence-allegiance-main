// client/src/pages/auth/ForgotPasswordPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, ms = 3000) => {
    setToast(message);
    setTimeout(() => setToast(null), ms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setSuccess("Password reset instructions have been sent to your email.");
        showToast("Password reset instructions sent");
        // start 60s cooldown for resend
        setCooldown(60);
        if (cooldownRef.current) clearInterval(cooldownRef.current);
        cooldownRef.current = setInterval(() => {
          setCooldown((s) => {
            if (s <= 1) {
              clearInterval(cooldownRef.current);
              return 0;
            }
            return s - 1;
          });
        }, 1000);
      } else {
        setError(response.message || "Failed to send reset instructions");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return setError("Enter your email to resend.");
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setSuccess("Password reset instructions resent.");
        showToast("Password reset instructions resent");
        setCooldown(60);
        if (cooldownRef.current) clearInterval(cooldownRef.current);
        cooldownRef.current = setInterval(() => {
          setCooldown((s) => {
            if (s <= 1) {
              clearInterval(cooldownRef.current);
              return 0;
            }
            return s - 1;
          });
        }, 1000);
      } else {
        setError(response.message || "Failed to resend");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 pt-16 px-4">
      {/* Glassmorphism Card Container */}
      <div className="w-full max-w-5xl">
        {/* Main Card */}
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

          {/* Card Content */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl mb-6">
                    <svg
                      className="w-12 h-12 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Reset Password
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Enter your email to receive password reset instructions
                  </p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-red-300">{error}</span>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-green-900/30 border border-green-700/50 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-green-300">{success}</span>
                    </div>
                  </div>
                )}

                {/* Form Container */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-purple-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          Email Address *
                        </span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                        required
                        placeholder="john@example.com"
                      />
                      <p className="text-gray-500 text-sm mt-2">
                        We'll send a password reset link to this email address
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
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
                          Sending Instructions...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Send Reset Instructions
                        </span>
                      )}
                    </button>

                    {/* Back to Login */}
                    <div className="text-center pt-4 border-t border-gray-700/50">
                      <div className="mt-3">
                        {cooldown > 0 ? (
                          <div className="text-sm text-gray-400">
                            You can resend in {cooldown}s
                          </div>
                        ) : (
                          <button
                            onClick={handleResend}
                            disabled={loading}
                            className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                          >
                            Resend instructions
                          </button>
                        )}
                      </div>
                      <Link
                        to="/login"
                        className="text-gray-400 hover:text-gray-300 font-medium transition-colors duration-300 inline-flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Back to Login
                      </Link>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Side - Info/Instructions */}
              <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-l border-gray-700/50">
                {/* Top Section */}
                <div>
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold text-white mb-3">
                      Password{" "}
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Reset
                      </span>{" "}
                      Process
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Follow these simple steps to regain access to your account
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Enter Your Email
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Provide the email address associated with your account
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Check Your Inbox
                        </h4>
                        <p className="text-gray-400 text-sm">
                          We'll send you a secure password reset link
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Create New Password
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Follow the link and set a new secure password
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Sign In Again
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Use your new password to access your account
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Security Tips */}
                <div className="mt-8 pt-8 border-t border-gray-700/50">
                  <div className="flex items-start">
                    <div className="p-3 bg-green-500/20 rounded-xl mr-4">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        Security Tips
                      </h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li className="flex items-center">
                          <svg
                            className="w-3 h-3 text-green-400 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Use a strong, unique password
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-3 h-3 text-green-400 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Enable two-factor authentication
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-3 h-3 text-green-400 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Reset your password regularly
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Contact Support
            </a>{" "}
            or read our{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              FAQ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
