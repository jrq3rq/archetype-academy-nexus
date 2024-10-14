import React from "react";
import AcademyARVR from "../images/AcademyARVR.png"; // Adjust the path based on your folder structure

const BackgroundImageComponent = () => {
  const styles = {
    container: {
      minHeight: "300px", // Standard banner/card height
      height: "40vh", // Responsive height (40% of the viewport)
      backgroundImage: `url(${AcademyARVR})`, // Set the background image using the imported image
      backgroundSize: "cover", // Ensures the image scales to cover the entire area
      backgroundPosition: "center", // Static background position (no scrolling effect)
      backgroundRepeat: "no-repeat", // Prevents repeating the image
      width: "100%", // Full width of the container
      //   borderRadius: "10px", // Adds border-radius to the card for rounded corners
      overflow: "hidden", // Ensures no content/image overflows beyond the rounded corners
      //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow to the card for a lifted effect
      borderTop: "none", // Keep top border
      borderLeft: "1px solid #2E3136", // Keep left border
      borderRight: "1px solid #2E3136", // Keep right border
      borderBottom: "1px solid #2E3136", // Remove bottom border
      marginBottom: "40px", //
    },
  };

  return <div style={styles.container}></div>;
};

export default BackgroundImageComponent;
