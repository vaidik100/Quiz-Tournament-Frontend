import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import LogoutButton from "../Auth/Logout";
const ParticipatedTournaments = () => {
  const [tournaments, setTournaments] = useState([]); // State for participated tournaments
  const [error, setError] = useState(""); // State for error messages
  
  useEffect(() => {
    const fetchParticipatedTournaments = async () => {
      try {
        const { data } = await API.get("/users/participated-tournaments");
        console.log("Fetched participated tournaments:", data);
        setTournaments(data);
      } catch (err) {
        console.error("Error fetching participated tournaments:", err.response || err.message);
        setError("Error fetching participated tournaments. Please try again later.");
      }
    };

    fetchParticipatedTournaments();
  }, []);

  // Handle liking a tournament
  const handleLike = async (tournamentId) => {
    try {
      const { data } = await API.post(`/tournaments/${tournamentId}/like`);
      alert(data); // Show success message

      // Update the likes in the UI
      setTournaments((prevTournaments) =>
        prevTournaments.map((tournament) =>
          tournament.tournamentId === tournamentId
            ? { ...tournament, likes: tournament.likes + 1, likedByUser: true }
            : tournament
        )
      );
    } catch (err) {
      console.error("Error liking tournament:", err.response || err.message);
      alert("Error liking tournament. Please try again.");
    }
  };

  // Handle unliking a tournament
  const handleUnlike = async (tournamentId) => {
    try {
      const { data } = await API.post(`/tournaments/${tournamentId}/unlike`);
      alert(data); // Show success message

      // Update the likes in the UI
      setTournaments((prevTournaments) =>
        prevTournaments.map((tournament) =>
          tournament.tournamentId === tournamentId
            ? { ...tournament, likes: tournament.likes - 1, likedByUser: false }
            : tournament
        )
      );
    } catch (err) {
      console.error("Error unliking tournament:", err.response || err.message);
      alert("Error unliking tournament. Please try again.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (tournaments.length === 0) {
    return <div>You have not participated in any tournaments yet.</div>;
  }

  return (
    
    <div className="container">
      <div className="navigation-links">
        <button>
        <Link to="/player/ongoing">View Ongoing Tournaments</Link>
        </button>
        <LogoutButton />
      </div>
      <h2>Participated Tournaments</h2>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.tournamentId}>
            <h3>{tournament.tournamentName}</h3>
            <p>
              Score: {tournament.score}/{tournament.totalQuestions} <br />
              Likes: {tournament.likes || 0} <br />
              Completed On: {new Date(tournament.completedDate).toLocaleString()}
            </p>
            {tournament.likedByUser ? (
              <button onClick={() => handleUnlike(tournament.tournamentId)}>Unlike</button>
            ) : (
              <button onClick={() => handleLike(tournament.tournamentId)}>Like</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipatedTournaments;
