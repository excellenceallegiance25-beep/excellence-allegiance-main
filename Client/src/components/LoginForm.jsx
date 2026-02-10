import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(true); // Initial loading true
  const [error, setError] = useState("");

  // Simulate initial page loading
  useEffect(() => {
    // Simulate a small delay for initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 800ms delay for skeleton show

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true on submit

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );

      if (response.data.success) {
        const { token, user } = response.data;
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.status === "pending_approval") {
          setError("Your account is pending admin approval. Please wait for approval email.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setLoading(false);
          return;
        }

        if (user.status === "suspended" || user.status === "inactive") {
          setError("Your account is not active. Please contact admin.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setLoading(false);
          return;
        }

        alert("Login successful!");
        
        if (user.role === "admin" || user.role === "super_admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "manager") {
          navigate("/manager/dashboard");
        } else if (user.role === "employee" || user.role === "user") {
          navigate("/employee/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Login failed";
      setError(errorMsg);
      
      if (errorMsg.includes("pending approval")) {
        setError("Your account is pending admin approval. You will receive an email once approved.");
      }
      setLoading(false);
    }
  };

  // Enhanced Skeleton Loading Component with shimmer
  const SkeletonLoading = () => (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      {/* Title Skeleton with shimmer */}
      <div className="text-center mb-6 relative overflow-hidden">
        <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-72 mx-auto"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" 
             style={{ animation: 'shimmer 1.5s infinite linear' }}></div>
      </div>

      {/* Error Message Area Skeleton */}
      <div className="mb-6">
        <div className="h-0"></div>
      </div>

      {/* Form Skeleton */}
      <div className="space-y-6 relative overflow-hidden">
        {/* Shimmer overlay for entire form */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" 
             style={{ animation: 'shimmer 1.5s infinite linear' }}></div>
        
        {/* Email/Username Field */}
        <div className="relative">
          <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>

        {/* Form Options Skeleton */}
        <div className="flex justify-between items-center relative">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-36"></div>
        </div>

        {/* Login Button Skeleton */}
        <div className="h-12 bg-gray-200 rounded relative"></div>

        {/* Register Link Skeleton */}
        <div className="text-center relative">
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>

        {/* Demo Accounts Skeleton */}
        <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-200 relative">
          <div className="h-5 bg-gray-200 rounded w-32 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>

        {/* Admin Note Skeleton */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 relative">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add shimmer animation to global styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    .skeleton-shimmer {
      position: relative;
      overflow: hidden;
    }
    
    .skeleton-shimmer::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: shimmer 1.5s infinite;
    }
  `;
  document.head.appendChild(style);

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
        <p className="text-gray-600 text-sm">
          Single login for all users (Admin, Manager, Employee)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500 animate-fadeIn">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email/Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email or Username *
          </label>
          <input
            type="text"
            name="identifier"
            value={credentials.identifier}
            onChange={handleChange}
            required
            placeholder="Enter email or username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Form Options */}
        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm">Remember me</span>
          </label>
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : "Login"}
        </button>

        {/* Register Link */}
        <div className="text-center text-gray-600 text-sm">
          Not registered?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
          >
            Create account
          </a>
        </div>

        {/* Demo Accounts */}
        <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-400">
          <h4 className="font-medium text-gray-800 mb-3">Demo Accounts:</h4>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Admin:</span> admin@example.com / admin123
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Manager:</span> manager@example.com / manager123
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Employee:</span> employee@example.com / employee123
            </div>
          </div>
        </div>

        {/* Admin Note */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <span className="font-medium">Note for Admins:</span> Use your admin credentials to login. 
            After login, you'll be redirected to Admin Dashboard.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;