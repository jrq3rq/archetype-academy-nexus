import { borderRadius } from "polished";
import React from "react";

// SectionSeparator component with an optional angle prop
const SectionSeparator = ({ isDarkMode, angle = 0 }) => {
  const separatorStyle = {
    width: "50%",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: isDarkMode ? "#2E3136" : "#F0F0F0",
    margin: "0 auto",
    transform: `rotate(${angle}deg)`, // Use the angle prop to rotate the separator
    transformOrigin: "center", // Ensures it rotates around the center
    border: "1px solid #2E3136",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  return <div style={separatorStyle}></div>;
};

export default SectionSeparator;
