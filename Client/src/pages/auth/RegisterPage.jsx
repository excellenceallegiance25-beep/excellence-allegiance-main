import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaPhone, 
  FaBriefcase, FaCalendarAlt, FaArrowLeft, FaCheck,
  FaShieldAlt, FaUsers, FaPaperPlane
} from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../../assets/image.png";

// Vite-এ এভাবেই এনভায়রনমেন্ট ভেরিয়েবল ইউজ করতে হয়
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    department: "",
    position: "",
    dateOfBirth: "",
    experience: "",
    skills: "",
    role: "employee",
    rememberMe: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    register: false,
    resendOtp: false
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");

  // Axios instance with base config
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // OTP Timer
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 11-digit phone number";
    }
    
    return newErrors;
  };

  // Send OTP - Real API Call
  const sendOtp = async () => {
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      toast.error("Please fix the errors above");
      return;
    }

    setLoading(prev => ({ ...prev, sendOtp: true }));
    try {
      const response = await api.post("/auth/send-otp", {
        email: formData.email,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      if (response.data.success) {
        toast.success("OTP sent successfully! Check your email.");
        setOtpSent(true);
        setOtpTimer(60);
        setCurrentStep(2);
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP Send Error:", error);
      toast.error(
        error.response?.data?.message || 
        "Failed to send OTP. Please try again later."
      );
    } finally {
      setLoading(prev => ({ ...prev, sendOtp: false }));
    }
  };

  // OTP Input Handling
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Verify OTP - Real API Call
  const verifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter all 6 digits");
      toast.error("Please enter all 6 digits of OTP");
      return;
    }

    setLoading(prev => ({ ...prev, verifyOtp: true }));
    try {
      const response = await api.post("/auth/verify-otp", {
        email: formData.email,
        otp: otpString
      });

      if (response.data.success) {
        toast.success("Email verified successfully!");
        setEmailVerified(true);
        setVerificationToken(response.data.token || response.data.verificationToken);
        setCurrentStep(3);
      } else {
        setOtpError(response.data.message || "Invalid OTP");
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP Verify Error:", error);
      setOtpError(error.response?.data?.message || "Verification failed");
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(prev => ({ ...prev, verifyOtp: false }));
    }
  };

  // Resend OTP - Real API Call
  const resendOtp = async () => {
    if (otpTimer > 0) return;
    
    setLoading(prev => ({ ...prev, resendOtp: true }));
    try {
      const response = await api.post("/auth/resend-otp", {
        email: formData.email
      });

      if (response.data.success) {
        toast.success("New OTP sent successfully!");
        setOtpTimer(60);
        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
        document.getElementById("otp-0")?.focus();
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(prev => ({ ...prev, resendOtp: false }));
    }
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase and number";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  // Registration Submit - Real API Call
  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    
    if (!emailVerified) {
      toast.error("Please verify your email first");
      setCurrentStep(2);
      return;
    }

    const step3Errors = validateStep3();
    if (Object.keys(step3Errors).length > 0) {
      setErrors(step3Errors);
      toast.error("Please fix the errors above");
      return;
    }

    setLoading(prev => ({ ...prev, register: true }));
    try {
      const userData = {
        ...formData,
        verificationToken,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        experience: parseInt(formData.experience) || 0
      };

      // Remove confirmPassword from payload
      delete userData.confirmPassword;
      delete userData.rememberMe;

      const response = await api.post("/auth/register", userData);

      if (response.data.success) {
        toast.success(
          "Registration successful! Your account is pending admin approval. " +
          "You will receive an email once approved."
        );
        
        // Store user data temporarily if needed
        localStorage.setItem('pendingRegistration', JSON.stringify({
          email: formData.email,
          timestamp: new Date().toISOString()
        }));
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      
      if (error.response?.status === 409) {
        toast.error("Email already registered. Please login or use different email.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid registration data");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } finally {
      setLoading(prev => ({ ...prev, register: false }));
    }
  };

  // Step Navigation
  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else {
      navigate("/login");
    }
  };

  const departments = [
    "IT & Software",
    "Web Development",
    "Mobile Development",
    "Cloud & DevOps",
    "AI & Machine Learning",
    "Quality Assurance",
    "Project Management",
    "UI/UX Design",
    "Digital Marketing",
    "Sales & Business",
    "Human Resources",
    "Finance & Accounting",
    "Customer Support",
    "Operations",
    "Other",
  ];

  const positions = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "DevOps Engineer",
    "Cloud Architect",
    "Data Scientist",
    "AI Engineer",
    "QA Engineer",
    "Project Manager",
    "UI/UX Designer",
    "Digital Marketer",
    "Business Analyst",
    "Sales Executive",
    "HR Manager",
    "Accountant",
    "Support Specialist",
    "Other",
  ];

  // Focus OTP inputs when step 2 is active
  useEffect(() => {
    if (currentStep === 2) {
      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 100);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 font-['Inter',sans-serif] overflow-hidden relative">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
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

      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-32 bg-gradient-to-r from-blue-200/30 to-cyan-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-40 bg-gradient-to-r from-cyan-200/20 to-blue-200/30 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-r from-sky-200/20 to-blue-200/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
      </div>

      
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 pt-20 lg:pt-8">
       
        <div className="lg:w-1/2 w-full flex items-center justify-center mb-20 lg:mb-0 px-7">
          <div className="w-full max-w-lg">
            <div className="relative group">
             <div className="absolute -inset-1 bg-white rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500"></div>
                           <img
                             src={loginImage}
                             alt="Creative Community"
                             className="relative w-full h-full object-cover rounded-2xl transform group-hover:scale-[1.02]"
                           />
                       
            </div>
            <div className="text-center mt-8">
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center lg:justify-start lg:pl-16 px-4">
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0px_20px_60px_rgba(0,0,0,0.15)] p-8 border border-white/50 transform hover:shadow-[0px_25px_70px_rgba(0,0,0,0.2)] transition-all duration-500">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg bg-gradient-to-br from-white to-gray-50">
                <img
                  src="/eapl.png"
                  alt="EAPL Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>

              <h1 className="text-[26px] font-bold bg-gradient-to-r from-[#2396d8] to-cyan-500 bg-clip-text text-transparent mb-2">
                Register to EAPL
              </h1>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        currentStep === step
                          ? "bg-gradient-to-br from-[#2396d8] to-cyan-500 text-white scale-110"
                          : currentStep > step
                          ? "bg-gradient-to-br from-green-500 to-emerald-400 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {currentStep > step ? <FaCheck className="w-4 h-4" /> : step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-10 h-1 transition-all duration-300 ${
                          currentStep > step 
                            ? "bg-gradient-to-r from-green-500 to-emerald-400" 
                            : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600 text-center text-sm mb-6 font-medium">
                {currentStep === 1 && "Step 1: Personal Information"}
                {currentStep === 2 && "Step 2: Email Verification"}
                {currentStep === 3 && "Step 3: Professional Details"}
              </p>
            </div>

            {/* Form Content */}
            <form onSubmit={currentStep === 3 ? handleRegister : (e) => e.preventDefault()}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaUser size={16} />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name"
                          className={`w-full h-12 pl-12 pr-4 border-2 ${
                            errors.firstName 
                              ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
                              : "border-gray-300 focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20"
                          } rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1 ml-4 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaUser size={16} />
                        </div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name"
                          className={`w-full h-12 pl-12 pr-4 border-2 ${
                            errors.lastName 
                              ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
                              : "border-gray-300 focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20"
                          } rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1 ml-4 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaEnvelope size={16} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@company.com"
                        className={`w-full h-12 pl-12 pr-4 border-2 ${
                          errors.email 
                            ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
                            : "border-gray-300 focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20"
                        } rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 ml-4 flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaPhone size={16} />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="1XXXXXXXX"
                          className={`w-full h-12 pl-12 pr-4 border-2 ${
                            errors.phone 
                              ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
                              : "border-gray-300 focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20"
                          } rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 ml-4 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaCalendarAlt size={16} />
                        </div>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="w-full h-12 pl-12 pr-4 border-2 border-gray-300 rounded-full focus:outline-none focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20 transition-all text-gray-700 bg-white/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={loading.sendOtp}
                    className="w-full h-[50px] bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold rounded-full hover:from-sky-600 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {loading.sendOtp ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending OTP...
                      </div>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send OTP for Email Verification
                      </>
                    )}
                  </button>

                  <div className="text-center pt-4">
                    <p className="text-gray-600 text-sm">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={goToLogin}
                        className="text-[#2396d8] font-semibold hover:text-[#1a7bb9] hover:underline transition-colors"
                      >
                        Login here
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: OTP Verification */}
              {currentStep === 2 && (
                <div className="space-y-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <FaEnvelope className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800">
                    Verify Your Email
                  </h3>
                  
                  <div className="text-gray-600 text-lg">
                    6-digit OTP has been sent to{" "}
                    <span className="font-semibold text-gray-800 bg-gradient-to-r from-[#2396d8] to-cyan-500 bg-clip-text text-transparent">
                      {formData.email}
                    </span>
                  </div>

                  <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !digit && index > 0) {
                            document.getElementById(`otp-${index - 1}`).focus();
                          }
                        }}
                        className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                      />
                    ))}
                  </div>

                  {otpError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                      <p className="text-red-700 font-medium flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {otpError}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={loading.verifyOtp || otp.join("").length !== 6}
                    className="w-full h-[50px] bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {loading.verifyOtp ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Verifying...
                      </div>
                    ) : (
                      "Verify OTP & Continue"
                    )}
                  </button>

                  <div className="text-sm text-gray-500">
                    {otpTimer > 0 ? (
                      <div className="flex items-center justify-center gap-2">
                        <span>Didn't receive OTP?</span>
                        <span className="text-gray-400 font-medium">
                          Resend available in {otpTimer}s
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Didn't receive OTP?</span>
                        <button
                          type="button"
                          onClick={resendOtp}
                          disabled={loading.resendOtp}
                          className="text-[#2396d8] hover:text-[#1a7bb9] font-semibold ml-1 disabled:opacity-50 hover:underline"
                        >
                          {loading.resendOtp ? (
                            <span className="flex items-center">
                              <div className="w-3 h-3 border-2 border-[#2396d8] border-t-transparent rounded-full animate-spin mr-1"></div>
                              Sending...
                            </span>
                          ) : "Resend OTP"}
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center gap-1 hover:gap-2 transition-all"
                  >
                    <FaArrowLeft className="w-3 h-3" />
                    Back to edit email
                  </button>
                </div>
              )}

              {/* Step 3: Professional Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Email Verification Status */}
                  {emailVerified && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-4 shadow-sm">
                      <div className="flex items-center gap-3 text-green-700">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <FaCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold">Email Verified</span>
                          <span className="text-sm ml-2 text-green-600">({formData.email})</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Select Your Role *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          formData.role === "employee"
                            ? "border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-md scale-[1.02]"
                            : "border-gray-300 hover:border-gray-400 bg-white"
                        }`}
                        onClick={() => setFormData({ ...formData, role: "employee" })}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow">
                            <FaUsers className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">Employee</h4>
                            <div className="text-sm text-gray-600">
                              Regular team member with standard access
                            </div>
                          </div>
                          {formData.role === "employee" && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <FaCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          formData.role === "manager"
                            ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-md scale-[1.02]"
                            : "border-gray-300 hover:border-gray-400 bg-white"
                        }`}
                        onClick={() => setFormData({ ...formData, role: "manager" })}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow">
                            <FaShieldAlt className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">Manager</h4>
                            <div className="text-sm text-gray-600">
                              Team lead with management privileges
                            </div>
                            <div className="text-xs text-amber-600 mt-1 font-medium">
                              Requires admin approval
                            </div>
                          </div>
                          {formData.role === "manager" && (
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                              <FaCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Department *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaBriefcase size={16} />
                        </div>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className={`w-full h-12 pl-12 pr-4 border-2 ${
                            errors.department 
                              ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
                              : "border-gray-300 focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20"
                          } rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer`}
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1 ml-4 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {errors.department}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Position *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaBriefcase size={16} />
                        </div>
                        <select
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className={`w-full h-12 pl-12 pr-4 border-2 ${
                            errors.position 
                              ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
                              : "border-gray-300 focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20"
                          } rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer`}
                          required
                        >
                          <option value="">Select Position</option>
                          {positions.map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      {errors.position && (
                        <p className="text-red-500 text-sm mt-1 ml-4 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {errors.position}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                        max="50"
                        className="w-full h-12 px-4 border-2 border-gray-300 rounded-full focus:outline-none focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20 transition-all text-gray-700 bg-white/50 backdrop-blur-sm"
                        placeholder="2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Skills (comma separated)
                      </label>
                      <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20 transition-all text-gray-700 bg-white/50 backdrop-blur-sm resize-none"
                        placeholder="React, Node.js, MongoDB..."
                        rows="3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaLock size={16} />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password (min 8 characters)"
                          className={`w-full h-12 pl-12 pr-12 border-2 ${
                            errors.password 
                              ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
                              : "border-gray-300 focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20"
                          } rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <FaEyeSlash size={18} />
                          ) : (
                            <FaEye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1 ml-4 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {errors.password}
                        </p>
                      )}
                      {formData.password && formData.password.length < 8 && (
                        <p className="text-amber-600 text-sm mt-1 ml-4 flex items-center">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                          Password must be at least 8 characters
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaLock size={16} />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          className={`w-full h-12 pl-12 pr-12 border-2 ${
                            errors.confirmPassword 
                              ? "border-red-400 focus:border-red-500 focus:ring-red-200" 
                              : "border-gray-300 focus:border-[#2396d8] focus:ring-2 focus:ring-[#2396d8]/20"
                          } rounded-full focus:outline-none transition-all text-gray-700 bg-white/50 backdrop-blur-sm`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash size={18} />
                          ) : (
                            <FaEye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1 ml-4 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                      <p className="text-red-700 font-medium flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Passwords do not match
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading.register || !emailVerified || formData.password !== formData.confirmPassword}
                    className="w-full h-[50px] bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {loading.register ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting Registration...
                      </div>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>

                  <div className="text-sm text-gray-600 text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-3 justify-center">
                      <FaShieldAlt className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <span className="font-semibold text-blue-600">Note:</span> Your registration will be reviewed by admin. You will
                        receive an email once approved. This process usually takes
                        24-48 hours.
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center gap-1 hover:gap-2 transition-all"
                    >
                      <FaArrowLeft className="w-3 h-3" />
                      Back to OTP verification
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;