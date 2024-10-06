// ColorCyclingContainer.js
import React, { useState, useEffect } from "react";

const ColorCyclingContainer = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFB533"];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000); // Change color every second

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [colors.length]);

  const containerStyles = {
    backgroundColor: colors[currentColorIndex],
    color: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    transition: "background-color 0.5s ease",
    margin: "20px 0", // Optional margin for spacing
  };

  return (
    <div style={containerStyles}>
      <h2>Color Cycling Container</h2>
      <p>This container's background color changes every second!</p>
    </div>
  );
};

export default ColorCyclingContainer;
