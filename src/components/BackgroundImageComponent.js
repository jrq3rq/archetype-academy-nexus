import React from "react";
import IMG_7839 from "../images/IMG_7839.png"; // Adjust the path based on your folder structure

const BackgroundImageComponent = () => {
  const styles = {
    container: {
      minHeight: "300px", // Standard banner/card height
      height: "40vh", // Responsive height (40% of the viewport)
      backgroundImage: `url(${IMG_7839})`, // Set the background image using the imported image
      backgroundSize: "cover", // Ensures the image scales to cover the entire area
      backgroundPosition: "center", // Static background position (no scrolling effect)
      backgroundRepeat: "no-repeat", // Prevents repeating the image
      width: "100%", // Full width of the container
      overflow: "hidden", // Ensures no content/image overflows
      borderTop: "none",
      borderLeft: "1px solid #2E3136",
      borderRight: "1px solid #2E3136",
      borderBottom: "1px solid #2E3136",
      marginBottom: "40px",

      display: "flex", // Flexbox for centering
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
    },
    textContainer: {
      display: "flex",
      flexDirection: "column", // Stack text vertically
      alignItems: "center", // Center text horizontally
      justifyContent: "center", // Center text vertically
    },
    header: {
      color: "#ffffff", // White text color for visibility over the image
      fontSize: "1.5rem", // Adjust the text size as needed
      textTransform: "uppercase",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Optional: Add shadow to make text stand out over the image
      margin: "5px 0px -5px 0px", // Optional: Add some spacing between the text lines
      letterSpacing: "10px",
    },
    subHeader: {
      color: "#ffffff", // White text color for visibility over the image
      fontSize: "1rem", // Adjust the text size as needed
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Optional: Add shadow to make text stand out over the image
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <div style={styles.header}>VR Campus</div>
        <div style={styles.subHeader}>Coming soon!</div>
      </div>
    </div>
  );
};

export default BackgroundImageComponent;
