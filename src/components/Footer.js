import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      fontSize: "18px",
      textAlign: "center",
      color: "#b9bbbe",
      marginTop: "auto",
      padding: "20px 0", // Reduced padding to create space between the line and the text
      borderTop: "1px solid #40444b",
      marginBottom: "20px", // Add margin-bottom to create space below the line
      width: "100%",
      "@media (max-width: 768px)": {
        fontSize: "16px",
        padding: "20px 0",
      },
    },
  };

  return (
    <p style={styles.footer}>
      Welcome to Archetype Academy Nexus: Where Learning Meets Your Unique
      Personality
    </p>
  );
};

export default Footer;
