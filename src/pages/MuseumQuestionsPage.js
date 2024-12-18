import React, { useEffect, useState } from "react";
import LikertScale from "../components/LikertScale"; // Import LikertScale
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localStorageUtils";

// Access the API URL from environment variables
const MUSEUM_QUESTIONS =
  process.env.REACT_APP_ARCHETYPES_API_MUSEUM_PERSONALITY_URL;

const traitStatements = {
  "Adventure vs. Familiarity":
    "Are you ready to leap into the unknown or do you find comfort in the familiar? Your journey starts where your comfort zone ends!",
  "Curiosity vs. Knowledge":
    "Are you a seeker of new wonders or a sage sharing your wisdom? Let your thirst for knowledge chart your path!",
  "Social Interaction vs. Solitude":
    "Do you thrive in the buzz of company or find peace in your own thoughts? Discover your ideal environment!",
  "Pragmatism vs. Idealism":
    "Are you grounded in reality or dreaming of possibilities? Let's unveil the balance between your ideals and practical choices!",
  "Leadership vs. Support":
    "Do you naturally take the reins or prefer to be the supportive hand behind the scenes? Step forward to define your role!",
  "Emotion vs. Logic":
    "Are your decisions guided by your heart or your head? Uncover the balance that drives your choices!",
  "Creativity vs. Order":
    "Is your mind a canvas of ideas or a well-organized plan? Explore the spectrum of your creative process!",
  "Empathy vs. Independence":
    "Do you prioritize others' feelings or march to the beat of your own drum? Find the harmony between connection and self-reliance!",
  "Experimentation vs. Tradition":
    "Are you an innovator eager to break the mold or a guardian of time-honored practices? Your unique approach awaits discovery!",
  "Insight vs. Action":
    "Do you ponder deeply before making a move or dive straight into action? Let's navigate your decision-making style!",
};

const MuseumQuestionsTest = ({ isDarkMode }) => {
  const [traitsData, setTraitsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // State to store answers
  const [totalScore, setTotalScore] = useState(0); // Store total score
  const [matchedArchetype, setMatchedArchetype] = useState(null); // Store matched archetype
  const [storedData, setStoredData] = useState([]);

  // Fetch traits data from the backend server using the API URL from the environment variable
  useEffect(() => {
    const fetchTraitsData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(MUSEUM_QUESTIONS);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Log the raw API data to inspect its structure
        console.log("API Data:", data);

        // Ensure data is an array and log an error if it's not
        if (!Array.isArray(data)) {
          throw new Error("API response is invalid, expected an array");
        }

        setTraitsData(data); // Update the state if data is valid
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraitsData();
  }, []);

  // Display loading state
  if (isLoading) {
    return <h1 style={styles.loading}>Loading...</h1>;
  }

  // Display error state
  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  // Handle answer changes
  const handleAnswerChange = (questionName, value) => {
    setAnswers({ ...answers, [questionName]: value });
  };

  // Trigger submission, calculate total score and set default archetype
  const handleSubmit = () => {
    // Calculate total score based on answers
    const total = Object.values(answers).reduce((sum, value) => {
      return sum + (typeof value === "number" ? value : 0);
    }, 0);

    setTotalScore(total); // Set the total score

    const defaultArchetype = {
      name: "Default Archetype",
      color: "black",
      mission: "This is a default archetype.",
    };

    setMatchedArchetype(defaultArchetype); // Set default archetype (replace with actual logic)
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? "#1F2124" : "#DCDCDC",
        color: isDarkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* Render trait data */}
      {Array.isArray(traitsData) && traitsData.length > 0 ? (
        traitsData.map((trait, traitIndex) => {
          const { trait: traitName, description, questions } = trait;

          return (
            <div
              key={traitName}
              style={{
                ...styles.traitContainer,
                backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
              }}
            >
              <h2
                style={{
                  ...styles.traitTitle,
                  backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                {traitName}
              </h2>

              <p
                style={{
                  ...styles.traitCatchy,
                  backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                {traitStatements[traitName]}
              </p>

              <p
                style={{
                  ...styles.traitDescription,
                  backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                {description}
              </p>

              <h4
                style={{
                  ...styles.questionsHeader,
                  backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                Questions:
              </h4>

              {Array.isArray(questions) && questions.length > 0 ? (
                <ul style={styles.questionsList}>
                  {questions.map((question, index) => {
                    const questionName = `question_${traitName}_${index}`;

                    return (
                      <li key={index} style={styles.questionItem}>
                        <div style={styles.likertContainer}>
                          <LikertScale
                            question={question.text}
                            name={questionName}
                            onChange={(value) =>
                              handleAnswerChange(questionName, value)
                            }
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No questions available for this trait.</p>
              )}
            </div>
          );
        })
      ) : (
        <p>No traits data available.</p>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        style={{
          ...styles.submitButton,
          backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
          color: isDarkMode ? "#ffffff" : "#000000",
        }}
      >
        Submit Answers
      </button>

      {/* Render matched archetype */}
      {matchedArchetype && (
        <div
          style={{
            ...styles.resultContainer,
            backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
          }}
        >
          <div>
            <h3>Your Score: {totalScore}</h3> {/* Display total score */}
          </div>
          <h2 style={styles.resultTitle}>Your Matching Archetype:</h2>

          <div style={styles.archetypeDisplay}>
            <div
              style={{
                ...styles.archetypeColorBox,
                backgroundColor: matchedArchetype.color,
              }}
            />
            <p>{matchedArchetype.name}</p>
            <p>{matchedArchetype.mission}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px 20px 20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    color: "#000",
    minHeight: "100vh",
    borderBottom: "1px solid #2E3136",
  },
  loading: {
    fontSize: "28px",
    textAlign: "center",
    marginTop: "20%",
  },
  error: {
    fontSize: "20px",
    color: "red",
    textAlign: "center",
  },
  traitContainer: {
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    border: "1px solid #2E3136",
  },
  traitTitle: {
    fontSize: "26px",
    marginBottom: "10px",
    color: "#333",
    fontWeight: "bold",
  },
  traitCatchy: {
    fontSize: "16px",
    marginBottom: "10px",
    fontStyle: "italic",
    color: "#555",
  },
  traitDescription: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  questionsHeader: {
    fontSize: "20px",
    marginTop: "15px",
    color: "#444",
  },
  questionsList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  questionItem: {
    fontSize: "16px",
    marginRight: "10px",
    borderRadius: "8px",
    padding: "12px",
    transition: "background-color 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  likertContainer: {
    width: "100%",
    marginTop: "10px",
  },
  submitButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    border: "1px solid #2E3136",
  },
  resultContainer: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid #2E3136",
  },
  resultTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  archetypeDisplay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  archetypeColorBox: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
};

export default MuseumQuestionsTest;
