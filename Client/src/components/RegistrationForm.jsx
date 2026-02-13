import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "Information Technology",
    position: "",
    password: "",
    confirmPassword: "",
    requestedRole: "employee",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Timer for OTP resend
  React.useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  const handleFullNameChange = (fullName) => {
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    
    setFormData({
      ...formData,
      firstName,
      lastName,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "fullName") {
      handleFullNameChange(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // 📧 **রিয়েল OTP সেন্ড - ইমেইলে যাবে**
  const handleSendOTP = async () => {
    if (!formData.email) {
      alert("Please enter email first");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setOtpLoading(true);
      setServerMessage("Sending OTP to your email...");

      const response = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        {
          email: formData.email,
          type: "registration"
        }
      );

      if (response.data.success) {
        setOtpSent(true);
        setOtpTimer(60); // 60 seconds timer for resend
        setServerMessage(`✅ OTP sent successfully to ${formData.email}. Valid for 10 minutes.`);
        
        // ছোট নোটিফিকেশন
        alert(`📧 OTP has been sent to ${formData.email}\nPlease check your inbox/spam folder.`);
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      
      let errorMsg = "Failed to send OTP. ";
      if (error.response?.data?.message) {
        errorMsg += error.response.data.message;
      } else {
        errorMsg += "Please try again.";
      }
      
      setServerMessage(`❌ ${errorMsg}`);
      alert(errorMsg);
    } finally {
      setOtpLoading(false);
    }
  };

  // ✅ **OTP ভেরিফাই**
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }

    if (!/^\d+$/.test(otp)) {
      alert("OTP must contain only numbers");
      return;
    }

    try {
      setVerifyLoading(true);
      setServerMessage("Verifying OTP...");

      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: formData.email,
          otp: otp,
          type: "registration"
        }
      );

      if (response.data.success) {
        setOtpVerified(true);
        setServerMessage("✅ Email verified successfully! You can now submit your registration.");
        alert("✅ Email verified successfully!");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      
      let errorMsg = "OTP verification failed. ";
      if (error.response?.data?.message) {
        errorMsg += error.response.data.message;
      } else {
        errorMsg += "Please try again.";
      }
      
      setServerMessage(`❌ ${errorMsg}`);
      alert(errorMsg);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      alert("Please enter your full name");
      return;
    }

    if (!otpVerified) {
      alert("Please verify your email with OTP first");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!formData.phone) {
      alert("Phone number is required");
      return;
    }

    if (!formData.position) {
      alert("Position is required");
      return;
    }

    try {
      setLoading(true);
      setServerMessage("Submitting registration...");

      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        department: formData.department,
        position: formData.position,
        requestedRole: formData.requestedRole,
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        registrationData
      );

      if (response.data.success) {
        setRegistrationComplete(true);
        setServerMessage(response.data.message);
        
        // If first user (super admin)
        if (response.data.data?.isFirstUser) {
          const { token, user } = response.data.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          
          setTimeout(() => {
            if (user.role === "super_admin") {
              navigate("/admin/dashboard");
            }
          }, 3000);
        } else {
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMsg = "Registration failed. ";
      if (error.response?.data?.message) {
        errorMsg += error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMsg += error.response.data.error;
      } else {
        errorMsg += "Please try again.";
      }

      setServerMessage(`❌ ${errorMsg}`);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (registrationComplete) {
    const isFirstUser = serverMessage?.includes("Super Admin") || serverMessage?.includes("super_admin");
    
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isFirstUser ? "🎉 Super Admin Created!" : "✅ Registration Submitted!"}
        </h2>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-6 text-left">
          {isFirstUser ? (
            <>
              <p className="text-blue-800 font-medium mb-3">You are the first user - Super Admin access granted!</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Full system administrator access</li>
                <li>✓ Can approve/reject user registrations</li>
                <li>✓ Manage all employees and settings</li>
              </ul>
            </>
          ) : (
            <>
              <p className="text-gray-800 font-medium mb-3">What happens next?</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Admin will review your application</li>
                <li>• You'll receive an approval email</li>
                <li>• Then you can login to your account</li>
              </ul>
            </>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {isFirstUser 
            ? "Redirecting to admin dashboard in 3 seconds..." 
            : "Redirecting to login page in 5 seconds..."}
        </p>
        
        <button
          onClick={() => navigate(isFirstUser ? "/admin/dashboard" : "/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFirstUser ? "Go to Dashboard Now" : "Go to Login Now"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Employee Registration</h2>
        <p className="text-gray-600">Register for admin approval</p>
      </div>
      
      {/* Registration Note */}
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-6">
        <p className="text-sm text-yellow-800">
          <span className="font-bold">Note:</span> After registration, your account will require 
          <span className="font-semibold"> admin approval</span> before you can login.
        </p>
      </div>

      {/* Server Message */}
      {serverMessage && (
        <div className={`p-4 rounded-lg mb-6 text-sm ${
          serverMessage.includes('❌') ? 'bg-red-50 text-red-800 border-l-4 border-red-500' : 
          serverMessage.includes('✅') ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 
          'bg-blue-50 text-blue-800 border-l-4 border-blue-500'
        }`}>
          {serverMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={`${formData.firstName} ${formData.lastName}`.trim()}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">First and last name</p>
            </div>

            {/* Email with OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={otpVerified}
                  placeholder="you@example.com"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={otpLoading || otpVerified || !formData.email || otpTimer > 0}
                  className={`px-4 py-2 rounded-lg font-medium transition min-w-[100px] ${
                    otpVerified
                      ? "bg-green-100 text-green-700 cursor-default"
                      : otpTimer > 0
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
                  }`}
                >
                  {otpLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : otpVerified ? (
                    "Verified ✓"
                  ) : otpTimer > 0 ? (
                    `Resend in ${otpTimer}s`
                  ) : otpSent ? (
                    "Resend OTP"
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </div>

            {/* OTP Verification */}
            {otpSent && !otpVerified && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                    placeholder="6-digit OTP"
                    maxLength="6"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center text-lg tracking-widest font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={verifyLoading || otp.length !== 6}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 min-w-[100px]"
                  >
                    {verifyLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verify
                      </span>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter the 6-digit code sent to <strong>{formData.email}</strong>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Check your spam folder if you don't see the email
                </p>
              </div>
            )}

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="e.g., 01700000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Employment Information</h3>

          <div className="space-y-4">
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="Information Technology">Information Technology</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Research & Development">Research & Development</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="e.g., Software Engineer, HR Manager"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Requested Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requested Role <span className="text-red-500">*</span>
              </label>
              <select
                name="requestedRole"
                value={formData.requestedRole}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Admin will approve your requested role
              </p>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>

          <div className="space-y-4">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Terms and Submit */}
        <div>
          <div className="flex items-start space-x-3 mb-6">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I confirm that all information provided is correct and I understand that 
              my account requires <span className="font-semibold">admin approval</span> before I can login.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !otpVerified}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit for Admin Approval →"
            )}
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">Already have an account? </span>
            <a
              href="/login"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline text-sm transition"
            >
              Login here
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;