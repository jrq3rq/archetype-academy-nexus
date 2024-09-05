import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#1e2124",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      padding: "0 20px",
      boxSizing: "border-box",
    },
    contentWrapper: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "1200px",
      margin: "0 auto",
      paddingTop: "40px",
      width: "100%",
    },
    header: {
      fontSize: "54px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: "#7289da",
      letterSpacing: "1.5px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      "@media (max-width: 768px)": {
        fontSize: "36px",
      },
    },
    subheader: {
      fontSize: "22px",
      marginBottom: "80px",
      textAlign: "center",
      color: "#b9bbbe",
      maxWidth: "700px",
      lineHeight: "1.8",
      "@media (max-width: 768px)": {
        fontSize: "18px",
        marginBottom: "40px",
      },
    },
    featuresContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      margin: "20px 0",
      width: "100%",
      "@media (max-width: 768px)": {
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
      },
    },
    featureCard: {
      backgroundColor: "#2f3136",
      borderRadius: "12px",
      padding: "40px",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      marginBottom: "40px", // Add margin-bottom to create space below the card
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
      },
      "@media (max-width: 768px)": {
        width: "90%",
        maxWidth: "90%",
      },
    },
    featureTitle: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#ffffff",
      "@media (max-width: 768px)": {
        fontSize: "22px",
      },
    },
    featureDescription: {
      fontSize: "18px",
      color: "#b9bbbe",
      marginBottom: "25px",
      lineHeight: "1.6",
      "@media (max-width: 768px)": {
        fontSize: "16px",
      },
    },
    ctaButton: {
      display: "inline-block",
      backgroundColor: "#7289da",
      color: "#ffffff",
      padding: "14px 28px",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "16px",
      textAlign: "center",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#5a6eaf",
      },
      "@media (max-width: 768px)": {
        fontSize: "14px",
        padding: "12px 24px",
      },
    },
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
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.featuresContainer}>
          <div style={styles.featureCard}>
            <h2 style={styles.featureTitle}>Archedéx Chatbot Interface</h2>
            <p style={styles.featureDescription}>
              Interact with Archedéx, your AI-powered chatbot guide. Navigate
              through personalized insights and engage in meaningful
              conversations.
            </p>
            <Link to="/chatbot" style={styles.ctaButton}>
              Chat with Archedéx
            </Link>
          </div>

          <div style={styles.featureCard}>
            <h2 style={styles.featureTitle}>Archetype Library</h2>
            <p style={styles.featureDescription}>
              Explore the comprehensive library of archetypes. Dive into their
              characteristics, strengths, and how they influence your life.
            </p>
            <Link to="/library" style={styles.ctaButton}>
              Explore the Library
            </Link>
          </div>
          {/* <div style={styles.featureCard}>
            <h2 style={styles.featureTitle}>Advanced Archetype Matching</h2>
            <p style={styles.featureDescription}>
              Experience our enhanced MindPulse personality test with deep
              analytics, offering accurate archetype matching tailored to your
              unique traits.
            </p>
            <Link to="/archetype-matching" style={styles.ctaButton}>
              Discover Your Archetype
            </Link>
          </div>

          <div style={styles.featureCard}>
            <h2 style={styles.featureTitle}>Design Your AI Companion</h2>
            <p style={styles.featureDescription}>
              Create and customize your own AI companion. Design everything from
              appearance to behavior, making it a true reflection of your unique
              archetype.
            </p>
            <Link to="/character-creation" style={styles.ctaButton}>
              Meet Your AI Companion
            </Link>
          </div> */}
        </div>

        <p style={styles.footer}>
          Welcome to Archetype Academy Nexus: Where Learning Meets Your Unique
          Personality
        </p>
      </div>
    </div>
  );
};

export default HomePage;
