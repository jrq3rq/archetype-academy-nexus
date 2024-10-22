import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUniversity,
  FaRobot,
  FaBookOpen,
  FaBook,
  FaClipboardCheck,
  FaGraduationCap,
  FaTicketAlt,
} from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { MdLibraryAdd, MdAssessment } from "react-icons/md";
import { MdChatBubbleOutline, MdLibraryBooks } from "react-icons/md";
import { IoBulbOutline } from "react-icons/io5";
import { borderRadius, padding } from "polished";

const Header = ({ isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    {
      to: "/",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <FaUniversity size="2rem" style={{ marginLeft: "10px" }} />
        </span>
      ),
      icon: <FaUniversity size="1.5rem" />,
    },
    {
      to: "/library",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          Library
          <FaBookOpen size="2rem" style={{ marginLeft: "10px" }} />
        </span>
      ),
      icon: <FaBookOpen size="1.5rem" />,
    },
    {
      to: "/chatbot",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          Chatbot
          <FaRobot size="2rem" style={{ marginLeft: "10px" }} />
        </span>
      ),
      icon: <FaRobot size="1.5rem" />,
    },
    {
      to: "/assessment",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          Admissions
          <FaGraduationCap size="2rem" style={{ marginLeft: "10px" }} />
        </span>
      ),
      icon: <FaGraduationCap size="1.5rem" />,
    },
    {
      to: "/museum-assessment",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          Kiosk
          <FaTicketAlt size="2rem" style={{ marginLeft: "10px" }} />
        </span>
      ),
      icon: <FaTicketAlt size="1.5rem" />,
    },
  ];

  const styles = {
    header: {
      backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
      // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxSizing: "border-box",
      borderBottom: `1px solid ${isDarkMode ? "#2E3136" : "#1F2124"}`,
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      display: "flex",
      alignItems: "center",
    },
    logoImage: {
      width: "40px",
      height: "40px",
    },
    linkContainer: {
      display: isMobile ? "none" : "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "10px 20px",
    },
    link: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: isDarkMode ? "#ffffff" : "#40444b",
      textDecoration: "none",
      fontSize: "16px",
      padding: "5px 10px",
      borderTopLeftRadius: "5px", // Only round the bottom-left corner
      borderTopRightRadius: "5px", // Only round the bottom-right corner
      borderBottomRightRadius: "5px", // Only round the bottom-left corner
      borderBottomLeftRadius: "5px", // Only round the bottom-left corner
      margin: "0 5px",
      width: "100%",
      transition: "background-color 0.3s",
    },
    activeLink: {
      backgroundColor: isDarkMode ? "#40444b" : "#dcdcdc",
      border: "1px solid #2E3136",
    },
    mobileMenu: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100%",
      backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s ease-in-out",
      // boxShadow: isDarkMode
      //   ? "0px 2px 10px rgba(0,0,0,0.5)"
      //   : "0px 2px 10px rgba(0,0,0,0.1)",
      zIndex: 999,
      // borderRight: "40px solid #2E3136",
      borderRight: `1px solid ${isDarkMode ? "#dcdcdc" : "#1F2124"}`,
    },
    menuIcon: {
      display: isMobile ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
      color: isDarkMode ? "#F5F5F5" : "#40444b",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      margin: "18px",
      width: "40px",
      borderRadius: "4px",
    },
    closeIcon: {
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "24px",
      color: isDarkMode ? "#ffffff" : "#40444b",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
    },
    mobileLink: {
      color: isDarkMode ? "#ffffff" : "#40444b",
      fontSize: "24px",
      textDecoration: "none",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 20px",
      borderRadius: "5px",
      transition: "background-color 0.3s, border 0.3s",
      width: "80%",
      border: `1px solid transparent`,
    },
    stylisticLine: {
      backgroundColor: isDarkMode ? "#B8BBBE" : "#2E3136",
      width: "100%",
      height: "4px",
    },
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* <Link to="/" style={styles.logo}>
          <img
            src={isDarkMode ? "/logo1.png" : "/logo2.png"}
            alt="Archetype Academy Nexus Logo"
            style={styles.logoImage}
          />
        </Link> */}
        <div style={styles.linkContainer}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...styles.link,
                ...(location.pathname === link.to ? styles.activeLink : {}),
              }}
            >
              {!isMobile && (
                <span style={{ marginRight: "5px" }}>{link.icon}</span>
              )}
            </Link>
          ))}
        </div>
        <button
          style={styles.menuIcon}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
      </nav>
      {/* <div style={styles.stylisticLine} /> */}
      {isMobile && (
        <div style={styles.mobileMenu}>
          <button
            style={styles.closeIcon}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={styles.mobileLink}
              onClick={toggleMenu}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "#40444b"
                  : "#dcdcdc"; // Change background color on hover
                e.currentTarget.style.border = "1px solid #2E3136"; // Show border on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ""; // Reset background color
                e.currentTarget.style.border = "1px solid transparent"; // Reset border
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
