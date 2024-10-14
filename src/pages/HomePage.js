import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaBookOpen, FaGraduationCap } from "react-icons/fa"; // Import icons here
import Footer from "../components/Footer";
import MagazineLayout from "../components/MagazineLayout";
import BackgroundImageComponent from "../components/BackgroundImageComponent";
import HomeSection from "../components/HomeSection";
import SectionSeparator from "../components/SectionSeparator";

const HomePage = ({ isDarkMode, toggleTheme }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: isDarkMode ? "#1e2124" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
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
      backgroundColor: isDarkMode ? "#2f3136" : "#f0f0f0",
      borderRadius: "12px",
      padding: "40px",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      position: "relative",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      marginBottom: "20px",
      border: "1px solid #2E3136",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
      },
      "@media (max-width: 768px)": {
        width: "90%",
        maxWidth: "90%",
      },
    },
    featureCard2: {
      backgroundColor: isDarkMode ? "#2f3136" : "#f0f0f0",
      borderRadius: "12px",
      padding: "40px",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      position: "relative",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      marginBottom: "20px",
      border: "1px solid #2E3136",
      display: "flex", // Added for flexbox layout
      flexDirection: "column", // Arrange children in a column
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      height: "250px", // Set a fixed height for consistent spacing (adjust as needed)
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
      color: isDarkMode ? "#ffffff" : "#000000",
      "@media (max-width: 768px)": {
        fontSize: "22px",
      },
    },
    featureDescription: {
      fontSize: "16px",
      color: isDarkMode ? "#b9bbbe" : "#000000",
      marginBottom: "25px",
      lineHeight: "1.6",
      textAlign: "left", // Align text to the left
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
      backgroundColor: isDarkMode ? "#ffffff" : "#2f3136",
      color: isDarkMode ? "#000000" : "#ffffff",
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
      pointerEvents: "none",
      backdropFilter: "blur(5px) brightness(0.9)",
      WebkitBackdropFilter: "blur(5px) brightness(0.9)",
      borderRadius: "12px",
      background: "rgba(0, 0, 0, 0.3)",
    },
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
    iconStyle: {
      display: "block",
      margin: "0 auto 10px",
      fontSize: "3rem", // Set icon size to be larger
    },
  };

  return (
    <>
      <HomeSection isDarkMode={isDarkMode} />
      <SectionSeparator isDarkMode={isDarkMode} angle={0} />
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <div style={styles.featuresContainer}>
            {/* First card with icon */}
            <div style={styles.featureCard}>
              <FaBookOpen style={styles.iconStyle} />{" "}
              {/* Icon for the library */}
              <h2 style={styles.featureTitle}>Character Library</h2>
              <p style={styles.featureDescription}>
                Explore the comprehensive library of archetypes. Dive into their
                characteristics, strengths, and how they influence your life.
              </p>
              <Link to="/library" style={styles.ctaButton}>
                Explore the Library
              </Link>
            </div>
            {/* Second card with icon */}
            <div style={styles.featureCard}>
              <FaRobot style={styles.iconStyle} /> {/* Icon for the chatbot */}
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
            {/* Third card with icon */}
            <div style={styles.featureCard}>
              <FaGraduationCap style={styles.iconStyle} />{" "}
              {/* Icon for the assessment */}
              <h2 style={styles.featureTitle}>
                Admissions Assessment: MindPulse 150
              </h2>
              <p style={styles.featureDescription}>
                Gain access to the Archetype Academy through the MindPulse 150
                personality questionnaire, designed to assess your unique Big
                Five attributes. This assessment serves as your admissions ID,
                guiding you towards personalized character development programs
                that will shape your journey.
              </p>
              <Link to="/assessment" style={styles.ctaButton}>
                Begin Your Admissions Journey
              </Link>
            </div>

            {/* Fourth card without icon */}
            <div style={styles.featureCard2}>
              <div style={styles.xOverlay}>
                <div style={styles.xLine}></div>
                <div style={styles.xLine2}></div>
              </div>
              <h2 style={styles.featureTitle}>Design Your AI Companion</h2>
              <p style={styles.featureDescription2}>
                Create and customize your own AI companion. Design everything
                from appearance to behavior, making it a true reflection of your
                unique archetype.
              </p>
            </div>

            {/* Fifth card without icon */}
            <div style={styles.featureCard2}>
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

            {/* Sixth card without icon */}
            <div style={styles.featureCard2}>
              <div style={styles.xOverlay}>
                <div style={styles.xLine}></div>
                <div style={styles.xLine2}></div>
              </div>
              <h2 style={styles.featureTitle}>Track Your Progress</h2>
              <p style={styles.featureDescription2}>
                Monitor your personal growth with our archetype progress
                tracker. See how your traits evolve over time and gain deeper
                insights into how your archetypes develop through your journey.
              </p>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
      <BackgroundImageComponent />
    </>
  );
};

export default HomePage;
