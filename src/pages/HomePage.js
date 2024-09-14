import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
      position: "relative", // To position the X and overlay
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      marginBottom: "20px",
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
    featureDescription2: {
      fontSize: "18px",
      color: "#b9bbbe",
      lineHeight: "1.6",
      "@media (max-width: 768px)": {
        fontSize: "16px",
      },
    },
    ctaButton: {
      display: "inline-block",
      backgroundColor: "#ffffff",
      color: "#2f3136",
      padding: "14px 28px",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "16px",
      textAlign: "center",
      transition: "background-color 0.3s ease",
      width: "80%",
      "&:hover": {
        backgroundColor: "#5a6eaf",
      },
      "@media (max-width: 768px)": {
        fontSize: "14px",
        padding: "12px 24px",
      },
    },
    xOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      pointerEvents: "none", // Ensure interaction with the card content
      backdropFilter: "blur(5px) brightness(0.9)", // Adds blur and darkens the background
      WebkitBackdropFilter: "blur(5px) brightness(0.9)", // Vendor-prefixed for Safari
      borderRadius: "12px",
      background: "rgba(0, 0, 0, 0.3)", // Fallback for unsupported browsers
    },
    // xLine: {
    //   position: "absolute",
    //   width: "70%", // Ensure the "X" spans the whole card diagonally
    //   height: "5px", // Thickness of the line
    //   backgroundColor: "rgba(255, 0, 0, 0.8)", // Red color
    //   top: "50%",
    //   left: "50%",
    //   transform: "translate(-50%, -50%) rotate(45deg)", // Diagonal line
    // },
    // xLine2: {
    //   position: "absolute",
    //   width: "70%", // Ensures the second line spans the card diagonally
    //   height: "5px", // Thickness of the line
    //   backgroundColor: "rgba(255, 0, 0, 0.8)", // Red color
    //   top: "50%",
    //   left: "50%",
    //   transform: "translate(-50%, -50%) rotate(-45deg)", // Opposite diagonal line
    // },
    footer: {
      fontSize: "18px",
      textAlign: "center",
      color: "#b9bbbe",
      marginTop: "auto",
      padding: "20px 0",
      borderTop: "1px solid #40444b",
      marginBottom: "20px",
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
          <div style={styles.featureCard}>
            <h2 style={styles.featureTitle}>Advanced Archetype Matching</h2>
            <p style={styles.featureDescription}>
              Experience our enhanced MindPulse personality test with deep
              analytics, offering accurate archetype matching tailored to your
              unique traits.
            </p>
            <Link to="/assessment" style={styles.ctaButton}>
              Explore MindPulse-150
            </Link>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.xOverlay}>
              <div style={styles.xLine}></div>
              <div style={styles.xLine2}></div>
            </div>
            <h2 style={styles.featureTitle}>Design Your AI Companion</h2>
            <p style={styles.featureDescription2}>
              Create and customize your own AI companion. Design everything from
              appearance to behavior, making it a true reflection of your unique
              archetype.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.xOverlay}>
              <div style={styles.xLine}></div>
              <div style={styles.xLine2}></div>
            </div>
            <h2 style={styles.featureTitle}>Community Features</h2>
            <p style={styles.featureDescription2}>
              Connect with others who share your archetype and engage in
              discussions. Explore shared experiences, exchange insights, and
              grow together in our vibrant community of archetype enthusiasts.
            </p>
          </div>

          {/* Card with "X" Overlay */}
          <div style={styles.featureCard}>
            <div style={styles.xOverlay}>
              <div style={styles.xLine}></div>
              <div style={styles.xLine2}></div>
            </div>
            <h2 style={styles.featureTitle}>Track Your Progress</h2>
            <p style={styles.featureDescription2}>
              Monitor your personal growth with our archetype progress tracker.
              See how your traits evolve over time and gain deeper insights into
              how your archetypes develop through your journey.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
