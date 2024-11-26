import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { Link } from "react-router-dom";
import LogoutButton from "../Auth/Logout";
const PlayerTournaments = () => {
  const [tournaments, setTournaments] = useState([]); // State for tournament data
  const [message, setMessage] = useState(""); // State for error or informational messages
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true); // Start loading
      try {
        const { data } = await API.get("/tournaments/ongoing");
        if (typeof data === "string") {
          setMessage(data); // Display message from backend
        } else {
          setTournaments(data); // Set tournament list
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error); // Log error for debugging
        setMessage("Error fetching tournaments. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTournaments();
  }, []);

  const handlePlayNow = (id) => {
    navigate(`/player/play?id=${id}`); // Navigate to quiz page with tournament ID
  };

  return (
    <div className="container">
      <div className="navigation-links">
        <button>
        <Link to="/player/history">View Participation History</Link>
        </button>
        <LogoutButton />
      </div>
      <h2>Ongoing Tournaments</h2>
      {loading && <p>Loading tournaments...</p>}
      {message && <p>{message}</p>}
      {!loading && !message && tournaments.length === 0 && (
        <p>No tournaments available.</p>
      )}
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            <h3>{tournament.name || "Untitled Tournament"}</h3>
            <p>
              Category: {tournament.category || "N/A"} <br />
              Difficulty: {tournament.difficulty || "N/A"} <br />
              Start:{" "}
              {tournament.startDate
                ? new Date(tournament.startDate).toLocaleString()
                : "Unknown"}{" "}
              <br />
              End:{" "}
              {tournament.endDate
                ? new Date(tournament.endDate).toLocaleString()
                : "Unknown"}
            </p>
            <button onClick={() => handlePlayNow(tournament.id)}>Play Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerTournaments;
