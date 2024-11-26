import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import LogoutButton from "../Auth/Logout";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Clear session data
    alert("Logged out successfully.");
    navigate("/login"); // Redirect to login
  };
  
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <NavLink to="create" className="nav-link">
            Create Quiz
          </NavLink>
          <NavLink to="manage" className="nav-link">
            Manage Quizzes
          </NavLink>
          <LogoutButton />
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
