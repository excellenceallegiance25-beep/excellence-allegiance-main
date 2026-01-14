import React, { useState, useEffect } from "react";
import authService from "../../services/authService";

const PasswordField = ({ label, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      type="password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
    />
  </div>
);

const SecurityPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await authService.getSecuritySettings();
        if (res && res.success) {
          setTwoFAEnabled(!!res.data?.has2FA);
        }
      } catch (err) {
        // ignore
      }

      try {
        const s = await authService.getSessions();
        if (s && s.success) setSessions(s.data || []);
      } catch (err) {
        // ignore
      }
    };

    loadSettings();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("Please fill all fields");
    }
    if (newPassword !== confirmPassword) {
      return setError("New password and confirmation do not match");
    }
    if (newPassword.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    setLoading(true);
    try {
      const res = await authService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      if (res && res.success) {
        setMessage(res.message || "Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(res.message || "Failed to change password");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle2FA = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      if (!twoFAEnabled) {
        // initiate enable flow
        const res = await authService.enable2FA();
        if (res && res.success) {
          const { secret, qrCodeUrl, backupCodes } = res.data || {};
          alert(
            "2FA setup started. Backup codes: " + (backupCodes || []).join(", ")
          );
          console.log("2FA QR:", qrCodeUrl);
          const token = window.prompt(
            "Enter the 2FA token from your authenticator to verify:"
          );
          if (!token) {
            setError("2FA setup cancelled");
          } else {
            const verify = await authService.verify2FASetup({ token, secret });
            if (verify && verify.success) {
              setTwoFAEnabled(true);
              setMessage("Two-factor enabled");
            } else {
              setError(verify?.message || "Failed to verify 2FA");
            }
          }
        } else {
          setError(res?.message || "Failed to initiate 2FA");
        }
      } else {
        const pwd = window.prompt("Enter your password to disable 2FA:");
        if (!pwd) return setError("Password required to disable 2FA");
        const res = await authService.disable2FA(pwd);
        if (res && res.success) {
          setTwoFAEnabled(false);
          setMessage("Two-factor disabled");
        } else {
          setError(res?.message || "Failed to disable 2FA");
        }
      }
    } catch (err) {
      setError("Failed to update 2FA");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAllSessions = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await authService.logoutAll();
      if (res && res.success) {
        setMessage(res.message || "Logged out from all devices");
        setSessions([]);
      } else {
        setError(res?.message || "Failed to logout sessions");
      }
    } catch (err) {
      setError("Failed to logout sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    )
      return;
    const pwd = window.prompt(
      "Enter your password to confirm account deletion:"
    );
    if (!pwd) return setError("Password required to delete account");
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await authService.deleteAccount(pwd);
      if (res && res.success) {
        setMessage("Account deleted. Redirecting...");
        setTimeout(() => (window.location.href = "/"), 1200);
      } else {
        setError(res.message || "Failed to delete account");
      }
    } catch (err) {
      setError(err.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId) => {
    if (!confirm("Revoke this session?")) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await authService.revokeSession(sessionId);
      if (res && res.success) {
        setMessage(res.message || "Session revoked");
        const s = await authService.getSessions();
        if (s && s.success) setSessions(s.data || []);
      } else {
        setError(res?.message || "Failed to revoke session");
      }
    } catch (err) {
      setError("Failed to revoke session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Security Settings</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded">
          {message}
        </div>
      )}

      <section className="mb-8 bg-gray-900/60 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword}>
          <PasswordField
            label="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="Current password"
          />
          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="New password"
          />
          <PasswordField
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm new password"
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Change Password"}
            </button>
          </div>
        </form>
      </section>

      <section className="mb-8 bg-gray-900/60 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Two-Factor Authentication (2FA)
        </h2>
        <p className="text-gray-400 mb-4">
          Protect your account by enabling two-factor authentication.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="switch">
              <input
                type="checkbox"
                checked={twoFAEnabled}
                onChange={handleToggle2FA}
              />
              <span className="slider round"></span>
            </label>
            <span className="text-white">
              {twoFAEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </section>

      <section className="mb-8 bg-gray-900/60 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Active Sessions
        </h2>
        <p className="text-gray-400 mb-4">Sign out from other devices.</p>
        <div className="mb-4">
          {sessions.length === 0 ? (
            <div className="text-gray-400">No active sessions found.</div>
          ) : (
            <ul className="space-y-3">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between bg-gray-800/40 p-3 rounded"
                >
                  <div>
                    <div className="text-sm text-white">
                      {s.deviceType || s.browser || "Unknown device"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {s.ipAddress || "Unknown IP"} • {s.location || ""}
                    </div>
                    <div className="text-xs text-gray-400">
                      Last activity: {new Date(s.lastActivity).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!s.isCurrent && (
                      <button
                        onClick={() => handleRevokeSession(s.id)}
                        className="px-3 py-1 bg-red-600 rounded text-sm"
                      >
                        Revoke
                      </button>
                    )}
                    {s.isCurrent && (
                      <span className="text-green-400 text-sm">Current</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoutAllSessions}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Log out other sessions
          </button>
        </div>
      </section>

      <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Danger Zone</h2>
        <p className="text-gray-400 mb-4">
          Permanently delete your account and all related data.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-700 text-white rounded-lg"
        >
          Delete Account
        </button>
      </section>
    </div>
  );
};

export default SecurityPage;
