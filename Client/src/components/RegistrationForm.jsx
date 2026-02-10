import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "Information Technology",
    position: "",
    managerEmail: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      alert("Please enter email first");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        {
          email: formData.email,
        }
      );

      if (response.data.success) {
        setOtpSent(true);
        alert("OTP sent to your email");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!otpSent) {
      alert("Please verify your email with OTP first");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          ...formData,
          otp: otp,
        }
      );

      if (response.data.success) {
        setRegistrationComplete(true);
        alert(response.data.message || "Registration submitted for admin approval!");
        
        // Auto redirect after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (registrationComplete) {
    return (
      <div className="registration-complete">
        <div className="success-icon">✓</div>
        <h2>Registration Submitted!</h2>
        <div className="info-box">
          <p><strong>Status:</strong> Pending Admin Approval</p>
          <p><strong>What happens next:</strong></p>
          <ul>
            <li>✓ Your registration is sent to admin for review</li>
            <li>✓ Admin will assign your role (employee/manager)</li>
            <li>✓ You'll receive approval email</li>
            <li>✓ Then you can login</li>
          </ul>
        </div>
        <p>Redirecting to login page in 5 seconds...</p>
        <button onClick={() => navigate("/login")}>
          Go to Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="registration-form">
      <h2>Employee Registration</h2>
      
      <div className="registration-note">
        <p><strong>Note:</strong> After registration, admin approval required before login.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section">
          <h3>Personal Information</h3>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <div className="otp-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={otpSent}
              />
              <button 
                type="button" 
                onClick={handleSendOTP} 
                disabled={loading || otpSent}
                className="otp-btn"
              >
                {loading ? "Sending..." : otpSent ? "OTP Sent ✓" : "Send OTP"}
              </button>
            </div>
          </div>

          {otpSent && (
            <div className="form-group">
              <label>Enter OTP *</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                maxLength="6"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Employment Information */}
        <div className="form-section">
          <h3>Employment Information</h3>

          <div className="form-group">
            <label>Employee ID *</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="Information Technology">Information Technology</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Manager's Email (Optional)</label>
            <input
              type="email"
              name="managerEmail"
              value={formData.managerEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Account Security */}
        <div className="form-section">
          <h3>Account Security</h3>

          <div className="form-group">
            <label>Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <small>Minimum 6 characters</small>
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree that my account requires admin approval before I can login
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Submitting..." : "Submit for Admin Approval →"}
        </button>

        <div className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;