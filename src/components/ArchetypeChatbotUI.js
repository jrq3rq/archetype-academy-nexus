import React, { useState, useEffect, useRef, useContext } from "react";
import ChatbotContext from "../state/ChatbotContext";
import styled, { keyframes, css } from "styled-components";
import { lighten, darken } from "polished";

// Simulating environment variable
const BASE_URL = process.env.REACT_APP_ARCHETYPES_API_URL;

const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const getAllArchetypes = async () => {
  try {
    const response = await fetchWithTimeout(BASE_URL);
    // console.log("Fetching from:", BASE_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const archetypePlanetaryBackground = {
  Caregiver: "/images/CaregiverBG.png",
  Creator: "/images/CreatorBG.png",
  Everyman: "/images/EverymanBG.png",
  Explorer: "/images/ExplorerBG.png",
  Hero: "/images/HeroBG.png",
  Innocent: "/images/InnocentBG.png",
  Joker: "/images/JokerBG.png",
  Lover: "/images/LoverBG.png",
  Magician: "/images/MagicianBG.png",
  Rebel: "/images/RebelBG.png",
  Ruler: "/images/RulerBG.png",
  Sage: "/images/SageBG.png",
};

const categories = {
  coreTraits: [
    "Creative",
    "Curious",
    "Disciplined",
    "Achievement-oriented",
    "Outgoing",
    "Energetic",
    "Friendly",
    "Compassionate",
    "Sensitive",
    "Nervous",
  ],
  motivationsAndGoals: [
    "Learn new things",
    "Have novel experiences",
    "Be organized and reliable",
    "Achieve mastery",
    "Connect with people",
    "Have influence",
    "Cooperate and help others",
    "Build relationships",
    "Avoid negative emotions",
    "Seek stability",
  ],
  abilitiesAndSkills: [
    "Imagination",
    "Problem-solving",
    "Focus",
    "Time management",
    "Communication",
    "Collaboration",
    "Empathy",
    "Listening",
    "Self-awareness",
    "Caution",
  ],
  talentsAndExpertise: [
    "Writing",
    "Photography",
    "Research",
    "Data analysis",
    "Public speaking",
    "Event planning",
    "Counseling",
    "Teaching",
    "Editing",
    "Quality control",
  ],
};

const getTextColor = (bgColor) => {
  if (!bgColor || typeof bgColor !== "string") {
    return "#000000"; // Default to black if bgColor is invalid or undefined
  }

  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
};

const ArchetypeChatbotUI = ({ isDarkMode = false, toggleTheme }) => {
  const { state, dispatch } = useContext(ChatbotContext);
  const [message, setMessage] = useState("");
  const [showArchetypeSelector, setShowArchetypeSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorySelections, setCategorySelections] = useState({
    coreTraits: "",
    motivationsAndGoals: "",
    abilitiesAndSkills: "",
    talentsAndExpertise: "",
  });
  const [traitValues, setTraitValues] = useState({
    intelligence: 0.5,
    creativity: 0.5,
    EQ: 0.5,
    motivation: 0.5,
    confidence: 0.5,
    empathy: 0.5,
  });
  const [archetypes, setArchetypes] = useState([]);
  const chatWindowRef = useRef(null);
  // New state for the AI model selection
  const [selectedModel, setSelectedModel] = useState(""); // Empty string for initial state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
`;

  const FloatingCircle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color || "#282b30"};
    /* animation: ${float} 3s ease-in-out infinite; */
    pointer-events: none; /* Prevents the circle from blocking any clicks */
    /* border: 1px solid ${(props) =>
      lighten(0.1, props.color || "#2e3136")}; */
    border: 1px solid #2e3136;
    margin-bottom: 10px;
  `;

  const FloatingTriangle = styled.div`
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid ${(props) => props.color || "#282b30"};

    pointer-events: none; /* Prevents the triangle from blocking any clicks */
    margin-bottom: 10px;
    border-top-color: ${(props) =>
      props.color || "#282b30"}; /* Main triangle color */
    border-bottom: none; /* No bottom border since we're creating an upside-down triangle */
    border-top: 20px solid ${(props) => lighten(0, props.color || "#2e3136")}; /* Optionally lighten/darken the triangle */
  `;

  const MessageContainer = styled.div`
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    width: 100%;
    position: relative;
  `;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllArchetypes();
      setArchetypes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (state.selectedArchetype) {
      const archetype = archetypes.find(
        (a) => a.name.toLowerCase() === state.selectedArchetype.toLowerCase()
      );
      if (archetype) {
        setTraitValues(archetype.characteristics);
        dispatch({ type: "SET_SELECTED_COLOR", payload: archetype.color });
        dispatch({ type: "SET_ARCHETYPE_DATA", payload: archetype });
      }
    }
  }, [state.selectedArchetype, archetypes, dispatch]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [state.messages]);

  const handleCategorySelection = (value) => {
    setCategorySelections((prev) => ({
      ...prev,
      [selectedCategory]: value,
    }));
    setSelectedCategory("");
  };

  const handleTraitChange = (trait, value) => {
    setTraitValues((prev) => ({ ...prev, [trait]: value }));
  };

  const handleSendMessage = () => {
    if (message.trim() && state.selectedArchetype) {
      const textColor = getTextColor(state.selectedColor);
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          sender: "Maker",
          content: message,
          color: "#36393f",
          textColor: "#ffffff",
        },
      });

      setMessage("");
      setTimeout(() => {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            sender: state.selectedArchetype,
            content: `My capabilities as ${state.selectedArchetype} are limited, but I’m here to help. Please provide more details so I can assist you better.`,
            color: state.selectedColor,
            textColor: textColor,
          },
        });
      }, 1000);
    }
  };

  const handleArchetypeChange = (e) => {
    dispatch({ type: "SET_ARCHETYPE", payload: e.target.value });
  };

  const handleClearChat = () => {
    dispatch({ type: "CLEAR_CHAT" }); // This now matches the action type in the reducer
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const promptData = {
    archetype: state.selectedArchetype,
    selectedModel, // Add selected model to the JSON data
    traits: categorySelections,
    characteristics: traitValues,
    message: message,
  };

  const styles = {
    desktopContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: isDarkMode ? "#1e2124" : "#ffffff", // Change based on theme
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
      // borderTop: "1px solid #2E3136", // Keep top border
      // borderLeft: "1px solid #2E3136", // Keep left border
      // borderRight: "1px solid #2E3136", // Keep right border
      // borderBottom: "none", // Remove bottom border
    },
    desktopHeader: {
      marginBottom: "10px",
    },
    desktopMainContent: {
      display: "flex",
      flexGrow: 1,
      gap: "20px",
      overflow: "hidden",
    },
    desktopChatSection: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      maxWidth: "60%",
    },
    desktopControlSection: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      overflowY: "auto",
    },
    mobileContainer: {
      backgroundColor: isDarkMode ? "#1e2124" : "#ffffff", // Change based on theme
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "100%",
      margin: "0 auto",
      border: "1px solid #2E3136",
    },
    chatWindow: {
      position: "relative", // Ensure the circle is positioned relative to this container
      padding: "15px",
      boxSizing: "border-box", // Ensure padding does not affect element size
      marginBottom: "8px",
      backgroundImage: state.selectedArchetype
        ? `url(${archetypePlanetaryBackground[state.selectedArchetype]})`
        : isDarkMode
        ? "none"
        : "#f0f0f0", // Fallback color
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "5px",
      height: "300px",
      overflowY: "auto",
      border: "1px solid #2E3136",
    },
    arcCircle: {
      position: "absolute",
      top: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: state.selectedColor || "#282b30",
      border: "2px solid red", // Red border for debugging
      zIndex: 1000,
    },
    squareBox: {
      position: "absolute",
      top: "10px", // Adjust the position as needed
      left: "50%",
      transform: "translateX(-50%)", // Center horizontally
      width: "40px", // Define the size of the square
      height: "40px",
      backgroundColor: state.selectedColor || "#282b30", // Use the archetype's color
      zIndex: 1000, // Ensures it appears above the chat window
      border: "2px solid #2E3136", // Optional: add a border to match the chat window
    },
    smallCircle: {
      display: "inline-block",
      width: "50px",
      height: "50px",
      backgroundColor: state.selectedColor || "#282b30", // Default color
      // borderRadius: "50%",
      marginLeft: "5px", // Space between the text and the circle
    },
    message: {
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
      maxWidth: "70%",
      wordWrap: "break-word",
    },
    input: {
      width: "100%",
      padding: "10px",
      // backgroundColor: "#40444b",
      backgroundColor: isDarkMode ? "#40444b" : "#f4f4f4", // Change based on theme
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      border: "none",
      borderRadius: "5px",
      marginBottom: "10px",
      resize: "vertical",
      boxSizing: "border-box",
      fontSize: "16px", // Prevents zooming on mobile devices
      border: "1px solid #2E3136",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: state.selectedColor || "#282b30", // Use the archetype's color
      color: getTextColor(state.selectedColor || "#282b30"),
      // border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginRight: "10px",
      width: "100%",
      marginTop: "10px",
      border: "1px solid #2E3136",
    },
    sendButton: {
      padding: "10px 20px",
      backgroundColor: state.selectedColor || "#282b30", // Use the archetype's color
      color: getTextColor(state.selectedColor || "#282b30"), // Ensure the text color is readable
      // border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
      transition: "background-color 0.3s",
      border: "1px solid #2E3136",
    },
    archetypeSelector: {
      // backgroundColor: "#2f3136",
      backgroundColor: isDarkMode ? "#40444b" : "#f4f4f4", // Change based on theme
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      padding: "15px",
      borderRadius: "5px",
      marginTop: "10px",
      width: "100%",
      boxSizing: "border-box",
      border: "1px solid #2E3136",
    },
    slider: {
      width: "100%",
      marginBottom: "15px",
      accentColor: state.selectedColor || "#282b30", // Use the archetype's color for the slider
    },
    sliderThumb: {
      appearance: "none",
      width: "15px",
      height: "15px",
      backgroundColor: state.selectedColor || "#282b30", // Use the archetype's color for the thumb
      borderRadius: "50%",
      cursor: "pointer",
    },
    sliderTrack: {
      width: "100%",
      height: "5px",
      backgroundColor: state.selectedColor || "#282b30", // Use the archetype's color for the track
      borderRadius: "5px",
    },
    jsonDisplay: {
      // backgroundColor: "#2f3136",
      backgroundColor: isDarkMode ? "#40444b" : "#f4f4f4", // Change based on theme
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      borderRadius: "5px",
      padding: "15px",
      marginTop: "10px",
      fontFamily: "monospace",
      maxHeight: "200px",
      overflowY: "auto",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
      border: "1px solid #2E3136",
    },

    dropdown: {
      width: "100%",
      padding: "10px",
      // marginBottom: "15px",
      // marginBottom: windowWidth > 768 ? "10px" : "0px", // Desktop has 10px, mobile has 0px
      backgroundColor: isDarkMode ? "#2f3136" : "#f0f0f0", // Change chat window color
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      // border: "none",
      borderRadius: "5px",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>')`,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
        isDarkMode ? "white" : "black"
      }"><path d="M7 10l5 5 5-5z"/></svg>')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "calc(100% - 10px) center",
      paddingRight: "30px",
      border: "1px solid #2E3136",
    },

    dropdown2: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      backgroundColor: isDarkMode ? "#2f3136" : "#f0f0f0", // Change chat window color
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      border: "1px solid #2E3136",
      borderRadius: "5px",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>')`,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
        isDarkMode ? "white" : "black"
      }"><path d="M7 10l5 5 5-5z"/></svg>')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "calc(100% - 10px) center",
      paddingRight: "30px",
    },
    dropdownModelsSector: {
      width: "100%",
      padding: "10px",
      marginTop: windowWidth > 768 ? "15px" : "15px",
      marginBottom: windowWidth > 768 ? "15px" : "15px",
      marginLeft: "0px",
      marginRight: "0px",
      backgroundColor: isDarkMode ? "#2f3136" : "#f0f0f0", // Change chat window color
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      // border: "none",
      borderRadius: "5px",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>')`, // Add the dropdown arrow icon
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
        isDarkMode ? "white" : "black"
      }"><path d="M7 10l5 5 5-5z"/></svg>')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "calc(100% - 10px) center", // Ensure the arrow stays on the right
      paddingRight: "30px", // Add padding to leave space for the arrow
      border: "1px solid #2E3136",
    },
    categoryButtons: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "15px",
    },
    categoryButton: {
      flex: "1 0 calc(25% - 10px)",
      padding: "10px",
      backgroundColor: state.selectedColor || "#282b30",
      color: getTextColor(state.selectedColor || "#282b30"),
      // border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      border: "1px solid #2E3136",
    },
    activeButton: {
      backgroundColor: "#7289da",
    },
    selectedButton: {
      backgroundColor: state.selectedColor || "#282b30",
    },
    label: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
    },
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => (
    <>
      {/* Include ToggleSwitch */}

      <div style={styles.chatWindow} ref={chatWindowRef}>
        {state.messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              backgroundColor: msg.color,
              color: msg.textColor,
            }}
          >
            <strong>{msg.sender}:</strong> {msg.content}
            {/* Conditionally render the floating gem after the welcome message */}
          </div>
        ))}
      </div>
      <MessageContainer>
        <FloatingCircle color={state.selectedColor} />
      </MessageContainer>
      <select
        style={styles.dropdown}
        value={state.selectedArchetype}
        onChange={handleArchetypeChange}
      >
        <option value="">Select an archetype</option>
        {archetypes.map((archetype) => (
          <option key={archetype.id} value={archetype.name}>
            {archetype.name}
          </option>
        ))}
      </select>
      <select
        style={styles.dropdownModelsSector}
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)} // Update selected model
      >
        {/* Placeholder option with an empty value */}
        <option value="" disabled>
          Select Model
        </option>

        <option value="Grok-1">Grok-1</option>
        <option value="Grok-2">Grok-2</option>
        <option value="GPT-3">GPT-3</option>
        <option value="GPT-4">GPT-4</option>
        <option value="Claude">Claude</option>
        <option value="LLaMA">LLaMA</option>
      </select>
      <div style={styles.categoryButtons}>
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            style={{
              ...styles.categoryButton,
              ...(selectedCategory === category ? styles.activeButton : {}),
              ...(categorySelections[category] ? styles.selectedButton : {}),
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {category.replace(/([A-Z])/g, " $1").trim()}
            {categorySelections[category] && " ✓"}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <select
          style={styles.dropdown2}
          value={categorySelections[selectedCategory]}
          onChange={(e) => handleCategorySelection(e.target.value)}
        >
          <option value="">
            Select a {selectedCategory.replace(/([A-Z])/g, " $1").trim()}
          </option>
          {categories[selectedCategory].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
      <textarea
        style={styles.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
        rows={4}
      />
      <button style={styles.sendButton} onClick={handleSendMessage}>
        Send
      </button>
      <button
        style={styles.button}
        onClick={() => setShowArchetypeSelector(!showArchetypeSelector)}
      >
        {showArchetypeSelector ? "Hide Trait Adjuster" : "Show Trait Adjuster"}
      </button>
      <button style={styles.button} onClick={handleClearChat}>
        Clear Chat
      </button>
      {showArchetypeSelector && (
        <div style={styles.archetypeSelector}>
          <h3>Fine-tune traits for {state.selectedArchetype}:</h3>
          {Object.entries(traitValues).map(([trait, value]) => (
            <div key={trait}>
              <div style={styles.label}>
                <span>{trait.charAt(0).toUpperCase() + trait.slice(1)}</span>
                <span>{value.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value}
                onChange={(e) =>
                  handleTraitChange(trait, parseFloat(e.target.value))
                }
                style={{
                  ...styles.slider,
                  accentColor: state.selectedColor || "#282b30", // Ensure the accent color is set dynamically
                }}
                className="custom-slider"
              />
            </div>
          ))}
        </div>
      )}
      <div style={styles.jsonDisplay}>
        <pre>{JSON.stringify(promptData, null, 2)}</pre>
      </div>
    </>
  );

  return isMobile ? (
    <div style={styles.mobileContainer}>{renderContent()}</div>
  ) : (
    <div style={styles.desktopContainer}>
      <div style={styles.desktopHeader}>
        <select
          style={styles.dropdown}
          value={state.selectedArchetype}
          onChange={handleArchetypeChange}
        >
          <option value="">Select an archetype</option>
          {archetypes.map((archetype) => (
            <option key={archetype.id} value={archetype.name}>
              {archetype.name}
            </option>
          ))}
        </select>
        <select
          style={styles.dropdownModelsSector}
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)} // Update selected model
        >
          {/* Placeholder option with an empty value */}
          <option value="" disabled>
            Select Model
          </option>
          <option value="Grok-1">Grok-1</option>
          <option value="Grok-2">Grok-2</option>
          <option value="GPT-3">GPT-3</option>
          <option value="GPT-4">GPT-4</option>
          <option value="Claude">Claude</option>
          <option value="LLaMA">LLaMA</option>
        </select>
      </div>
      <div style={styles.desktopMainContent}>
        <div style={styles.desktopChatSection}>
          <div style={styles.chatWindow} ref={chatWindowRef}>
            {state.messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  backgroundColor: msg.color,
                  color: msg.textColor,
                  alignSelf: msg.sender === "Maker" ? "flex-end" : "flex-start",
                }}
              >
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <textarea
            style={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            rows={4}
          />
          <button style={styles.sendButton} onClick={handleSendMessage}>
            Send
          </button>
        </div>
        <div style={styles.desktopControlSection}>
          <div style={styles.categoryButtons}>
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                style={{
                  ...styles.categoryButton,
                  ...(selectedCategory === category ? styles.activeButton : {}),
                  ...(categorySelections[category]
                    ? styles.selectedButton
                    : {}),
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {category.replace(/([A-Z])/g, " $1").trim()}
                {categorySelections[category] && " ✓"}
              </button>
            ))}
          </div>
          {selectedCategory && (
            <select
              style={styles.dropdown}
              value={categorySelections[selectedCategory]}
              onChange={(e) => handleCategorySelection(e.target.value)}
            >
              <option value="">
                Select a {selectedCategory.replace(/([A-Z])/g, " $1").trim()}
              </option>
              {categories[selectedCategory].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
          <button
            style={styles.button}
            onClick={() => setShowArchetypeSelector(!showArchetypeSelector)}
          >
            {showArchetypeSelector
              ? "Hide Trait Adjuster"
              : "Show Trait Adjuster"}
          </button>

          <button style={styles.button} onClick={handleClearChat}>
            Clear Chat
          </button>
          {showArchetypeSelector && (
            <div style={styles.archetypeSelector}>
              <h3>Fine-tune traits for {state.selectedArchetype}:</h3>
              {Object.entries(traitValues).map(([trait, value]) => (
                <div key={trait}>
                  <div style={styles.label}>
                    <span>
                      {trait.charAt(0).toUpperCase() + trait.slice(1)}
                    </span>
                    <span>{value.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={value}
                    onChange={(e) =>
                      handleTraitChange(trait, parseFloat(e.target.value))
                    }
                    style={styles.slider}
                  />
                </div>
              ))}
            </div>
          )}
          <div style={styles.jsonDisplay}>
            <pre>{JSON.stringify(promptData, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeChatbotUI;
