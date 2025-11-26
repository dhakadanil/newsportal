import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← Import useNavigate
import "../global.css/Signup.css";

function Signup() {
  const navigate = useNavigate(); // ← Hook initialize
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/send-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setShowOtpBox(true);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/verify-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setForm({ email: "", password: "" });
        setOtp("");
        setShowOtpBox(false);

        // ← Redirect to login page after successful signup
        navigate("/login");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="bg-anim">
      <div className="glass-card-signup">
        <h2>Signup</h2>

        {!showOtpBox ? (
          <form onSubmit={sendOtp}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
              className="input-field-signup"
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
              required
              className="input-field-signup"
            />
            <button type="submit" className="btn-send-otp">
              Send OTP
            </button>
          </form>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field-signup"
            />
            <button onClick={verifyOtp} className="btn-verify-otp">
              Verify OTP
            </button>
          </>
        )}

        {message && (
          <p
            className="msg-signup"
            style={{ color: message.toLowerCase().includes("success") ? "#00ff7f" : "#ff4b2b" }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
