// Footer.js
import React from "react";
import ToggleSwitch from "./ToggleSwitch"; // Import the ToggleSwitch component
import LocationList from "./LocationList";

const Footer = ({ isDarkMode, toggleTheme }) => {
  const footerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    padding: "40px 0",
    width: "100%",
  };
  const textStyles = {
    fontSize: "16px",
    color: isDarkMode ? "#b9bbbe" : "#40444b",
    textAlign: "center",
    transition: "color 0.3s",
    marginBottom: "20px",
    width: "90%", // Responsive width
    maxWidth: "700px", // Maximum width to avoid excessive stretching
    minWidth: "300px", // Minimum width for better readability
    boxSizing: "border-box", // Ensures padding is included in width
  };

  return (
    <>
      <LocationList isDarkMode={isDarkMode} />
      <div style={footerStyles}>
        {/* <p style={textStyles}>
        Welcome to Archetype Academy Nexus: Where Learning Meets Your Unique
        Personality |
        Where Learning Meets Your Unique Personality
      </p> */}
        <ToggleSwitch isDarkMode={isDarkMode} toggleTheme={toggleTheme} />{" "}
      </div>
    </>
  );
};

export default Footer;
