// EnhancedPersonalityTest.jsx

import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { lighten, darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { BounceLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import { QRCodeCanvas } from "qrcode.react";
import LikertScale from "../components/LikertScale"; // Import LikertScale

// Set the app element for accessibility
Modal.setAppElement("#root");

// Access the API URLs from environment variables
const QUESTIONS_API_URL = process.env.REACT_APP_ARCHETYPES_API_BIGFIVE_API_URL;
const QUESTIONS_API_LOCAL = process.env.REACT_APP_BIGFIVE_API_URL;

// Define the traits and archetypes as per your original component
const traits = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Neuroticism",
];

// Define the cache outside the component
const archetypesCache = {};

const EnhancedPersonalityTest = ({ isDarkMode, toggleTheme }) => {
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0);
  const [currentTrait, setCurrentTrait] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [finalScores, setFinalScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [matchedArchetypeName, setMatchedArchetypeName] = useState("");
  const [selectedArchetype, setSelectedArchetype] = useState({});
  const [complementaryArchetype, setComplementaryArchetype] = useState({});
  const [qrCodeData, setQrCodeData] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [isQRCodeGenerating, setIsQRCodeGenerating] = useState(false);
  const [qrButtonLabel, setQrButtonLabel] = useState("Generate QR Key");

  const qrCodeRef = useRef(null);

  // Fetch questions from the backend server using the API URL from the environment variable
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(QUESTIONS_API_URL);
        // const response = await fetch(QUESTIONS_API_LOCAL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const allTraitsData = await response.json();
        const traitData = allTraitsData.find(
          (trait) => trait.trait === traits[currentTraitIndex]
        );
        setCurrentTrait(traitData);
        const shuffledQuestions = shuffleArray([...traitData.questions]);
        setQuestions(shuffledQuestions);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
    setAnsweredQuestions({});
  }, [currentTraitIndex]);

  // Shuffle array utility
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Handle answer changes
  const handleAnswerChange = (event) => {
    setAnswers({ ...answers, [event.target.name]: Number(event.target.value) });

    // Mark the question as answered
    setAnsweredQuestions({ ...answeredQuestions, [event.target.name]: true });
  };

  // This function checks if all questions have been answered
  const allQuestionsAnswered = () => {
    return questions.every(
      (_, index) => answeredQuestions[`question_${currentTraitIndex}_${index}`]
    );
  };

  // Handle next trait
  const handleNextTrait = () => {
    if (allQuestionsAnswered() && currentTraitIndex < traits.length - 1) {
      setCurrentTraitIndex(currentTraitIndex + 1);
    }
  };

  // Handle previous trait
  const handlePrevTrait = () => {
    if (currentTraitIndex === traits.length - 1) {
      setCurrentTraitIndex(0);
      setAnswers({});
      setAnsweredQuestions({});
    } else if (currentTraitIndex > 0) {
      setCurrentTraitIndex(currentTraitIndex - 1);
    }
  };

  // Calculate final scores
  const calculateFinalScores = () => {
    let traitScores = {};
    for (const trait of traits) {
      const traitIndex = traits.indexOf(trait);
      const traitAnswers = Object.entries(answers)
        .filter(([key, _]) => key.startsWith(`question_${traitIndex}_`))
        .map(([_, value]) => value);
      traitScores[trait] =
        traitAnswers.length > 0
          ? (
              traitAnswers.reduce((acc, curr) => acc + curr, 0) /
              traitAnswers.length
            ).toFixed(2)
          : "No Data";
    }
    return traitScores;
  };

  // Handle final submit
  const handleFinalSubmit = async () => {
    setLoading(true);
    setShowModal(true);

    setTimeout(async () => {
      const scores = calculateFinalScores();
      setFinalScores(scores);
      setLoading(false);
    }, 2000);
  };

  // Generate QR Code
  const generateQRCode = async () => {
    setQrButtonLabel("Loading...");
    setIsQRCodeGenerating(true);

    try {
      const userScores = calculateFinalScores();
      const newUuid = uuidv4();
      const newTimestamp = new Date().toISOString();

      setQrCodeData(
        JSON.stringify({
          uuid: newUuid,
          timestamp: newTimestamp,
          scores: userScores,
        })
      );
      setShowQRCode(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setShowQRCode(false);
    } finally {
      setIsQRCodeGenerating(false);
      setQrButtonLabel("Generate QR Key");
    }
  };

  const getQuestionContainerStyle = () => ({
    backgroundColor: isDarkMode ? "#2E3136" : "#f0f0f0", // Change based on theme
    color: isDarkMode ? "#ffffff" : "#000000", // Change text color
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "10px",
    transition: "background-color 0.3s, color 0.3s", // Smooth transition
  });

  // Define inline styles using Polished for dynamic colors
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: isDarkMode ? "#1e2124" : "#ffffff", // Change based on theme
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
      alignItems: "center",
      overflowY: "auto",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
    },
    questionContainer: {
      backgroundColor: isDarkMode ? "#2E3136" : "#f0f0f0", // Change based on theme
      padding: "20px",
      borderRadius: "10px",
      width: "auto",
      maxWidth: "600px",
      marginBottom: "20px",
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      border: "1px solid #2E3136",
    },
    navigationButtons: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "600px",
      marginBottom: "20px",
    },
    navButton: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      backgroundColor: isDarkMode ? "#f0f0f0" : "#2E3136", // Change based on theme
      color: isDarkMode ? "#2E3136" : "#f0f0f0", // Change text color
      transition: "background-color 0.3s",
      minWidth: "100px",
      border: "1px solid #2E3136",
    },
    submitButton: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: allQuestionsAnswered() ? "pointer" : "not-allowed", // Cursor changes if enabled
      backgroundColor: allQuestionsAnswered() ? "#45FE47" : "#282c34", // Black if all answered, green otherwise
      color: allQuestionsAnswered() ? "#282c34" : "#45FE47",
      transition: "background-color 0.3s",
      minWidth: "100px",
      border: "1px solid #2E3136",
    },
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Loading...</h1>
        <BounceLoader color="#45FE47" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.questionContainer}>
        <h2
          style={{
            ...styles.header,
            textAlign: "center",
            marginBottom: "10px",
            textTransform: "uppercase",
            fontSize: "14px",
          }}
        >
          Trait {currentTraitIndex + 1} of {traits.length}
        </h2>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          {currentTrait.trait}
        </h3>
        <p>{currentTrait.description}</p>
      </div>

      {/* Render LikertScale for each question */}
      {questions.map((question, index) => {
        const questionName = `question_${currentTraitIndex}_${index}`;
        return (
          <LikertScale
            key={index}
            question={question.text}
            name={questionName}
            onChange={handleAnswerChange}
          />
        );
      })}
      <div style={styles.navigationButtons}>
        {currentTraitIndex > 0 && (
          <button style={styles.navButton} onClick={handlePrevTrait}>
            Previous Trait
          </button>
        )}

        {currentTraitIndex < traits.length - 1 ? (
          <button
            style={{
              ...styles.navButton,
              ...(allQuestionsAnswered()
                ? {
                    // Normal styling if all questions are answered
                    backgroundColor: isDarkMode ? "#f0f0f0" : "#282c34",
                    color: isDarkMode ? "#282c34" : "#f0f0f0",
                  }
                : {
                    // Styling when not all questions are answered
                    backgroundColor: isDarkMode ? "#555555" : "#cccccc",
                    color: "#ffffff", // Ensure text color is always visible
                    cursor: "not-allowed",
                  }),
            }}
            onClick={handleNextTrait}
            disabled={!allQuestionsAnswered()}
          >
            Next Trait
          </button>
        ) : (
          <button
            style={styles.submitButton}
            onClick={handleFinalSubmit}
            disabled={!allQuestionsAnswered()}
          >
            Submit Answers
          </button>
        )}
      </div>

      {/* Modal for Results */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Results Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            padding: "0",
          },

          content: {
            position: "absolute", // Position relative to the overlay
            top: "50%", // 50% from the top of the overlay
            left: "50%", // 50% from the left of the overlay
            transform: "translate(-50%, -50%)", // Shift the modal back by 50% of its own width and height to center
            backgroundColor: "#2E3136", // Background color
            borderRadius: "12px", // Rounded corners
            padding: "20px", // Inner padding
            width: "50%", // Width relative to the overlay
            maxWidth: "600px", // Maximum width to prevent overflow
            height: "auto", // Automatic height based on content
            maxHeight: "80vh", // Maximum height relative to the viewport
            overflowY: "auto", // Enable vertical scrolling if content exceeds max height
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
            color: "#ffffff", // Text color
            margin: "0", // Remove default margins
            zIndex: "1000", // Ensure modal is above other elements
          },
        }}
      >
        <div>
          {/* Close Button */}
          <button
            onClick={() => setShowModal(false)}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              backgroundColor: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Modal Title */}
          <h2
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginBottom: "20px",
              borderBottom: "1px solid #ffffff", // Adds a 2px solid white underline
              paddingBottom: "10px", // Adds 10px padding below the text
              // display: "inline-block",
            }}
          >
            Mind Pulse-150
          </h2>

          {/* Displaying Final Scores */}
          <div
            style={{
              marginTop: "60px",
              marginBottom: "20px",
              fontSize: "18px",
              textAlign: "center", // Centers text horizontally
            }}
          >
            {Object.entries(finalScores).map(([trait, score]) => (
              <p key={trait} style={{ margin: "10px 0" }}>
                <strong>{trait}:</strong> {score}
              </p>
            ))}
          </div>

          {/* QR Code Section */}
          {showQRCode && qrCodeData && (
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#333",
                borderRadius: "10px",
              }}
            >
              <QRCodeCanvas
                ref={qrCodeRef}
                value={qrCodeData}
                size={128}
                level="H"
                includeMargin={true}
                style={{ marginBottom: "15px" }}
              />
              <button
                onClick={generateQRCode}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#45FE47",
                  color: "#000000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EnhancedPersonalityTest;
