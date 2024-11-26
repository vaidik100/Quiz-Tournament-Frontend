import React, { useState } from "react";
import API from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await API.post("/users/forgot-password", { email });
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) {
      setError("Error requesting password reset. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Request Password Reset</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
