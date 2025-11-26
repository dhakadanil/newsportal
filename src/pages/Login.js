import React, { useState } from "react";
import { Link } from "react-router-dom"; // ← Import Link
import '../global.css/Login.css';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login Successful");
        setUser(data.user);
        setForm({ email: "", password: "" });
      } else {
        setMessage(data.message || "Invalid Credentials");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="bg-anim">
      <div className="glass-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <p style={{ marginTop: "10px", color: "white" }}>
          Forgot your password?{" "}
          <Link to="/forgot-password" style={{ color: "#00ffff" }}>
            Click here
          </Link>
        </p>

        {message && <p className="msg">{message}</p>}

        {user && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ color: "white" }}>Welcome, {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
