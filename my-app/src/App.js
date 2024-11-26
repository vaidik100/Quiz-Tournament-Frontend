import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CreateQuiz from "./components/Admin/CreateQuiz";
import ManageQuizzes from "./components/Admin/ManageQuizzes";
import UpdateQuiz from "./components/Admin/UpdateQuiz";
import PlayerTournaments from "./components/Player/PlayerTournaments";
import PlayQuiz from "./components/Player/PlayQuiz";
import ParticipationHistory from "./components/Player/ParticipationHistory";
import { isAuthenticated, getUserRole } from "./services/auth";
import Dashboard from "./components/Admin/Dashboard";
import Summary from "./components/Admin/Summary";
import ForgotPassword from "./components/Auth/ForgotPassword";

const App = () => {
  return (
    <Router>
      <nav>
        <h1>Quiz Tournament</h1>
        {isAuthenticated() && getUserRole() === "PLAYER" && window.location.pathname !== "/login" && (
          <div className="player-navigation">
          </div>
        )}
      </nav>
      <div className="container">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Role-Based Routes */}
          <Route
            path="/admin/*"
            element={
              isAuthenticated() && getUserRole() === "ADMIN" ? (
                <AdminRoutes />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/player/*"
            element={
              isAuthenticated() && getUserRole() === "PLAYER" ? (
                <PlayerRoutes />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />}>
      <Route path="create" element={<CreateQuiz />} />
      <Route path="manage" element={<ManageQuizzes />} />
      <Route path="summary" element={<Summary />} />
      <Route path="update" element={<UpdateQuiz />} />
    </Route>
    <Route path="*" element={<Navigate to="/admin/" />} />
  </Routes>
);

const PlayerRoutes = () => (
  <Routes>
    
    <Route path="ongoing" element={<PlayerTournaments />} />
    <Route path="play" element={<PlayQuiz />} />
    <Route path="history" element={<ParticipationHistory />} />
    <Route path="*" element={<Navigate to="/player/ongoing" />} />
  </Routes>
);

export default App;
