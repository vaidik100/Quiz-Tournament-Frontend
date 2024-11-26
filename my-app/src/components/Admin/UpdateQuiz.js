import React, { useEffect, useState } from "react";
import API from "../../services/api";

const UpdateQuiz = () => {
  const [formData, setFormData] = useState({
    creator: "",
    name: "",
    category: "",
    difficulty: "",
    startDate: "",
    endDate: "",
  });

  const [quizId, setQuizId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    setQuizId(id);
    console.log(id);
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/tournaments/${id}`);
        console.log("Fetched quiz data:", data); 
        setFormData({
          creator: data.creator,
          name: data.name,
          category: data.category,
          difficulty: data.difficulty,
          startDate: data.startDate,
          endDate: data.endDate,
        });
      } catch {
        alert("Error fetching quiz details.");
      }
    };

    fetchQuiz();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tournaments/${quizId}`, { ...formData});
      alert("Quiz updated successfully.");
    } catch {
      alert("Error updating quiz. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Update Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Creator"
          value={formData.creator}
          onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Difficulty"
          value={formData.difficulty}
          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="End Date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        />
        <button type="submit">Update Quiz</button>
      </form>
    </div>
  );
};

export default UpdateQuiz;
