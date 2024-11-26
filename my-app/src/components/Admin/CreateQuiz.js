import React, { useState } from "react";
import API from "../../services/api";

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    creator: "",
    name: "",
    category: "",
    difficulty: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        await API.post("/tournaments/admin/create", formData);
        alert("Quiz Created Successfully! Notification emails have been sent to all registered users.");
        setFormData({
            creator: "",
            name: "",
            category: "",
            difficulty: "",
            startDate: "",
            endDate: "",
        }); // Reset the form
    } catch (err) {
        setError("Error creating quiz. Please check the fields and try again.");
    }
};

  return (
    <div className="container">
      <h2>Create Quiz</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Quiz..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
