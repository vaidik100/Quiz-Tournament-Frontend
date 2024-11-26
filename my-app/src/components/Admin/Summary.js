import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Summary = () => {
  const [summary, setSummary] = useState({ quizzes: 0, participants: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await API.get("/tournaments/summary");
        setSummary(data);
      } catch {
        alert("Error fetching summary data.");
      }
    };

    fetchSummary();
  }, []);

  return (
    <div>
      <h2>Admin Summary</h2>
      <div className="summary-card">
        <h3>Total Quizzes</h3>
        <p>{summary.quizzes}</p>
      </div>
      <div className="summary-card">
        <h3>Total Participants</h3>
        <p>{summary.participants}</p>
      </div>
    </div>
  );
};

export default Summary;
