// Footer.js
import React from "react";
import ToggleSwitch from "./ToggleSwitch"; // Import the ToggleSwitch component

const Footer = ({ isDarkMode, toggleTheme }) => {
  const footerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    padding: "20px 0",
    width: "100%",
    backgroundColor: isDarkMode ? "#1e2124" : "#f5f5f5", // Adjust footer background based on theme
    borderTop: isDarkMode ? "1px solid #40444b" : "1px solid #ccc", // Border color based on theme
  };

  const textStyles = {
    fontSize: "18px",
    color: isDarkMode ? "#b9bbbe" : "#40444b",
    textAlign: "center",
    transition: "color 0.3s",
    marginBottom: "20px",
  };

  return (
    <div style={footerStyles}>
      <p style={textStyles}>
        Welcome to Archetype Academy Nexus: Where Learning Meets Your Unique
        Personality
      </p>
      <ToggleSwitch isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Footer;
