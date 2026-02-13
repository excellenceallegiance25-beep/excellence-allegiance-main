import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaHome,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../../assets/image.png";

// Vite-compatible environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [userInputCaptcha, setUserInputCaptcha] = useState("");

  // Check for saved credentials and redirect state
  useEffect(() => {
    // Check for registration success message
    if (location.state?.registrationSuccess) {
      toast.success(
        `Registration successful! Your account is pending admin approval.`,
        { autoClose: 5000 },
      );
      // Clear state
      navigate(location.pathname, { replace: true, state: {} });
    }

    // Check for saved credentials
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    if (savedRemember && savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
        rememberMe: true,
      }));
    }

    // Check for login attempts from localStorage
    const attempts = localStorage.getItem("loginAttempts");
    if (attempts) {
      setLoginAttempts(parseInt(attempts));
      if (parseInt(attempts) >= 3) {
        setShowCaptcha(true);
        generateCaptcha();
      }
    }
  }, [location, navigate]);

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  // Axios instance with interceptors
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });

  // Request interceptor for adding auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor for handling auth errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
        toast.error("Session expired. Please login again.");
      }
      return Promise.reject(error);
    },
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "captcha") {
      setUserInputCaptcha(value);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Enhanced form validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // CAPTCHA validation if required
    if (showCaptcha && userInputCaptcha !== captchaCode) {
      newErrors.captcha = "CAPTCHA code does not match";
    }

    return newErrors;
  };

  // Real API Login Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) => toast.error(error));
      return;
    }

    setLoading(true);

    try {
      // Prepare login data
      const loginData = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        rememberMe: formData.rememberMe,
        ...(showCaptcha && { captcha: userInputCaptcha }),
      };

      // Real API Call
      const response = await api.post("/auth/login", loginData);

      if (response.data.success) {
        const { token, user, requires2FA } = response.data;

        // Reset login attempts on success
        localStorage.removeItem("loginAttempts");
        setLoginAttempts(0);
        setShowCaptcha(false);

        if (requires2FA) {
          // Redirect to 2FA page
          localStorage.setItem("tempToken", token);
          localStorage.setItem("pending2FA", JSON.stringify(user));
          navigate("/verify-2fa");
          return;
        }

        // Store authentication data
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Set auth header for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Remember credentials if checked
        if (formData.rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberMe");
        }

        // Welcome message
        toast.success(`Welcome back, ${user.firstName || user.name}!`, {
          icon: "👋",
        });

        // Handle user status and redirect
        setTimeout(() => {
          if (user.status === "pending") {
            navigate("/pending-approval", {
              state: { email: user.email },
            });
          } else if (user.status === "suspended") {
            navigate("/account-suspended", {
              state: { reason: user.suspensionReason },
            });
          } else if (user.status === "deactivated") {
            navigate("/account-deactivated");
          } else if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else if (user.role === "manager") {
            navigate("/manager/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1500);
      } else {
        handleLoginError(response.data.message || "Login failed");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle login errors
  const handleLoginError = (message) => {
    // Increment login attempts
    const attempts = loginAttempts + 1;
    setLoginAttempts(attempts);
    localStorage.setItem("loginAttempts", attempts.toString());

    if (attempts >= 3) {
      setShowCaptcha(true);
      generateCaptcha();
      toast.warning("Multiple failed attempts. Please verify CAPTCHA.");
    }

    toast.error(message);
  };

  // Handle API errors
  const handleApiError = (error) => {
    console.error("Login Error:", error);

    // Increment login attempts on 401
    if (error.response?.status === 401) {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      localStorage.setItem("loginAttempts", attempts.toString());

      if (attempts >= 3) {
        setShowCaptcha(true);
        generateCaptcha();
      }
    }

    const errorMessages = {
      400: "Invalid request data",
      401: "Invalid email or password",
      403: "Account not verified or suspended",
      423: "Account is locked",
      429: "Too many login attempts",
      500: "Server error",
      503: "Service unavailable",
    };

    const status = error.response?.status;
    const message =
      error.response?.data?.message || errorMessages[status] || "Login failed";

    toast.error(message);
  };

  // Social Login
  const handleSocialLogin = (provider) => {
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  };

  // Forgot Password
  const handleForgotPassword = () => {
    if (!formData.email) {
      toast.error("Please enter your email first");
      return;
    }
    navigate("/forgot-password", { state: { email: formData.email } });
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 font-['Inter',sans-serif] overflow-hidden relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 lg:p-6">
        <button
          onClick={goToHome}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 text-[#1961c0] font-medium hover:scale-105 active:scale-95"
        >
          <FaArrowLeft className="text-sm" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </button>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-32 bg-gradient-to-r from-blue-200/30 to-cyan-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-40 bg-gradient-to-r from-cyan-200/20 to-blue-200/30 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 pt-20 lg:pt-8">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 w-full flex items-center justify-center mb-10 lg:mb-0 px-4">
          <div className="w-full max-w-lg">
            <div className="relative group">
              <div className="absolute -inset-1 bg-white rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <img
                src={loginImage}
                alt="Creative Community"
                className="relative w-full h-full object-cover rounded-2xl transform group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center lg:justify-start lg:pl-16 px-4">
          <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0px_20px_60px_rgba(0,0,0,0.15)] p-8 border border-white/50">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg bg-gradient-to-br from-white to-gray-50">
                <img
                  src="/eapl.png"
                  alt="EAPL Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h1 className="text-[26px] font-bold bg-gradient-to-r from-[#1961c0] to-blue-500 bg-clip-text text-transparent mb-4 leading-tight">
                Welcome To EAPL
              </h1>
              <p className="text-gray-600 text-center text-sm mb-6 leading-relaxed">
                A community of over hundreds of members
                <br />
                To share arts and ideas
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaEnvelope size={18} />
                </div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full h-12 pl-12 pr-4 border-2 ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#1961c0] focus:ring-2 focus:ring-blue-200"} rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm`}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 ml-4 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaLock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full h-12 pl-12 pr-12 border-2 ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#1961c0] focus:ring-2 focus:ring-blue-200"} rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 ml-4 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* CAPTCHA if required */}
              {showCaptcha && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Security Verification
                  </label>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 bg-white p-3 rounded-lg text-center border">
                      <div className="text-2xl font-bold tracking-widest text-gray-800 select-none">
                        {captchaCode}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 hover:text-blue-800 transition"
                      disabled={loading}
                    >
                      ↻
                    </button>
                  </div>
                  <input
                    type="text"
                    name="captcha"
                    value={userInputCaptcha}
                    onChange={handleChange}
                    placeholder="Enter the code above"
                    className="w-full h-12 px-4 border-2 border-gray-300 rounded-full focus:outline-none focus:border-[#1961c0] focus:ring-2 focus:ring-blue-200 transition-all text-gray-700"
                    disabled={loading}
                  />
                  {errors.captcha && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {errors.captcha}
                    </p>
                  )}
                </div>
              )}

              {/* Remember & Forgot */}
              <div className="flex justify-between items-center text-[13px]">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`relative w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${formData.rememberMe ? "bg-[#1961c0] border-[#1961c0]" : "border-gray-300 group-hover:border-gray-400"}`}
                  >
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="absolute opacity-0 cursor-pointer w-full h-full"
                      disabled={loading}
                    />
                    {formData.rememberMe && (
                      <FaCheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[#1961c0] hover:text-blue-700 hover:underline transition-colors font-medium"
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[50px] bg-gradient-to-r from-[#386fb8] to-blue-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Social Login Options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/90 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  disabled={loading}
                  className="w-full h-12 px-4 bg-white border-2 border-gray-300 rounded-full hover:border-gray-400 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-medium text-sm">
                    Google
                  </span>
                </button>

                <button
                  onClick={() => handleSocialLogin("github")}
                  disabled={loading}
                  className="w-full h-12 px-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-sm">GitHub</span>
                </button>
              </div>
            </div>

            {/* Sign up link */}
            <div className="mt-10 text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#051825] font-semibold hover:text-blue-700 hover:underline transition-colors"
                >
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
