import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Logged out successfully.");
    navigate("/login");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
