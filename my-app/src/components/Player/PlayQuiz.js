import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../services/api";

const PlayQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null); // Stores results with feedback
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const tournamentId = searchParams.get("id");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching questions for tournament ID:", tournamentId);
        const { data } = await API.get(`/participation/tournament/${tournamentId}/start`);
        console.log("Questions fetched successfully:", data);
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err.response || err.message);
        setError("Error fetching questions. Please try again later.");
      }
    };

    if (tournamentId) {
      fetchQuestions();
    } else {
      setError("Tournament ID is missing. Please try again.");
    }
  }, [tournamentId]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting answers:", userAnswers);

      // Submit the user's answers
      const { data } = await API.post(`/participation/tournament/${tournamentId}/submit`, {
        answers: Object.values(userAnswers), // Convert answers object to an array
      });

      console.log("Quiz submitted successfully:", data);

      // Create results with feedback
      const feedback = questions.map((question) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.correctAnswer;

        return {
          questionText: question.questionText,
          userAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect,
        };
      });

      setResults({
        score: data.score,
        feedback,
      });
    } catch (err) {
      console.error("Error submitting quiz:", err.response || err.message);
      setError("Error submitting quiz. Please try again later.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <h2>Quiz Questions</h2>
      {results ? (
        <div>
          <h3>
            Your Score: {results.score}/{questions.length}
          </h3>
          <ul>
            {results.feedback.map((result, index) => (
              <li key={index}>
                <h3>{result.questionText}</h3>
                <p>
                  Your Answer:{" "}
                  <span style={{ color: result.isCorrect ? "green" : "red" }}>
                    {result.userAnswer || "No answer selected"}
                  </span>
                </p>
                {!result.isCorrect && (
                  <p style={{ color: "blue" }}>
                    Correct Answer: {result.correctAnswer}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <h3>{question.questionText}</h3>
                <ul>
                  {question.choices.map((choice, idx) => (
                    <li key={idx}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={choice}
                          checked={userAnswers[question.id] === choice}
                          onChange={() => handleAnswerChange(question.id, choice)}
                        />
                        {choice}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button type="submit">Submit Quiz</button>
        </form>
      )}
    </div>
  );
};

export default PlayQuiz;
