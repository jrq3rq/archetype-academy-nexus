// import React, { useState, useEffect } from "react";
// import { useLocation, useHistory } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "../App.css";
// import {
//   FaBars,
//   FaTimes,
//   FaUniversity,
//   FaRobot,
//   FaBookOpen,
//   FaGraduationCap,
//   FaTicketAlt,
// } from "react-icons/fa";

// const Header = ({ isDarkMode }) => {
//   const { user, signOut } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false); // New state for handling animation
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [showModal, setShowModal] = useState(false);
//   const location = useLocation();
//   const history = useHistory();

//   const toggleMenu = () => {
//     if (menuOpen) {
//       setIsAnimating(true); // Start slide-out animation
//       setTimeout(() => {
//         setMenuOpen(false); // Hide menu after animation completes
//         setIsAnimating(false);
//       }, 300); // Match the duration of the slide-out transition
//     } else {
//       setMenuOpen(true); // Open the menu instantly
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       if (window.innerWidth > 768) setMenuOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location]);

//   const handleLinkClick = (to, restricted) => {
//     if (restricted && !user) {
//       history.push("/signin");
//     } else {
//       history.push(to);
//       if (isMobile) toggleMenu(); // Close menu on navigation for mobile
//     }
//   };

//   const handleSignOut = () => {
//     signOut(); // Sign out the user, which will trigger LocationList to clear data
//     history.push("/signin"); // Redirect to signin page
//   };

//   // New function to handle the click on the sign-in/sign-out button
//   const handleAuthButtonClick = () => {
//     if (user) {
//       // Redirect to the protected dashboard for sign-out
//       history.push("/dashboard");
//     } else {
//       // Redirect to the sign-in page
//       history.push("/signin");
//     }
//   };

//   const links = [
//     {
//       to: "/",
//       label: "Home",
//       icon: <FaUniversity size="1.5rem" />,
//       restricted: false,
//     },
//     {
//       to: "/library",
//       label: "Library",
//       icon: <FaBookOpen size="1.5rem" />,
//       restricted: false,
//     },
//     {
//       to: "/assessment",
//       label: "Admissions",
//       icon: <FaGraduationCap size="1.5rem" />,
//       restricted: false,
//     },
//     {
//       to: "/chatbot",
//       label: "Chatbot",
//       icon: <FaRobot size="1.5rem" />,
//       restricted: true,
//     },
//     {
//       to: "/museum-assessment",
//       label: "Kiosk",
//       icon: <FaTicketAlt size="1.5rem" />,
//       restricted: true,
//     },
//   ];

//   const styles = {
//     header: {
//       backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000,
//       height: "60px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "0 20px",
//       borderBottom: `1px solid ${isDarkMode ? "#2E3136" : "#1F2124"}`,
//     },
//     nav: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       width: "100%",
//     },
//     linkContainer: {
//       display: isMobile ? "none" : "flex",
//       justifyContent: "space-around",
//       alignItems: "center",
//       width: "100%",
//       padding: "0px 10px",
//     },
//     link: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "5px",
//       color: isDarkMode ? "#ffffff" : "#40444b",
//       textDecoration: "none",
//       fontSize: "14px",
//       padding: "5px 10px",
//       borderRadius: "5px",
//       transition: "background-color 0.3s",
//       pointerEvents: "auto",
//       cursor: "pointer",
//     },
//     disabledLink: { pointerEvents: "none", opacity: 0.5 },
//     disabledMobileLink: { pointerEvents: "none", opacity: 0.5 }, // New style for mobile
//     mobileLink: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "10px",
//       color: isDarkMode ? "#ffffff" : "#40444b",
//       fontSize: "14px",
//       textDecoration: "none",
//       padding: "10px 20px",
//       borderRadius: "5px",
//       transition: "background-color 0.3s, border 0.3s",
//       width: "80%",
//       border: `1px solid transparent`,
//       cursor: "pointer",
//       marginBottom: "15px", // Added spacing between items in mobile view
//     },
//     activeLink: {
//       backgroundColor: isDarkMode ? "#40444b" : "#dcdcdc",
//       border: "1px solid #2E3136",
//     },
//     menuIcon: {
//       display: isMobile ? "flex" : "none",
//       fontSize: "24px",
//       color: isDarkMode ? "#F5F5F5" : "#40444b",
//       cursor: "pointer",
//       backgroundColor: "transparent",
//       border: "none",
//     },
//     mobileMenu: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       height: "100vh",
//       width: "100%",
//       backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       transform:
//         menuOpen || isAnimating ? "translateX(0)" : "translateX(-100%)",
//       transition: "transform 0.3s ease-in-out", // Smooth transition for open and close
//       zIndex: 999,
//     },
//     closeIcon: {
//       position: "absolute",
//       top: "50%", // Center vertically
//       right: "20px", // Position slightly inside from the right edge
//       transform: "translateY(-50%)", // Adjust for exact centering
//       fontSize: "24px",
//       color: isDarkMode ? "#ffffff" : "#40444b",
//       cursor: "pointer",
//       backgroundColor: "transparent",
//       border: "none",
//     },
//     authButtonContainer: {
//       position: "relative",
//       marginLeft: "auto",
//       display: "flex",
//       alignItems: "center",
//     },
//     authButton: {
//       backgroundColor: user ? "#45FE47" : "red",
//       color: "#ffffff",
//       padding: "20px 10px",
//       cursor: "pointer",
//       fontWeight: "bold",
//       borderRadius: "5px",
//       border: "1px solid #2E3136",
//     },
//     modal: {
//       display: showModal ? "flex" : "none",
//       position: "absolute",
//       top: "60px",
//       right: "0",
//       backgroundColor: "#ffffff",
//       borderRadius: "8px",
//       padding: "10px 15px",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
//       zIndex: 1000,
//       flexDirection: "column",
//       alignItems: "center",
//       textAlign: "center",
//       minWidth: "150px",
//     },
//     modalButtonsContainer: {
//       display: "flex",
//       gap: "10px",
//       marginTop: "10px",
//     },
//     modalButton: {
//       padding: "5px 10px",
//       borderRadius: "5px",
//       cursor: "pointer",
//       border: "1px solid #2E3136",
//       backgroundColor: "transparent",
//     },
//   };

//   return (
//     <header style={styles.header}>
//       <nav style={styles.nav}>
//         <button
//           style={styles.menuIcon}
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           <FaBars />
//         </button>
//         <div style={styles.linkContainer}>
//           {links.map((link) => (
//             <div
//               key={link.to}
//               onClick={() => handleLinkClick(link.to, link.restricted)}
//               style={{
//                 ...styles.link,
//                 ...(location.pathname === link.to ? styles.activeLink : {}),
//                 ...(link.restricted && !user ? styles.disabledLink : {}),
//               }}
//             >
//               {link.icon}
//               <span>{link.label}</span>
//             </div>
//           ))}
//         </div>
//         <div
//           onMouseEnter={() => user && setShowModal(true)}
//           onMouseLeave={() => setShowModal(false)}
//           style={styles.authButtonContainer}
//         >
//           <button
//             onClick={handleAuthButtonClick}
//             aria-label={user ? "Account Dashboard" : "Sign In"}
//             style={styles.authButton}
//           >
//             {/* {user ? "Go to Dashboard" : "Sign In"} */}
//           </button>
//         </div>
//       </nav>
//       {/* Mobile Menu */}
//       {(menuOpen || isAnimating) && (
//         <div style={styles.mobileMenu}>
//           <button
//             style={styles.closeIcon}
//             onClick={toggleMenu}
//             aria-label="Close menu"
//           >
//             <FaTimes />
//           </button>
//           {links.map((link) => (
//             <div
//               key={link.to}
//               onClick={() => handleLinkClick(link.to, link.restricted)}
//               style={{
//                 ...styles.mobileLink,
//                 ...(link.restricted && !user ? styles.disabledMobileLink : {}),
//               }}
//             >
//               {link.icon}
//               <span>{link.label}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import {
  FaUniversity,
  FaRobot,
  FaBookOpen,
  FaGraduationCap,
  FaTicketAlt,
  FaBars,
} from "react-icons/fa";

const Header = ({ isDarkMode }) => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const history = useHistory();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) setMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (to, restricted) => {
    if (restricted && !user) {
      history.push("/signin");
    } else {
      history.push(to);
      setMenuOpen(false); // Close sidebar on navigation
    }
  };

  const handleSignOut = () => {
    signOut();
    history.push("/signin");
  };

  const handleAuthButtonClick = () => {
    if (user) {
      history.push("/dashboard");
    } else {
      history.push("/signin");
    }
  };

  const links = [
    {
      to: "/",
      label: "Home",
      icon: <FaUniversity size="1.5rem" />,
      restricted: false,
    },
    {
      to: "/library",
      label: "Library",
      icon: <FaBookOpen size="1.5rem" />,
      restricted: false,
    },
    {
      to: "/assessment",
      label: "Admissions",
      icon: <FaGraduationCap size="1.5rem" />,
      restricted: false,
    },
    {
      to: "/chatbot",
      label: "Chatbot",
      icon: <FaRobot size="1.5rem" />,
      restricted: true,
    },
    {
      to: "/museum-assessment",
      label: "Kiosk",
      icon: <FaTicketAlt size="1.5rem" />,
      restricted: true,
    },
  ];

  const styles = {
    header: {
      backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      borderBottom: `1px solid ${isDarkMode ? "#2E3136" : "#1F2124"}`,
    },
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    linkContainer: {
      display: isMobile ? "none" : "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      padding: "0px 10px",
    },
    link: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      color: isDarkMode ? "#ffffff" : "#40444b",
      textDecoration: "none",
      fontSize: "14px",
      padding: "5px 10px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
      pointerEvents: "auto",
      cursor: "pointer",
    },
    disabledLink: { pointerEvents: "none", opacity: 0.5 },
    menuIcon: {
      display: isMobile ? "flex" : "none",
      fontSize: "24px",
      color: isDarkMode ? "#F5F5F5" : "#40444b",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
    },
    authButton: {
      backgroundColor: user ? "#45FE47" : "#FC4547",
      color: "#ffffff",
      padding: "10px 20px",
      cursor: "pointer",
      fontWeight: "bold",
      borderRadius: "5px",
      border: "1px solid #2E3136",
    },
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <button
          style={styles.menuIcon}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
        <div style={styles.linkContainer}>
          {links.map(({ to, label, restricted, icon }) => (
            <div
              key={to}
              onClick={() => handleLinkClick(to, restricted)}
              style={{
                ...styles.link,
                ...(restricted && !user ? styles.disabledLink : {}),
              }}
            >
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </div>
        {/* <button
          onClick={handleAuthButtonClick}
          aria-label={user ? "Account Dashboard" : "Sign In"}
          style={styles.authButton}
        >
          {user ? "Go to Dashboard" : "Sign In"}
        </button> */}
        <button
          onClick={handleAuthButtonClick}
          aria-label={user ? "Account Dashboard" : "Sign In"}
          style={{
            width: "20px", // Fixed width
            height: "40px", // Fixed height
            backgroundColor: user ? "#45FC47" : "#FC4547", // Green if signed in, red otherwise
            borderRadius: "4px", // Rounded corners
            cursor: "pointer", // Add pointer cursor for better UX
            border: "1px solid #2e3136",
            // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional subtle shadow for depth
          }}
        ></button>
      </nav>
      {/* Sidebar Component */}
      <Sidebar
        isDarkMode={isDarkMode} // Pass the isDarkMode prop here
        isOpen={menuOpen}
        toggleSidebar={() => setMenuOpen(false)}
        direction="left"
        speed={300}
      >
        {links.map(({ to, label, restricted, icon }) => (
          <div
            key={to}
            onClick={() => handleLinkClick(to, restricted)}
            style={{
              ...styles.link,
              ...(restricted && !user ? styles.disabledLink : {}),
              marginBottom: "15px", // Add spacing for mobile view
            }}
          >
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </Sidebar>
    </header>
  );
};

export default Header;
