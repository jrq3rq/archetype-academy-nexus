// import React, { useEffect, useState } from "react";
// import LikertScale from "../components/LikertScale"; // Import LikertScale
// import {
//   saveDataToLocalStorage,
//   getDataFromLocalStorage,
// } from "../utils/localStorageUtils";

// // Access the API URL from environment variables
// const MUSEUM_QUESTIONS =
//   process.env.REACT_APP_ARCHETYPES_API_MUSEUM_PERSONALITY_URL;

// const traitStatements = {
//   "Adventure vs. Familiarity":
//     "Are you ready to leap into the unknown or do you find comfort in the familiar? Your journey starts where your comfort zone ends!",
//   "Curiosity vs. Knowledge":
//     "Are you a seeker of new wonders or a sage sharing your wisdom? Let your thirst for knowledge chart your path!",
//   "Social Interaction vs. Solitude":
//     "Do you thrive in the buzz of company or find peace in your own thoughts? Discover your ideal environment!",
//   "Pragmatism vs. Idealism":
//     "Are you grounded in reality or dreaming of possibilities? Let's unveil the balance between your ideals and practical choices!",
//   "Leadership vs. Support":
//     "Do you naturally take the reins or prefer to be the supportive hand behind the scenes? Step forward to define your role!",
//   "Emotion vs. Logic":
//     "Are your decisions guided by your heart or your head? Uncover the balance that drives your choices!",
//   "Creativity vs. Order":
//     "Is your mind a canvas of ideas or a well-organized plan? Explore the spectrum of your creative process!",
//   "Empathy vs. Independence":
//     "Do you prioritize others' feelings or march to the beat of your own drum? Find the harmony between connection and self-reliance!",
//   "Experimentation vs. Tradition":
//     "Are you an innovator eager to break the mold or a guardian of time-honored practices? Your unique approach awaits discovery!",
//   "Insight vs. Action":
//     "Do you ponder deeply before making a move or dive straight into action? Let's navigate your decision-making style!",
// };

// const MuseumQuestionsTest = ({ isDarkMode }) => {
//   const [traitsData, setTraitsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [answers, setAnswers] = useState({}); // State to store answers
//   const [totalScore, setTotalScore] = useState(0); // Store total score
//   const [matchedArchetype, setMatchedArchetype] = useState(null); // Store matched archetype
//   const [storedData, setStoredData] = useState([]);

//   // Fetch traits data from the backend server using the API URL from the environment variable
//   useEffect(() => {
//     const fetchTraitsData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(MUSEUM_QUESTIONS);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();

//         // Log the raw API data to inspect its structure
//         console.log("API Data:", data);

//         // Ensure data is an array and log an error if it's not
//         if (!Array.isArray(data)) {
//           throw new Error("API response is invalid, expected an array");
//         }

//         setTraitsData(data); // Update the state if data is valid
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTraitsData();
//   }, []);

//   // Display loading state
//   if (isLoading) {
//     return <h1 style={styles.loading}>Loading...</h1>;
//   }

//   // Display error state
//   if (error) {
//     return <div style={styles.error}>Error: {error}</div>;
//   }

//   // Handle answer changes
//   const handleAnswerChange = (questionName, value) => {
//     setAnswers({ ...answers, [questionName]: value });
//   };

//   // Trigger submission, calculate total score and set default archetype
//   const handleSubmit = () => {
//     // Calculate total score based on answers
//     const total = Object.values(answers).reduce((sum, value) => {
//       return sum + (typeof value === "number" ? value : 0);
//     }, 0);

//     setTotalScore(total); // Set the total score

//     const defaultArchetype = {
//       name: "Default Archetype",
//       color: "black",
//       mission: "This is a default archetype.",
//     };

//     setMatchedArchetype(defaultArchetype); // Set default archetype (replace with actual logic)
//   };

//   return (
//     <div
//       style={{
//         ...styles.container,
//         backgroundColor: isDarkMode ? "#1F2124" : "#DCDCDC",
//         color: isDarkMode ? "#ffffff" : "#000000",
//       }}
//     >
//       {/* Render trait data */}
//       {Array.isArray(traitsData) && traitsData.length > 0 ? (
//         traitsData.map((trait, traitIndex) => {
//           const { trait: traitName, description, questions } = trait;

//           return (
//             <div
//               key={traitName}
//               style={{
//                 ...styles.traitContainer,
//                 backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                 color: isDarkMode ? "#ffffff" : "#000000",
//               }}
//             >
//               <h2
//                 style={{
//                   ...styles.traitTitle,
//                   backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 }}
//               >
//                 {traitName}
//               </h2>

//               <p
//                 style={{
//                   ...styles.traitCatchy,
//                   backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 }}
//               >
//                 {traitStatements[traitName]}
//               </p>

//               <p
//                 style={{
//                   ...styles.traitDescription,
//                   backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 }}
//               >
//                 {description}
//               </p>

//               <h4
//                 style={{
//                   ...styles.questionsHeader,
//                   backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 }}
//               >
//                 Questions:
//               </h4>

//               {Array.isArray(questions) && questions.length > 0 ? (
//                 <ul style={styles.questionsList}>
//                   {questions.map((question, index) => {
//                     const questionName = `question_${traitName}_${index}`;

//                     return (
//                       <li key={index} style={styles.questionItem}>
//                         <div style={styles.likertContainer}>
//                           <LikertScale
//                             question={question.text}
//                             name={questionName}
//                             onChange={(value) =>
//                               handleAnswerChange(questionName, value)
//                             }
//                           />
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               ) : (
//                 <p>No questions available for this trait.</p>
//               )}
//             </div>
//           );
//         })
//       ) : (
//         <p>No traits data available.</p>
//       )}

//       {/* Submit button */}
//       <button
//         onClick={handleSubmit}
//         style={{
//           ...styles.submitButton,
//           backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//           color: isDarkMode ? "#ffffff" : "#000000",
//         }}
//       >
//         Submit Answers
//       </button>

//       {/* Render matched archetype */}
//       {matchedArchetype && (
//         <div
//           style={{
//             ...styles.resultContainer,
//             backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//             color: isDarkMode ? "#ffffff" : "#000000",
//           }}
//         >
//           <div>
//             <h3>Your Score: {totalScore}</h3> {/* Display total score */}
//           </div>
//           <h2 style={styles.resultTitle}>Your Matching Archetype:</h2>

//           <div style={styles.archetypeDisplay}>
//             <div
//               style={{
//                 ...styles.archetypeColorBox,
//                 backgroundColor: matchedArchetype.color,
//               }}
//             />
//             <p>{matchedArchetype.name}</p>
//             <p>{matchedArchetype.mission}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles for the component
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "30px 20px 20px 20px",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f0f0f0",
//     color: "#000",
//     minHeight: "100vh",
//     borderBottom: "1px solid #2E3136",
//   },
//   loading: {
//     fontSize: "28px",
//     textAlign: "center",
//     marginTop: "20%",
//   },
//   error: {
//     fontSize: "20px",
//     color: "red",
//     textAlign: "center",
//   },
//   traitContainer: {
//     borderRadius: "10px",
//     padding: "20px",
//     marginBottom: "30px",
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #2E3136",
//   },
//   traitTitle: {
//     fontSize: "26px",
//     marginBottom: "10px",
//     color: "#333",
//     fontWeight: "bold",
//   },
//   traitCatchy: {
//     fontSize: "16px",
//     marginBottom: "10px",
//     fontStyle: "italic",
//     color: "#555",
//   },
//   traitDescription: {
//     fontSize: "16px",
//     marginBottom: "15px",
//   },
//   questionsHeader: {
//     fontSize: "20px",
//     marginTop: "15px",
//     color: "#444",
//   },
//   questionsList: {
//     listStyleType: "none",
//     paddingLeft: "0",
//   },
//   questionItem: {
//     fontSize: "16px",
//     marginRight: "10px",
//     borderRadius: "8px",
//     padding: "12px",
//     transition: "background-color 0.2s",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "start",
//   },
//   likertContainer: {
//     width: "100%",
//     marginTop: "10px",
//   },
//   submitButton: {
//     padding: "10px 20px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//     marginTop: "20px",
//     border: "1px solid #2E3136",
//   },
//   resultContainer: {
//     marginTop: "30px",
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "10px",
//     textAlign: "center",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #2E3136",
//   },
//   resultTitle: {
//     fontSize: "22px",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   archetypeDisplay: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   archetypeColorBox: {
//     width: "50px",
//     height: "50px",
//     borderRadius: "50%",
//     marginBottom: "10px",
//   },
// };

// export default MuseumQuestionsTest;

// import React, { useEffect, useState } from "react";
// import LikertScale from "../components/LikertScale"; // Import LikertScale
// import {
//   saveDataToLocalStorage,
//   getDataFromLocalStorage,
// } from "../utils/localStorageUtils";

// // Access the API URL from environment variables
// const MUSEUM_QUESTIONS =
//   process.env.REACT_APP_ARCHETYPES_API_MUSEUM_PERSONALITY_URL;

// const traitStatements = {
//   "Adventure vs. Familiarity":
//     "Are you ready to leap into the unknown or do you find comfort in the familiar? Your journey starts where your comfort zone ends!",
//   "Curiosity vs. Knowledge":
//     "Are you a seeker of new wonders or a sage sharing your wisdom? Let your thirst for knowledge chart your path!",
//   "Social Interaction vs. Solitude":
//     "Do you thrive in the buzz of company or find peace in your own thoughts? Discover your ideal environment!",
//   "Pragmatism vs. Idealism":
//     "Are you grounded in reality or dreaming of possibilities? Let's unveil the balance between your ideals and practical choices!",
//   "Leadership vs. Support":
//     "Do you naturally take the reins or prefer to be the supportive hand behind the scenes? Step forward to define your role!",
//   "Emotion vs. Logic":
//     "Are your decisions guided by your heart or your head? Uncover the balance that drives your choices!",
//   "Creativity vs. Order":
//     "Is your mind a canvas of ideas or a well-organized plan? Explore the spectrum of your creative process!",
//   "Empathy vs. Independence":
//     "Do you prioritize others' feelings or march to the beat of your own drum? Find the harmony between connection and self-reliance!",
//   "Experimentation vs. Tradition":
//     "Are you an innovator eager to break the mold or a guardian of time-honored practices? Your unique approach awaits discovery!",
//   "Insight vs. Action":
//     "Do you ponder deeply before making a move or dive straight into action? Let's navigate your decision-making style!",
// };

// const questionTraitMapping = {
//   // Map questions to Big Five traits
//   question_Adventure_vs_Familiarity_1: "Openness",
//   question_Curiosity_vs_Knowledge_1: "Openness",
//   question_Social_Interaction_vs_Solitude_1: "Extraversion",
//   question_Pragmatism_vs_Idealism_1: "Conscientiousness",
//   question_Leadership_vs_Support_1: "Conscientiousness",
//   question_Emotion_vs_Logic_1: "Agreeableness",
//   question_Creativity_vs_Order_1: "Openness",
//   question_Empathy_vs_Independence_1: "Agreeableness",
//   question_Experimentation_vs_Tradition_1: "Openness",
//   question_Insight_vs_Action_1: "Neuroticism",
// };

// const MuseumQuestionsTest = ({ isDarkMode }) => {
//   const [traitsData, setTraitsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [answers, setAnswers] = useState({}); // State to store answers
//   const [totalScore, setTotalScore] = useState(0); // Store total score
//   const [matchedArchetype, setMatchedArchetype] = useState(null); // Store matched archetype
//   const [archetypes, setArchetypes] = useState([]); // State to store archetypes

//   // Fetch archetypes data
//   useEffect(() => {
//     const fetchArchetypes = async () => {
//       try {
//         const storedData = getDataFromLocalStorage("archetypes");
//         if (storedData) {
//           setArchetypes(storedData);
//           console.log("Archetypes loaded from local storage.");
//           return;
//         }
//         const response = await fetch(process.env.REACT_APP_ARCHETYPES_API_URL);

//         if (!response.ok) {
//           throw new Error("Failed to fetch archetype data");
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Invalid archetype data format");
//         }

//         setArchetypes(data);
//         saveDataToLocalStorage("archetypes", data);
//         console.log("Archetypes fetched from API and saved to local storage.");
//       } catch (error) {
//         console.error("Error fetching archetypes:", error.message);
//       }
//     };

//     fetchArchetypes();
//   }, []);

//   // Fetch traits data from the backend server using the API URL from the environment variable
//   useEffect(() => {
//     const fetchTraitsData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(MUSEUM_QUESTIONS);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();

//         // Log the raw API data to inspect its structure
//         console.log("API Data:", data);

//         // Ensure data is an array and log an error if it's not
//         if (!Array.isArray(data)) {
//           throw new Error("API response is invalid, expected an array");
//         }

//         setTraitsData(data); // Update the state if data is valid
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTraitsData();
//   }, []);

//   // Display loading state
//   if (isLoading) {
//     return <h1 style={styles.loading}>Loading...</h1>;
//   }

//   // Display error state
//   if (error) {
//     return <div style={styles.error}>Error: {error}</div>;
//   }

//   // Handle answer changes
//   const handleAnswerChange = (questionName, value) => {
//     setAnswers({ ...answers, [questionName]: value });
//   };

//   const normalizeScores = (scores, maxScore) => {
//     const normalized = {};
//     Object.keys(scores).forEach((key) => {
//       normalized[key] = scores[key] / maxScore;
//     });
//     return normalized;
//   };

//   const calculateSimilarity = (userScores, archetypeScores) => {
//     let distance = 0;
//     Object.keys(userScores).forEach((trait) => {
//       const diff = userScores[trait] - archetypeScores[trait];
//       distance += diff ** 2;
//     });
//     return Math.sqrt(distance); // Lower distance = higher similarity
//   };

//   const handleSubmit = () => {
//     const userTraitScores = {
//       Openness: 0,
//       Conscientiousness: 0,
//       Extraversion: 0,
//       Agreeableness: 0,
//       Neuroticism: 0,
//     };

//     Object.entries(answers).forEach(([questionName, responseValue]) => {
//       const trait = questionTraitMapping[questionName];
//       if (trait) {
//         userTraitScores[trait] += responseValue;
//       }
//     });

//     const maxScore = Object.keys(questionTraitMapping).length / 5; // Adjust as needed
//     const normalizedUserScores = normalizeScores(userTraitScores, maxScore);

//     const archetypeMatches = archetypes.map((archetype) => ({
//       name: archetype.name,
//       similarity: calculateSimilarity(normalizedUserScores, archetype.scores),
//       ...archetype,
//     }));

//     archetypeMatches.sort((a, b) => a.similarity - b.similarity);

//     const bestMatch = archetypeMatches[0];

//     setMatchedArchetype({
//       name: bestMatch.name,
//       color: bestMatch.color,
//       mission: bestMatch.mission,
//     });

//     setTotalScore(
//       Object.values(userTraitScores).reduce((sum, value) => sum + value, 0)
//     );
//   };

//   return (
//     <div
//       style={{
//         ...styles.container,
//         backgroundColor: isDarkMode ? "#1F2124" : "#DCDCDC",
//         color: isDarkMode ? "#ffffff" : "#000000",
//       }}
//     >
//       {/* Render trait data */}
//       {Array.isArray(traitsData) && traitsData.length > 0 ? (
//         traitsData.map((trait, traitIndex) => {
//           const { trait: traitName, description, questions } = trait;

//           return (
//             <div
//               key={traitName}
//               style={{
//                 ...styles.traitContainer,
//                 backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                 color: isDarkMode ? "#ffffff" : "#000000",
//               }}
//             >
//               <h2
//                 style={{
//                   ...styles.traitTitle,
//                   backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 }}
//               >
//                 {traitName}
//               </h2>

//               <p
//                 style={{
//                   ...styles.traitCatchy,
//                   backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 }}
//               >
//                 {traitStatements[traitName]}
//               </p>

//               <p
//                 style={{
//                   ...styles.traitDescription,
//                   backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 }}
//               >
//                 {description}
//               </p>

//               <h4
//                 style={{
//                   ...styles.questionsHeader,
//                   backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 }}
//               >
//                 Questions:
//               </h4>

//               {Array.isArray(questions) && questions.length > 0 ? (
//                 <ul style={styles.questionsList}>
//                   {questions.map((question, index) => {
//                     const questionName = `question_${traitName}_${index}`;

//                     return (
//                       <li key={index} style={styles.questionItem}>
//                         <div style={styles.likertContainer}>
//                           <LikertScale
//                             question={question.text}
//                             name={questionName}
//                             onChange={(value) =>
//                               handleAnswerChange(questionName, value)
//                             }
//                           />
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               ) : (
//                 <p>No questions available for this trait.</p>
//               )}
//             </div>
//           );
//         })
//       ) : (
//         <p>No traits data available.</p>
//       )}

//       {/* Submit button */}
//       <button
//         onClick={handleSubmit}
//         style={{
//           ...styles.submitButton,
//           backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//           color: isDarkMode ? "#ffffff" : "#000000",
//         }}
//       >
//         Submit Answers
//       </button>

//       {/* Render matched archetype */}
//       {matchedArchetype && (
//         <div
//           style={{
//             ...styles.resultContainer,
//             backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//             color: isDarkMode ? "#ffffff" : "#000000",
//           }}
//         >
//           <div>
//             <h3>Your Score: {totalScore}</h3> {/* Display total score */}
//           </div>
//           <h2 style={styles.resultTitle}>Your Matching Archetype:</h2>

//           <div style={styles.archetypeDisplay}>
//             <div
//               style={{
//                 ...styles.archetypeColorBox,
//                 backgroundColor: matchedArchetype.color,
//               }}
//             />
//             <p>{matchedArchetype.name}</p>
//             <p>{matchedArchetype.mission}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles for the component
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "30px 20px 20px 20px",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f0f0f0",
//     color: "#000",
//     minHeight: "100vh",
//     borderBottom: "1px solid #2E3136",
//   },
//   loading: {
//     fontSize: "28px",
//     textAlign: "center",
//     marginTop: "20%",
//   },
//   error: {
//     fontSize: "20px",
//     color: "red",
//     textAlign: "center",
//   },
//   traitContainer: {
//     borderRadius: "10px",
//     padding: "20px",
//     marginBottom: "30px",
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #2E3136",
//   },
//   traitTitle: {
//     fontSize: "26px",
//     marginBottom: "10px",
//     color: "#333",
//     fontWeight: "bold",
//   },
//   traitCatchy: {
//     fontSize: "16px",
//     marginBottom: "10px",
//     fontStyle: "italic",
//     color: "#555",
//   },
//   traitDescription: {
//     fontSize: "16px",
//     marginBottom: "15px",
//   },
//   questionsHeader: {
//     fontSize: "20px",
//     marginTop: "15px",
//     color: "#444",
//   },
//   questionsList: {
//     listStyleType: "none",
//     paddingLeft: "0",
//   },
//   questionItem: {
//     fontSize: "16px",
//     marginRight: "10px",
//     borderRadius: "8px",
//     padding: "12px",
//     transition: "background-color 0.2s",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "start",
//   },
//   likertContainer: {
//     width: "100%",
//     marginTop: "10px",
//   },
//   submitButton: {
//     padding: "10px 20px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//     marginTop: "20px",
//     border: "1px solid #2E3136",
//   },
//   resultContainer: {
//     marginTop: "30px",
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "10px",
//     textAlign: "center",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #2E3136",
//   },
//   resultTitle: {
//     fontSize: "22px",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   archetypeDisplay: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   archetypeColorBox: {
//     width: "50px",
//     height: "50px",
//     borderRadius: "50%",
//     marginBottom: "10px",
//   },
// };

// export default MuseumQuestionsTest;
import React, { useEffect, useState } from "react";
import LikertScale from "../components/LikertScale"; // Import LikertScale
import ToggleSwitch from "../components/ToggleSwitch"; // Import the ToggleSwitch component
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localStorageUtils";
import ModeToggle from "../components/ModeToggle";
import { margin } from "polished";

// Access the API URL from environment variables
const MUSEUM_QUESTIONS =
  process.env.REACT_APP_ARCHETYPES_API_MUSEUM_PERSONALITY_URL;

const MINI_QUESTIONS = [
  { text: "I enjoy new experiences.", trait: "Openness" },
  { text: "I prefer to plan things in advance.", trait: "Conscientiousness" },
  { text: "I find it easy to start conversations.", trait: "Extraversion" },
  { text: "I sympathize with others' feelings.", trait: "Agreeableness" },
  { text: "I get stressed out easily.", trait: "Neuroticism" },
  { text: "I enjoy artistic and cultural activities.", trait: "Openness" },
  {
    text: "I like to keep my workspace organized.",
    trait: "Conscientiousness",
  },
  { text: "I enjoy being the center of attention.", trait: "Extraversion" },
  { text: "I consider myself a caring person.", trait: "Agreeableness" },
  { text: "I worry about many things.", trait: "Neuroticism" },
];

const KID_QUESTIONS = [
  { text: "I like trying new things.", trait: "Openness" },
  { text: "I like to plan before doing things.", trait: "Conscientiousness" },
  { text: "I like talking to new people.", trait: "Extraversion" },
  { text: "I care about how others feel.", trait: "Agreeableness" },
  { text: "I feel worried sometimes.", trait: "Neuroticism" },
  { text: "I like drawing and painting.", trait: "Openness" },
  { text: "I keep my room neat and tidy.", trait: "Conscientiousness" },
  { text: "I like being the center of attention.", trait: "Extraversion" },
  { text: "I like helping others.", trait: "Agreeableness" },
  {
    text: "I feel scared when I don’t know what will happen.",
    trait: "Neuroticism",
  },
];

const ARCHETYPE_SCORE = [
  {
    name: "Rebel",
    scores: {
      Openness: 0.7,
      Conscientiousness: 0.3,
      Extraversion: 0.6,
      Agreeableness: 0.2,
      Neuroticism: 0.5,
    },
  },
  {
    name: "Magician",
    scores: {
      Openness: 0.8,
      Conscientiousness: 0.5,
      Extraversion: 0.7,
      Agreeableness: 0.4,
      Neuroticism: 0.3,
    },
  },
  {
    name: "Hero",
    scores: {
      Openness: 0.6,
      Conscientiousness: 0.7,
      Extraversion: 0.8,
      Agreeableness: 0.6,
      Neuroticism: 0.4,
    },
  },
  {
    name: "Creator",
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.6,
      Extraversion: 0.5,
      Agreeableness: 0.5,
      Neuroticism: 0.3,
    },
  },
  {
    name: "Ruler",
    scores: {
      Openness: 0.5,
      Conscientiousness: 0.8,
      Extraversion: 0.7,
      Agreeableness: 0.3,
      Neuroticism: 0.4,
    },
  },
  {
    name: "Caregiver",
    scores: {
      Openness: 0.4,
      Conscientiousness: 0.7,
      Extraversion: 0.6,
      Agreeableness: 0.8,
      Neuroticism: 0.5,
    },
  },
  {
    name: "Innocent",
    scores: {
      Openness: 0.4,
      Conscientiousness: 0.6,
      Extraversion: 0.4,
      Agreeableness: 0.7,
      Neuroticism: 0.3,
    },
  },
  {
    name: "Sage",
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.7,
      Extraversion: 0.5,
      Agreeableness: 0.6,
      Neuroticism: 0.2,
    },
  },
  {
    name: "Explorer",
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.4,
      Extraversion: 0.8,
      Agreeableness: 0.5,
      Neuroticism: 0.4,
    },
  },
  {
    name: "Lover",
    scores: {
      Openness: 0.6,
      Conscientiousness: 0.5,
      Extraversion: 0.7,
      Agreeableness: 0.8,
      Neuroticism: 0.4,
    },
  },
  {
    name: "Joker",
    scores: {
      Openness: 0.8,
      Conscientiousness: 0.4,
      Extraversion: 0.9,
      Agreeableness: 0.3,
      Neuroticism: 0.6,
    },
  },
  {
    name: "Everyman",
    scores: {
      Openness: 0.5,
      Conscientiousness: 0.6,
      Extraversion: 0.5,
      Agreeableness: 0.7,
      Neuroticism: 0.4,
    },
  },
];

const MuseumQuestionsTest = ({ isDarkMode, toggleTheme }) => {
  const [answers, setAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [isKidMode, setIsKidMode] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(false);
  const [matchedArchetype, setMatchedArchetype] = useState(null); // Add this state

  const currentQuestions = isKidMode ? KID_QUESTIONS : MINI_QUESTIONS;

  // Handle answer changes
  const handleAnswerChange = (questionName, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionName]: value }));
  };

  const handleSubmit = () => {
    setToggleDisabled(true); // Disable toggle after submission

    // Calculate user trait scores
    const userTraitScores = {
      Openness: 0,
      Conscientiousness: 0,
      Extraversion: 0,
      Agreeableness: 0,
      Neuroticism: 0,
    };

    currentQuestions.forEach((question, index) => {
      const score = answers[`question_${index}`] || 0;
      userTraitScores[question.trait] += score;
    });

    // Normalize user scores (assuming each trait has 2 questions)
    const maxScorePerTrait = 10; // 5 options * 2 questions for each trait
    const normalizedUserScores = Object.fromEntries(
      Object.entries(userTraitScores).map(([trait, score]) => [
        trait,
        score / maxScorePerTrait,
      ])
    );

    // Calculate similarity with each archetype
    const archetypeMatches = ARCHETYPE_SCORE.map((archetype) => {
      const distance = Object.entries(normalizedUserScores).reduce(
        (acc, [trait, userScore]) => {
          const archetypeScore = archetype.scores[trait];
          return acc + Math.pow(userScore - archetypeScore, 2);
        },
        0
      );
      return {
        ...archetype,
        similarity: Math.sqrt(distance), // Lower distance = higher similarity
      };
    });

    // Find the best match (lowest distance)
    const bestMatch = archetypeMatches.reduce((min, current) =>
      current.similarity < min.similarity ? current : min
    );

    // Update state with results
    setTotalScore(
      Object.values(answers).reduce(
        (sum, value) => sum + (Number(value) || 0),
        0
      )
    );
    setMatchedArchetype({
      name: bestMatch.name,
      color: "someColor", // You need to define this based on your data structure
      mission: "someMission", // Similarly, define this
    });
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? "#1F2124" : "#DCDCDC",
        color: isDarkMode ? "#ffffff" : "#000000",
        justifyContent: "center", // Centers content vertically if flex-direction is column
        alignItems: "center", // Centers content horizontally
      }}
    >
      <div style={styles.modeLabel}>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: isDarkMode ? "#F5F5F5" : "#2E3136",
          }}
        >
          {isKidMode ? "Kids Mode" : "Grown Ups Mode"}
        </span>
      </div>
      <h2 style={styles.title}>Mini Personality Builder</h2>
      {/* <h2 style={styles.title}>Mini Personality Assessment</h2> */}
      <ModeToggle
        isKidMode={isKidMode}
        onToggle={() => !toggleDisabled && setIsKidMode((prev) => !prev)}
        disabled={toggleDisabled}
        isDarkMode={isDarkMode}
      />
      <ul style={styles.questionsList}>
        {currentQuestions.map((question, index) => {
          const questionName = `question_${index}`;
          return (
            <li key={index} style={styles.questionItem}>
              <LikertScale
                question={question.text}
                name={questionName}
                onChange={(value) => handleAnswerChange(questionName, value)}
              />
            </li>
          );
        })}
      </ul>

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

      {totalScore > 0 && (
        <div
          style={{
            ...styles.resultContainer,
            backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
          }}
        >
          <h3>Your Total Score: {totalScore}</h3>
          {matchedArchetype && (
            <>
              <h3>Your Matching Archetype:</h3>
              <p>{matchedArchetype.name}</p>
              <p>{matchedArchetype.mission}</p>
            </>
          )}
          <p>Thank you for completing the assessment!</p>
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
  modeLabel: {
    textAlign: "center",
    marginBottom: "10px",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
  },
  questionsList: {
    listStyleType: "none",
    maxWidth: "850px", // or any other width that fits your design
    width: "100%", // ensures it takes up full width up to max-width
  },
  questionItem: {
    fontSize: "16px",
    borderRadius: "8px",
    padding: "12px",
    transition: "background-color 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
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
};

export default MuseumQuestionsTest;
