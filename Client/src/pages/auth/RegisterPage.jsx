// SimpleRegistrationSystem.jsx (Fixed India Phone Issue)
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SimpleRegistrationSystem = () => {
  const navigate = useNavigate();
  const [registrationType, setRegistrationType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [userCredentials, setUserCredentials] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("bd"); // Default Bangladesh
  const [showOtpSuccessAlert, setShowOtpSuccessAlert] = useState(false);
  const [phoneInputValue, setPhoneInputValue] = useState(""); // ✅ NEW: Separate state for phone input

  // OTP input refs
  const otpRefs = useRef([]);

  // Common form data
  const [formData, setFormData] = useState({
    fullName: "",
    personalEmail: "",
    phone: "",
    countryCode: "+880", // Default Bangladesh code
    dateOfBirth: "",
    address: "",
    department: "",
    designation: "",
    emergencyContact: "",
    gender: "Male",
    bloodGroup: "",
  });

  // OTP data
  const [otpData, setOtpData] = useState({
    code: "",
    expiry: 0,
    phone: "",
  });

  // Registration counters
  const [registrationCounters, setRegistrationCounters] = useState({
    admin: 1,
    employee: 1,
    manager: 1,
  });

  // Define only 5 countries
  const allowedCountries = ["bd", "in", "us", "gb", "au"]; // Bangladesh, India, USA, UK, Australia

  // Country details mapping
  const countryDetails = {
    bd: {
      name: "Bangladesh",
      code: "+880",
      flag: "🇧🇩",
      format: ".... ......",
      example: "+880 1712 345678",
      validation: /^\+8801[3-9]\d{8}$/, // ✅ UPDATED
      length: 13, // +880 + 10 digits
    },
    in: {
      name: "India",
      code: "+91",
      flag: "🇮🇳",
      format: "..... .....",
      example: "+91 98765 43210",
      validation: /^\+91[6789]\d{9}$/, // ✅ FIXED: India numbers start with 6,7,8,9
      length: 13, // +91 + 10 digits
    },
    us: {
      name: "USA",
      code: "+1",
      flag: "🇺🇸",
      format: "(...) ...-....",
      example: "+1 (123) 456-7890",
      validation: /^\+1\d{10}$/,
      length: 12, // +1 + 10 digits
    },
    gb: {
      name: "UK",
      code: "+44",
      flag: "🇬🇧",
      format: ".... ......",
      example: "+44 7911 123456",
      validation: /^\+44\d{10}$/,
      length: 13, // +44 + 10 digits
    },
    au: {
      name: "Australia",
      code: "+61",
      flag: "🇦🇺",
      format: "... ... ...",
      example: "+61 412 345 678",
      validation: /^\+61\d{9}$/,
      length: 12, // +61 + 9 digits
    },
  };

  // Initialize OTP refs
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  // OTP Timer Effect
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // ✅ SIMPLIFIED Phone validation function
  const isValidPhoneNumber = (phone) => {
    if (!phone) return false;

    // Remove all non-digits except +
    const cleanPhone = phone.replace(/[^\d+]/g, "");

    // Check if starts with +
    if (!cleanPhone.startsWith("+")) {
      return false;
    }

    // Get country code
    let countryCode = "";
    let phoneNumber = "";

    if (cleanPhone.startsWith("+880")) {
      countryCode = "+880";
      phoneNumber = cleanPhone.substring(4);
    } else if (cleanPhone.startsWith("+91")) {
      countryCode = "+91";
      phoneNumber = cleanPhone.substring(3);
    } else if (cleanPhone.startsWith("+1")) {
      countryCode = "+1";
      phoneNumber = cleanPhone.substring(2);
    } else if (cleanPhone.startsWith("+44")) {
      countryCode = "+44";
      phoneNumber = cleanPhone.substring(3);
    } else if (cleanPhone.startsWith("+61")) {
      countryCode = "+61";
      phoneNumber = cleanPhone.substring(3);
    } else {
      return false;
    }

    // Check if phone number contains only digits
    if (!/^\d+$/.test(phoneNumber)) {
      return false;
    }

    // Get current country details
    const currentCountry = countryDetails[selectedCountry];

    if (!currentCountry) {
      return false;
    }

    // Check length based on country
    const totalLength = countryCode.length + phoneNumber.length;
    const expectedLength = currentCountry.length;

    if (totalLength !== expectedLength) {
      return false;
    }

    // Country-specific validation
    return currentCountry.validation.test(cleanPhone);
  };

  // ✅ UPDATED: Country-specific phone validation
  const validatePhoneForCountry = (phone, countryCode) => {
    // First basic validation
    if (!isValidPhoneNumber(phone)) {
      return false;
    }

    // Remove all non-digits except +
    const cleanPhone = phone.replace(/[^\d+]/g, "");

    // Country-specific validation using regex from countryDetails
    const country = countryDetails[countryCode];
    if (!country) {
      return false;
    }

    return country.validation.test(cleanPhone);
  };

  // Format phone for display
  const formatPhoneForDisplay = (phone) => {
    if (!phone) return "";

    // Remove all non-digits except +
    let clean = phone.replace(/[^\d+]/g, "");

    // Format based on country code
    if (clean.startsWith("+880")) {
      // Bangladesh: +880 1712 345678
      const match = clean.match(/^(\+\d{3})(\d{4})(\d{6})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
      }
    } else if (clean.startsWith("+91")) {
      // India: +91 98765 43210
      const match = clean.match(/^(\+\d{2})(\d{5})(\d{5})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
      }
    } else if (clean.startsWith("+1")) {
      // USA: +1 (123) 456-7890
      const match = clean.match(/^(\+\d{1})(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
      }
    } else if (clean.startsWith("+44")) {
      // UK: +44 7911 123456
      const match = clean.match(/^(\+\d{2})(\d{4})(\d{6})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
      }
    } else if (clean.startsWith("+61")) {
      // Australia: +61 412 345 678
      const match = clean.match(/^(\+\d{2})(\d{1})(\d{3})(\d{3})(\d{3})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
      }
    }

    return phone;
  };

  // Generate registration ID
  const generateRegistrationId = (type) => {
    const prefix = type.toUpperCase().charAt(0);
    const counter = registrationCounters[type];
    const paddedCounter = counter.toString().padStart(5, "0");
    return `${prefix}${paddedCounter}`;
  };

  // Generate company email
  const generateCompanyEmail = (fullName, registrationType) => {
    const nameParts = fullName.toLowerCase().split(" ");
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";

    const randomId = Math.floor(100 + Math.random() * 900);
    const cleanFirstName = firstName.replace(/[^a-z]/g, "");

    let email = "";
    if (lastName) {
      email = `${cleanFirstName}.${lastName}${randomId}`;
    } else {
      email = `${cleanFirstName}${randomId}`;
    }

    const domain = "company.com";
    return `${email}@${domain}`;
  };

  // Generate strong password
  const generateStrongPassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*_+-=";

    const allChars = uppercase + lowercase + numbers + symbols;
    let password = "";

    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    return password;
  };

  // Generate OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // ✅ SIMPLIFIED: Send OTP to phone
  const sendOTP = async () => {
    // Use the formatted phone from formData
    const phoneToValidate = formData.phone;

    if (!phoneToValidate) {
      setError("Please enter your phone number first");
      return;
    }

    // Debug log
    console.log("Phone to validate:", phoneToValidate);
    console.log("Selected country:", selectedCountry);

    // ✅ UPDATED: Use simplified validation
    if (!validatePhoneForCountry(phoneToValidate, selectedCountry)) {
      const currentCountry = countryDetails[selectedCountry];
      setError(
        `Please enter a valid ${currentCountry.name} phone number\nExample: ${currentCountry.example}\nFormat: ${currentCountry.format}`
      );
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Generate OTP
      const otpCode = generateOTP();
      const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes

      // Store OTP data
      setOtpData({
        code: otpCode,
        expiry: expiryTime,
        phone: phoneToValidate,
      });

      // For testing/demo
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("📱 DEMO: OTP would be sent via Twilio in production");
      console.log("📞 Phone:", formatPhoneForDisplay(phoneToValidate));
      console.log("🔢 DEMO OTP:", otpCode);
      console.log("🇮🇳 Country:", countryDetails[selectedCountry].name);

      setShowOtpVerification(true);
      setOtpTimer(300); // 5 minutes

      // ✅ SHOW SUCCESS ALERT AS POPUP
      setShowOtpSuccessAlert(true);

      // Hide the alert after 5 seconds
      setTimeout(() => {
        setShowOtpSuccessAlert(false);
      }, 5000);

      // Focus first OTP input
      setTimeout(() => {
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus();
        }
      }, 100);
    } catch (err) {
      console.error("OTP sending error:", err);
      setError(
        err.message ||
          "Failed to send OTP. Please check your phone number and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Verify OTP
  const verifyOTP = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    if (Date.now() > otpData.expiry) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    // Format phone for comparison (remove formatting)
    const formattedPhoneForComparison = formData.phone.replace(/[^\d+]/g, "");
    const storedPhoneForComparison = otpData.phone.replace(/[^\d+]/g, "");

    console.log("Comparing phones:");
    console.log("Form:", formattedPhoneForComparison);
    console.log("Stored:", storedPhoneForComparison);

    if (formattedPhoneForComparison !== storedPhoneForComparison) {
      setError("Phone number mismatch. Please request new OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // For demo, accept any 6-digit OTP
      if (otpCode === otpData.code || otpCode === "123456") {
        // ✅ DEMO: Accept 123456 as well
        setPhoneVerified(true);
        setSuccess("Phone number verified successfully!");

        setOtpData({
          code: "",
          expiry: 0,
          phone: "",
        });

        setShowOtpVerification(false);
        setOtp(["", "", "", "", "", ""]);
      } else {
        setError(`Invalid OTP. Demo OTP is: ${otpData.code}`);
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }

      if (!value && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle OTP key down
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle form input
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // ✅ FIXED: Handle phone input with react-phone-input-2
  const handlePhoneChange = (value, country) => {
    // Store the raw value from react-phone-input-2
    setPhoneInputValue(value);

    // Format the phone number properly
    let formattedPhone = value;

    // If it's India, ensure proper formatting
    if (country.countryCode === "in") {
      // Remove any spaces and format
      const cleanValue = value.replace(/\s/g, "");
      if (cleanValue.startsWith("91")) {
        formattedPhone = `+${cleanValue}`;
      } else if (cleanValue.startsWith("+91")) {
        formattedPhone = cleanValue;
      }
    }

    setFormData({
      ...formData,
      phone: formattedPhone,
      countryCode: country.dialCode,
    });
    setSelectedCountry(country.countryCode);
  };

  // Handle emergency contact input
  const handleEmergencyContactChange = (value, country) => {
    setFormData({
      ...formData,
      emergencyContact: value,
    });
  };

  // ✅ UPDATED: Handle registration submission
  const handleRegistrationSubmit = async () => {
    if (!registrationType) {
      setError("Please select registration type");
      return;
    }

    // ✅ UPDATED: Validation
    const requiredFields = [
      "fullName",
      "personalEmail",
      "phone",
      "department",
      "designation",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError("Please fill all required fields (*)");
      return;
    }

    if (!phoneVerified) {
      setError("Please verify your phone number first");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.personalEmail)) {
      setError("Please enter a valid personal email address");
      return;
    }

    // ✅ UPDATED: Phone validation
    if (!validatePhoneForCountry(formData.phone, selectedCountry)) {
      const currentCountry = countryDetails[selectedCountry];
      setError(
        `Please enter a valid ${currentCountry.name} phone number\nExample: ${currentCountry.example}`
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Generate registration ID
      const regId = generateRegistrationId(registrationType);

      // Generate company email
      const companyEmail = generateCompanyEmail(
        formData.fullName,
        registrationType
      );
      setGeneratedEmail(companyEmail);

      // Generate strong password
      const password = generateStrongPassword();
      setGeneratedPassword(password);

      // Prepare user data
      const userData = {
        registrationId: regId,
        registrationType: registrationType,
        companyEmail: companyEmail,
        password: password,
        ...formData,
        registrationDate: new Date().toISOString(),
        status: "active",
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update counter
      setRegistrationCounters((prev) => ({
        ...prev,
        [registrationType]: prev[registrationType] + 1,
      }));

      // Store credentials for popup
      setUserCredentials({
        regId,
        companyEmail,
        password,
        name: formData.fullName,
        phone: formatPhoneForDisplay(formData.phone),
        personalEmail: formData.personalEmail,
        department: formData.department,
        designation: formData.designation,
        country: countryDetails[selectedCountry].name,
        countryFlag: countryDetails[selectedCountry].flag,
      });

      // Show thank you popup
      setShowThankYouPopup(true);
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: "",
      personalEmail: "",
      phone: "",
      countryCode: "+880",
      dateOfBirth: "",
      address: "",
      department: "",
      designation: "",
      emergencyContact: "",
      gender: "Male",
      bloodGroup: "",
    });
    setPhoneInputValue("");
    setOtp(["", "", "", "", "", ""]);
    setShowOtpVerification(false);
    setPhoneVerified(false);
    setGeneratedEmail("");
    setGeneratedPassword("");
    setRegistrationType("");
    setOtpData({
      code: "",
      expiry: 0,
      phone: "",
    });
    setShowThankYouPopup(false);
    setUserCredentials(null);
    setSuccess("");
    setError("");
    setSelectedCountry("bd");
    setShowOtpSuccessAlert(false);
  };

  // ✅ NEW: OTP Success Alert Popup Component
  const OtpSuccessAlert = () => (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg max-w-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-semibold text-green-800">
              OTP Sent Successfully!
            </h3>
            <div className="mt-1 text-sm text-green-700">
              <p>OTP has been sent to:</p>
              <p className="font-bold mt-1">
                {formatPhoneForDisplay(formData.phone)}
              </p>
              <p className="text-xs text-green-600 mt-2">
                <span className="font-medium">Demo OTP:</span> {otpData.code}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowOtpSuccessAlert(false)}
            className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
          >
            <svg
              className="w-5 h-5"
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
    </div>
  );

  // Thank You Popup Component
  const ThankYouPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-green-200">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering with our company
          </p>

          {userCredentials && (
            <div className="bg-white rounded-xl p-6 mb-6 border-2 border-green-200 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Your Account Credentials
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">
                    Registration ID
                  </label>
                  <div className="font-mono font-bold text-blue-700 text-lg bg-blue-50 p-2 rounded">
                    {userCredentials.regId}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Company Email</label>
                  <div className="font-mono text-blue-700 bg-blue-50 p-2 rounded">
                    {userCredentials.companyEmail}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Password</label>
                  <div className="font-mono text-red-600 font-bold bg-red-50 p-2 rounded">
                    {userCredentials.password}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <div className="font-medium">{userCredentials.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Country</label>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {userCredentials.countryFlag}
                      </span>
                      <span>{userCredentials.country}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm text-gray-500">Phone</label>
                    <div className="font-medium">{userCredentials.phone}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-2">⚠️</span>
                  <div>
                    <p className="text-sm text-yellow-800 font-semibold">
                      Important Notice
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      • Save these credentials securely
                      <br />
                      • You will need them to login
                      <br />• Credentials sent to your phone via SMS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-5 rounded-lg mb-6 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Check SMS on your phone for credentials</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Login to company portal with above credentials</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Complete your profile setup after login</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Contact HR for any assistance</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowThankYouPopup(false);
                resetForm();
              }}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Register Another
            </button>
            <button
              onClick={() => {
                setShowThankYouPopup(false);
                navigate("/login");
              }}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
            >
              Go to Login
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Auto redirect to login in <span className="font-bold">10</span>{" "}
            seconds
          </p>
        </div>
      </div>
    </div>
  );

  // OTP Verification Component
  const OtpVerification = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">📱</div>
          <h2 className="text-2xl font-bold text-gray-800">
            Phone Verification
          </h2>
          <p className="text-gray-600 mt-2">Enter 6-digit OTP sent to</p>
          <p className="text-blue-600 font-semibold text-lg mt-1">
            {formatPhoneForDisplay(formData.phone)}
          </p>
          <div className="flex items-center justify-center mt-2">
            <span className="mr-2">
              {countryDetails[selectedCountry]?.flag}
            </span>
            <span className="text-sm text-gray-600">
              {countryDetails[selectedCountry]?.name}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (otpRefs.current[index] = el)}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              maxLength="1"
              className="w-14 h-14 text-3xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => {
              setShowOtpVerification(false);
              setOtp(["", "", "", "", "", ""]);
            }}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={verifyOTP}
            disabled={loading || otp.join("").length !== 6}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>

        {otpTimer > 0 ? (
          <div className="text-center">
            <p className="text-gray-500">
              Resend OTP in{" "}
              <span className="font-bold">
                {Math.floor(otpTimer / 60)}:
                {String(otpTimer % 60).padStart(2, "0")}
              </span>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={sendOTP}
              disabled={loading}
              className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
            >
              Resend OTP
            </button>
          </div>
        )}

        <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Didn't receive OTP? Check your SMS messages
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            Demo OTP: <span className="font-bold">{otpData.code}</span>
          </p>
        </div>
      </div>
    </div>
  );

  // Registration Type Selection Component
  const RegistrationTypeSelection = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Select Your Role
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            type: "admin",
            icon: "👑",
            color: "blue",
            desc: "Full system access and control privileges",
          },
          {
            type: "employee",
            icon: "👤",
            color: "green",
            desc: "Standard user access for daily operations",
          },
          {
            type: "manager",
            icon: "👔",
            color: "purple",
            desc: "Team management and reporting access",
          },
        ].map(({ type, icon, color, desc }) => (
          <button
            key={type}
            onClick={() => setRegistrationType(type)}
            className={`p-6 border-2 rounded-2xl hover:border-${color}-500 hover:bg-${color}-50 transition-all duration-300 text-center border-gray-200 hover:shadow-lg`}
          >
            <div
              className={`text-5xl mb-4 bg-${color}-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto`}
            >
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{desc}</p>
            <div
              className={`text-sm font-medium text-${color}-600 bg-${color}-50 px-3 py-1 rounded-full inline-block`}
            >
              ID: {generateRegistrationId(type)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Country Selection Guide
  const CountryGuide = () => (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-800 mb-3">Supported Countries</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {allowedCountries.map((countryCode) => (
          <div
            key={countryCode}
            className={`p-3 rounded-lg border ${
              selectedCountry === countryCode
                ? "bg-white border-blue-400 shadow-sm"
                : "bg-blue-100 border-blue-200"
            }`}
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">
                {countryDetails[countryCode].flag}
              </span>
              <div>
                <p className="font-medium text-gray-800">
                  {countryDetails[countryCode].name}
                </p>
                <p className="text-sm text-gray-600">
                  {countryDetails[countryCode].code}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {countryDetails[countryCode].example}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <span className="text-3xl">🏢</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Company Registration Portal
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Register as Admin, Employee, or Manager with secure phone
            verification
          </p>
        </div>

        {/* Registration Type Selection */}
        {!registrationType ? (
          <RegistrationTypeSelection />
        ) : (
          /* Registration Form */
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            {/* Header with Registration Type */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg bg-${
                      registrationType === "admin"
                        ? "blue"
                        : registrationType === "employee"
                        ? "green"
                        : "purple"
                    }-100`}
                  >
                    <span className="text-2xl">
                      {registrationType === "admin"
                        ? "👑"
                        : registrationType === "employee"
                        ? "👤"
                        : "👔"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {registrationType.charAt(0).toUpperCase() +
                        registrationType.slice(1)}{" "}
                      Registration
                    </h2>
                    <p className="text-gray-600">
                      Registration ID:{" "}
                      <span className="font-semibold text-blue-600">
                        {generateRegistrationId(registrationType)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors self-start md:self-center"
              >
                ← Change Role
              </button>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-500 mr-3 text-xl">⚠️</span>
                  <p className="text-red-700 font-medium whitespace-pre-line">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <p className="text-green-700 font-medium">{success}</p>
                </div>
              </div>
            )}

            {/* Country Guide */}
            <CountryGuide />

            {/* Form Sections */}
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2">
                    1
                  </span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Email *
                    </label>
                    <input
                      type="email"
                      value={formData.personalEmail}
                      onChange={(e) =>
                        handleInputChange("personalEmail", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section - ONLY 5 COUNTRIES */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2">
                    2
                  </span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                      {phoneVerified && (
                        <span className="ml-2 inline-flex items-center text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      )}
                    </label>
                    <div className="flex flex-col gap-2">
                      <div className="relative">
                        <PhoneInput
                          country={"bd"} // Default Bangladesh
                          value={phoneInputValue} // ✅ Use separate state
                          onChange={handlePhoneChange}
                          inputProps={{
                            required: true,
                            disabled: phoneVerified,
                            className: `w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                              phoneVerified ? "bg-gray-100" : ""
                            }`,
                          }}
                          containerClass="w-full"
                          inputClass="w-full"
                          buttonClass="border-r border-gray-300"
                          dropdownClass="z-50"
                          placeholder={countryDetails[selectedCountry]?.example}
                          enableSearch={true}
                          searchPlaceholder="Search country..."
                          countryCodeEditable={false}
                          onlyCountries={allowedCountries} // ONLY 5 COUNTRIES
                          preferredCountries={allowedCountries}
                          masks={{
                            bd: ".... ......",
                            in: "..... .....", // ✅ FIXED: India format
                            us: "(...) ...-....",
                            gb: ".... ......",
                            au: "... ... ...",
                          }}
                          localization={{
                            bd: "Bangladesh",
                            in: "India",
                            us: "United States",
                            gb: "United Kingdom",
                            au: "Australia",
                          }}
                          specialLabel=""
                        />
                      </div>

                      {!phoneVerified && (
                        <button
                          onClick={sendOTP}
                          disabled={loading || !formData.phone}
                          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                              Sending OTP...
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                              </svg>
                              Send OTP to{" "}
                              {countryDetails[selectedCountry]?.flag}
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Selected Country:{" "}
                        {countryDetails[selectedCountry]?.flag}{" "}
                        {countryDetails[selectedCountry]?.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Format: {countryDetails[selectedCountry]?.example}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Enter phone number without spaces. India: +91 98765
                        43210
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <PhoneInput
                      country={"bd"} // Default Bangladesh
                      value={formData.emergencyContact}
                      onChange={handleEmergencyContactChange}
                      inputProps={{
                        className:
                          "w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
                      }}
                      containerClass="w-full"
                      inputClass="w-full"
                      buttonClass="border-r border-gray-300"
                      dropdownClass="z-50"
                      placeholder="Emergency contact number"
                      enableSearch={true}
                      searchPlaceholder="Search country..."
                      onlyCountries={allowedCountries} // ONLY 5 COUNTRIES
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Optional emergency contact number (Same 5 countries
                      available)
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2">
                    3
                  </span>
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT Department</option>
                      <option value="HR">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Management">Management</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Research & Development">
                        Research & Development
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation *
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) =>
                        handleInputChange("designation", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter your designation"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2">
                    4
                  </span>
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) =>
                        handleInputChange("bloodGroup", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2">
                    5
                  </span>
                  Address
                </h3>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter your complete address (Street, City, State, Country, Postal Code)"
                />
              </div>
            </div>

            {/* Account Information Preview */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Information Preview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Registration ID</p>
                    <p className="font-mono font-bold text-blue-700 text-lg">
                      {generateRegistrationId(registrationType)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company Email</p>
                    <p className="font-mono text-blue-700">
                      {formData.fullName
                        ? generateCompanyEmail(
                            formData.fullName,
                            registrationType
                          )
                        : "Will be generated after registration"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Phone Status</p>
                    <div className="flex items-center">
                      {phoneVerified ? (
                        <span className="inline-flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified ({countryDetails[selectedCountry]?.flag})
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Not Verified ({countryDetails[selectedCountry]?.flag})
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Note:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Company email will be automatically created</li>
                      <li>• Strong password will be generated</li>
                      <li>• Credentials will be sent via SMS</li>
                      <li>• Login with company email and password</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    All fields marked with * are required
                  </p>
                </div>
                <button
                  onClick={handleRegistrationSubmit}
                  disabled={loading || !phoneVerified}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                      Processing Registration...
                    </>
                  ) : phoneVerified ? (
                    "Complete Registration"
                  ) : (
                    "Verify Phone to Continue"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* OTP Success Alert Popup */}
      {showOtpSuccessAlert && <OtpSuccessAlert />}

      {/* OTP Verification Modal */}
      {showOtpVerification && <OtpVerification />}

      {/* Thank You Popup */}
      {showThankYouPopup && <ThankYouPopup />}

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        <p className="mt-1">
          Support available in 5 countries | Contact: support@company.com
        </p>
      </div>
    </div>
  );
};

export default SimpleRegistrationSystem;
