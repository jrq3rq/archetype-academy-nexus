import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
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

  const styles = {
    header: {
      backgroundColor: "#2f3136",
      padding: "15px 20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxSizing: "border-box",
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
      width: "30px", // Adjust the width of the logo to your preference
      height: "30px", // Keep the aspect ratio intact
    },
    linkContainer: {
      display: isMobile ? "none" : "flex",
      gap: "20px",
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "16px",
      padding: "5px 10px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    activeLink: {
      backgroundColor: "#40444b",
    },
    menuIcon: {
      display: isMobile ? "block" : "none",
      fontSize: "24px",
      color: "#ffffff",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
    },
    mobileMenu: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100%",
      backgroundColor: "#2f3136",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s ease-in-out",
    },
    closeIcon: {
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "24px",
      color: "#ffffff",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
    },
    mobileLink: {
      color: "#ffffff",
      fontSize: "24px",
      textDecoration: "none",
      marginBottom: "20px",
    },
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/chatbot", label: "Chatbot" },
    { to: "/library", label: "Library" },
    { to: "/assessment", label: "Assessment" },
    // { to: "/profile", label: "User Profile" },
  ];

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          <img
            src="/logo1.png"
            alt="Archetype Academy Nexus Logo"
            style={styles.logoImage}
          />
        </Link>
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
              {link.label}
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

      {isMobile && (
        <div
          style={{ ...styles.mobileMenu, display: menuOpen ? "flex" : "none" }}
        >
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
