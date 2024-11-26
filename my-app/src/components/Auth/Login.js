import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    try {
      const data = await login(formData);
      console.log("Role received:", data.role); // Debug: Log the role

      if (data.role === "ADMIN") {
        navigate("/admin/manage");
      } else if (data.role === "PLAYER") {
        navigate("/player/ongoing");
      } else {
        setError("Invalid role. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      <p>
  Forgot your password? <Link to="/forgot-password">Reset here</Link>
</p>

    </div>
  );
};

export default Login;
