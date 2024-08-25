import React, { useState, useEffect, useRef } from "react";

// Simulating environment variable
const BASE_URL = process.env.REACT_APP_ARCHETYPES_API_URL;

const getAllArchetypes = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
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
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
};

const ArchetypeChatbotUI = () => {
  const [message, setMessage] = useState("");
  const [showArchetypeSelector, setShowArchetypeSelector] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorySelections, setCategorySelections] = useState({
    coreTraits: "",
    motivationsAndGoals: "",
    abilitiesAndSkills: "",
    talentsAndExpertise: "",
  });
  const [traitValues, setTraitValues] = useState({
    intelligence: 0.8,
    creativity: 0.9,
    EQ: 0.7,
    motivation: 0.8,
    confidence: 0.9,
    empathy: 0.6,
  });
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "Chatbot",
      content: "Welcome! Please select an archetype to begin.",
    },
  ]);
  const [archetypes, setArchetypes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#282b30");
  const [archetypeData, setArchetypeData] = useState({});
  const chatWindowRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllArchetypes();
      setArchetypes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedArchetype) {
      const archetype = archetypes.find(
        (a) => a.name.toLowerCase() === selectedArchetype.toLowerCase()
      );
      if (archetype) {
        setTraitValues(archetype.characteristics);
        setSelectedColor(archetype.color);
        setArchetypeData({
          motto: archetype.motto,
          mission: archetype.mission,
          scores: archetype.scores,
          traits: archetype.traits,
          motivations: archetype.motivations,
          behaviors: archetype.behaviors,
          interests: archetype.interests,
        });
      }
    }
  }, [selectedArchetype, archetypes]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
    if (message.trim() && selectedArchetype) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "User", content: message },
      ]);
      setMessage("");
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: selectedArchetype,
            content: `As a ${selectedArchetype}, I would approach this task by...`,
          },
        ]);
      }, 1000);
    }
  };

  const promptData = {
    archetype: selectedArchetype,
    traits: categorySelections,
    characteristics: traitValues,
    message: message,
    motto: archetypeData.motto,
    mission: archetypeData.mission,
    scores: archetypeData.scores,
    traitsData: archetypeData.traits,
    motivations: archetypeData.motivations,
    behaviors: archetypeData.behaviors,
    interests: archetypeData.interests,
  };

  const styles = {
    desktopContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#1e2124",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
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
      backgroundColor: "#1e2124",
      color: "#ffffff",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "100%",
      margin: "0 auto",
    },
    chatWindow: {
      backgroundColor: selectedColor,
      color: getTextColor(selectedColor),
      borderRadius: "5px",
      padding: "15px",
      marginBottom: "20px",
      height: "300px",
      overflowY: "auto",
      boxSizing: "border-box",
    },
    message: {
      backgroundColor: "#36393f",
      color: "#ffffff",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    },
    input: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#40444b",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      marginBottom: "10px",
      resize: "vertical",
      boxSizing: "border-box",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#7289da",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginRight: "10px",
      width: "100%",
      marginTop: "10px",
    },
    sendButton: {
      padding: "10px 20px",
      backgroundColor: "#f0883e",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
      transition: "background-color 0.3s",
    },
    archetypeSelector: {
      backgroundColor: "#2f3136",
      padding: "15px",
      borderRadius: "5px",
      marginTop: "10px",
      width: "100%",
      boxSizing: "border-box",
    },
    dropdown: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      backgroundColor: "#40444b",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "calc(100% - 10px) center",
      paddingRight: "30px",
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
      backgroundColor: selectedColor,
      color: getTextColor(selectedColor),
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    activeButton: {
      backgroundColor: "#7289da",
    },
    selectedButton: {
      backgroundColor: selectedColor,
    },
    label: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
    },
    slider: {
      width: "100%",
      marginBottom: "15px",
      accentColor: "#7289da",
    },
    jsonDisplay: {
      backgroundColor: "#2f3136",
      color: "#ffffff",
      borderRadius: "5px",
      padding: "15px",
      marginTop: "20px",
      fontFamily: "monospace",
      maxHeight: "200px",
      overflowY: "auto",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all", // Add this line to allow long lines to break
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
      <div style={styles.chatWindow} ref={chatWindowRef}>
        {chatMessages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <select
        style={styles.dropdown}
        value={selectedArchetype}
        onChange={(e) => setSelectedArchetype(e.target.value)}
      >
        <option value="">Select an archetype</option>
        {archetypes.map((archetype) => (
          <option key={archetype.id} value={archetype.name}>
            {archetype.name}
          </option>
        ))}
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

      {showArchetypeSelector && (
        <div style={styles.archetypeSelector}>
          <h3>Fine-tune traits for {selectedArchetype}:</h3>
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
                style={styles.slider}
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
          value={selectedArchetype}
          onChange={(e) => setSelectedArchetype(e.target.value)}
        >
          <option value="">Select an archetype</option>
          {archetypes.map((archetype) => (
            <option key={archetype.id} value={archetype.name}>
              {archetype.name}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.desktopMainContent}>
        <div style={styles.desktopChatSection}>
          <div style={styles.chatWindow} ref={chatWindowRef}>
            {chatMessages.map((msg, index) => (
              <div key={index} style={styles.message}>
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
          {showArchetypeSelector && (
            <div style={styles.archetypeSelector}>
              <h3>Fine-tune traits for {selectedArchetype}:</h3>
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
