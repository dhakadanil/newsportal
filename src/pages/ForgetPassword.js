import React, { useState } from "react";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // STEP 1 → Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/forgot-send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("OTP Sent to your Email");
        setStep(2);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // STEP 2 → Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("OTP Verified! Now set your new password.");
        setStep(3); // Move to new password step
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // STEP 3 → Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password Reset Successful!");
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setStep(1);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-anim" style={{ minHeight: "100vh" }}>
      <div className="glass-card">
        <h2>Forgot Password</h2>

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={sendOtp}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-primary">
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={verifyOtp}>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter the OTP received"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-primary">
              Verify OTP
            </button>
          </form>
        )}

        {/* STEP 3: New Password */}
        {step === 3 && (
          <form onSubmit={resetPassword}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-primary">
              Reset Password
            </button>
          </form>
        )}

        {message && <p className="msg" style={{ color: "lightgreen" }}>{message}</p>}
        {error && <p className="msg" style={{ color: "#ff6b6b" }}>{error}</p>}
      </div>
    </div>
  );
}

export default ForgetPassword;
