// import React, { useState, useEffect, useContext } from "react";
// import { Link, useLocation, useHistory } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaUniversity,
//   FaRobot,
//   FaBookOpen,
//   FaGraduationCap,
//   FaTicketAlt,
// } from "react-icons/fa";
// import AuthContext from "../context/AuthContext";

// const Header = ({ isDarkMode }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const location = useLocation();
//   const history = useHistory();
//   const { isAuthenticated } = useContext(AuthContext);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

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

//   const handleLinkClick = (to, restricted) => {
//     if (restricted && !isAuthenticated) {
//       history.push("/signin");
//     } else {
//       history.push(to);
//     }
//   };

//   const styles = {
//     header: {
//       backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000,
//       borderBottom: `1px solid ${isDarkMode ? "#2E3136" : "#1F2124"}`,
//     },
//     nav: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     linkContainer: {
//       display: isMobile ? "none" : "flex",
//       justifyContent: "space-between",
//       width: "100%",
//       padding: "10px 20px",
//     },
//     link: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "5px",
//       color: isDarkMode ? "#ffffff" : "#40444b",
//       textDecoration: "none",
//       fontSize: "14px", // Adjusted font size for desktop
//       padding: "10px 10px",
//       borderRadius: "5px",
//       margin: "0 5px",
//       width: "100%",
//       transition: "background-color 0.3s",
//       pointerEvents: "auto",
//       opacity: 1,
//       cursor: "pointer",
//     },
//     disabledLink: {
//       pointerEvents: "auto",
//       opacity: 0.5,
//     },
//     activeLink: {
//       backgroundColor: isDarkMode ? "#40444b" : "#dcdcdc",
//       border: "1px solid #2E3136",
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
//       transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
//       transition: "transform 0.3s ease-in-out",
//       zIndex: 999,
//       borderRight: `1px solid ${isDarkMode ? "#dcdcdc" : "#1F2124"}`,
//     },
//     menuIcon: {
//       display: isMobile ? "flex" : "none",
//       justifyContent: "center",
//       alignItems: "center",
//       fontSize: "24px",
//       color: isDarkMode ? "#F5F5F5" : "#40444b",
//       cursor: "pointer",
//       backgroundColor: "transparent",
//       border: "none",
//       padding: "21px 10px 21px 10px",
//       width: "40px",
//       borderRadius: "4px",
//     },
//     closeIcon: {
//       position: "absolute",
//       top: "20px",
//       right: "20px",
//       fontSize: "24px",
//       color: isDarkMode ? "#ffffff" : "#40444b",
//       cursor: "pointer",
//       backgroundColor: "transparent",
//       border: "none",
//     },
//     mobileLink: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "10px",
//       color: isDarkMode ? "#ffffff" : "#40444b",
//       fontSize: "14px", // Adjusted font size for mobile menu
//       textDecoration: "none",
//       marginBottom: "20px",
//       padding: "10px 20px",
//       borderRadius: "5px",
//       transition: "background-color 0.3s, border 0.3s",
//       width: "80%",
//       border: `1px solid transparent`,
//       cursor: "pointer",
//     },
//   };

//   return (
//     <header style={styles.header}>
//       <nav style={styles.nav}>
//         <div style={styles.linkContainer}>
//           {links.map((link) => (
//             <div
//               key={link.to}
//               onClick={() => handleLinkClick(link.to, link.restricted)}
//               style={{
//                 ...styles.link,
//                 ...(location.pathname === link.to ? styles.activeLink : {}),
//                 ...(link.restricted && !isAuthenticated
//                   ? styles.disabledLink
//                   : {}),
//               }}
//             >
//               {link.icon}
//               <span>{link.label}</span>
//             </div>
//           ))}
//         </div>
//         <button
//           style={styles.menuIcon}
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           <FaBars />
//         </button>
//       </nav>
//       {isMobile && menuOpen && (
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
//                 ...(link.restricted && !isAuthenticated
//                   ? styles.disabledLink
//                   : {}),
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

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUniversity,
  FaRobot,
  FaBookOpen,
  FaGraduationCap,
  FaTicketAlt,
} from "react-icons/fa";
import AuthContext from "../context/AuthContext";

const Header = ({ isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
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

  const handleLinkClick = (to, restricted) => {
    if (restricted && !isAuthenticated) {
      history.push("/signin");
    } else {
      history.push(to);
    }
  };

  const styles = {
    header: {
      backgroundColor: isDarkMode ? "#2f3136" : "#ffffff",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      borderBottom: `1px solid ${isDarkMode ? "#2E3136" : "#1F2124"}`,
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
      gap: "5px",
      color: isDarkMode ? "#ffffff" : "#40444b",
      textDecoration: "none",
      fontSize: "14px",
      padding: "10px 10px",
      borderRadius: "5px",
      margin: "0 5px",
      width: "100%",
      transition: "background-color 0.3s",
      pointerEvents: "auto",
      opacity: 1,
      cursor: "pointer",
    },
    disabledLink: {
      pointerEvents: "auto",
      opacity: 0.5,
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
      transition: "transform 0.5s ease", // Slide transition
      zIndex: 999,
      // borderRight: `1px solid ${isDarkMode ? "#dcdcdc" : "#1F2124"}`,
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
      padding: "21px 0px 21px 20px", // Add padding-left here
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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      color: isDarkMode ? "#ffffff" : "#40444b",
      fontSize: "14px",
      textDecoration: "none",
      marginBottom: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      transition: "background-color 0.3s, border 0.3s",
      width: "80%",
      border: `1px solid transparent`,
      cursor: "pointer",
    },
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.linkContainer}>
          {links.map((link) => (
            <div
              key={link.to}
              onClick={() => handleLinkClick(link.to, link.restricted)}
              style={{
                ...styles.link,
                ...(location.pathname === link.to ? styles.activeLink : {}),
                ...(link.restricted && !isAuthenticated
                  ? styles.disabledLink
                  : {}),
              }}
            >
              {link.icon}
              <span>{link.label}</span>
            </div>
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
        <div style={styles.mobileMenu}>
          <button
            style={styles.closeIcon}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          {links.map((link) => (
            <div
              key={link.to}
              onClick={() => handleLinkClick(link.to, link.restricted)}
              style={{
                ...styles.mobileLink,
                ...(link.restricted && !isAuthenticated
                  ? styles.disabledLink
                  : {}),
              }}
            >
              {link.icon}
              <span>{link.label}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
