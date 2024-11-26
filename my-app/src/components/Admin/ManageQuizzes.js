import React, { useEffect, useState } from "react";
import API from "../../services/api";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await API.get("/tournaments/ongoing");
        setQuizzes(data);
      } catch {
        setMessage("Error fetching quizzes. Please try again later.");
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await API.delete(`/tournaments/admin/delete/${id}`);
        setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
        alert("Quiz deleted successfully.");
      } catch {
        alert("Error deleting quiz. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Manage Quizzes</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.name}</td>
              <td>{quiz.category}</td>
              <td>{quiz.difficulty}</td>
              <td>{new Date(quiz.startDate).toLocaleString()}</td>
              <td>{new Date(quiz.endDate).toLocaleString()}</td>
              <td>
                <button onClick={() => (window.location.href = `/admin/update?id=${quiz.id}`)}>
                  Update
                </button>
                <button onClick={() => handleDelete(quiz.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuizzes;
