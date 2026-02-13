// src/pages/auth/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("No verification token provided");
        return;
      }

      try {
        const apiUrl =
          import.meta.env.VITE_API_URL || "http://192.168.68.106:5000/api";
        const res = await axios.get(`${apiUrl}/auth/verify-email/${token}`);

        if (res.data.success) {
          setStatus("success");
          setMessage("Email verified successfully! You can now login.");
        }
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {status === "verifying" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Verifying Email
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Email Verified!
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Go to Login
              </button>
              <Link
                to="/"
                className="block text-sm text-blue-500 hover:text-blue-700"
              >
                ← Back to Home
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Verification Failed
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <div className="mt-6 space-y-3">
              <Link
                to="/login"
                className="block w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-center"
              >
                Go to Login
              </Link>
              <Link
                to="/"
                className="block text-sm text-blue-500 hover:text-blue-700"
              >
                ← Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
