import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaBookOpen, FaGraduationCap } from "react-icons/fa";

const MagazineLayout = ({ isDarkMode }) => {
  const styles = {
    container: {
      backgroundColor: isDarkMode ? "#1e2124" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    articleCard: {
      backgroundColor: isDarkMode ? "#2f3136" : "#f9f9f9",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    articleCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    },
    articleTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    articleContent: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: isDarkMode ? "#b9bbbe" : "#333333",
      textAlign: "justify",
    },
    iconStyle: {
      fontSize: "2rem",
      marginBottom: "10px",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    ctaButton: {
      display: "inline-block",
      backgroundColor: isDarkMode ? "#ffffff" : "#2f3136",
      color: isDarkMode ? "#000000" : "#ffffff",
      padding: "10px 20px",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "14px",
      marginTop: "15px",
      transition: "background-color 0.3s ease",
    },
    ctaButtonHover: {
      backgroundColor: "#5a6eaf",
    },
  };

  // Sample articles data
  const articles = [
    {
      title: "Archedéx Chatbot Interface",
      content:
        "Interact with Archedéx, your AI-powered chatbot guide. Navigate through personalized insights and engage in meaningful conversations.",
      icon: <FaRobot style={styles.iconStyle} />,
      link: "/chatbot",
      linkText: "Chat with Archedéx",
    },
    {
      title: "Archetype Library",
      content:
        "Explore the comprehensive library of archetypes. Dive into their characteristics, strengths, and how they influence your life.",
      icon: <FaBookOpen style={styles.iconStyle} />,
      link: "/library",
      linkText: "Explore the Library",
    },
    {
      title: "Admissions Assessment: MindPulse 150",
      content:
        "Gain access to the Archetype Academy through the MindPulse 150 personality questionnaire, designed to assess your unique Big Five attributes.",
      icon: <FaGraduationCap style={styles.iconStyle} />,
      link: "/assessment",
      linkText: "Begin Your Admissions Journey",
    },
    {
      title: "Design Your AI Companion",
      content:
        "Create and customize your own AI companion. Design everything from appearance to behavior, making it a true reflection of your unique archetype.",
    },
    {
      title: "Community Features",
      content:
        "Connect with others who share your archetype and engage in discussions. Explore shared experiences, exchange insights, and grow together.",
    },
    {
      title: "Track Your Progress",
      content:
        "Monitor your personal growth with our archetype progress tracker. See how your traits evolve over time and gain deeper insights.",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        {articles.map((article, index) => (
          <div
            style={styles.articleCard}
            key={index}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                styles.articleCardHover.transform;
              e.currentTarget.style.boxShadow =
                styles.articleCardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = styles.articleCard.boxShadow;
            }}
          >
            {article.icon && article.icon}
            <h2 style={styles.articleTitle}>{article.title}</h2>
            <p style={styles.articleContent}>{article.content}</p>
            {article.link && (
              <Link
                to={article.link}
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    styles.ctaButtonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    styles.ctaButton.backgroundColor;
                }}
              >
                {article.linkText}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagazineLayout;
