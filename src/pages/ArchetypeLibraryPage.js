import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { lighten, darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUser, faComments } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes, css } from "styled-components";

import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localStorageUtils";

// Simulating environment variable
const BASE_URL = process.env.REACT_APP_ARCHETYPES_API_URL;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
`;

const FloatingImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: ${float} 3s ease-in-out infinite;
`;

const FloatingGEM = styled.img`
  width: 100px;
  height: 100px;
  /* border-radius: 50%; */
  padding: 8px;
  object-fit: cover;
  animation: ${float} 3s ease-in-out infinite;
`;

const ContentContainer = styled.div`
  position: relative;
  background-color: ${({ bgColor }) =>
    bgColor}; // Dynamic background color based on props
  color: ${({ bgColor }) =>
    getTextColor(bgColor)}; // Dynamic text color based on the background
  border: 1px solid #2e3136;
  border-radius: 50px;
  padding: 20px 20px 20px 20px;
  width: 80%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    /* padding-top: 40px; */
    width: 90%;
  }

  h2 {
    text-align: center;
    padding-bottom: 20px;
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
  }
`;

const StyledParagraph = styled.span`
  font-size: 14px;
  margin-left: 5px;
  color: ${({ color }) => color}; // Dynamic color based on props
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const StyledNormalText = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 12px;
`;

const BionaryContainer = styled.div`
  border-radius: 20px 20px 0px 0px;
  border-top: 1px solid #2e3136;
  border-right: 1px solid #2e3136;
  border-bottom: 1px solid transparent;
  border-left: 1px solid #2e3136;
`;

const StyledText = styled.p`
  /* border-radius: 50px; */
  padding: 10px 20px 10px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const getAllArchetypes = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const convertToBinary = (str) => {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
};
// Function to determine the text color based on the background color
const getTextColor = (bgColor) => {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
};

// Map archetype names to their corresponding image filenames
const archetypeStones = {
  Caregiver: "/images/CaregiverStone.png",
  Creator: "/images/CreatorStone.png",
  Everyman: "/images/EverymanStone.png",
  Explorer: "/images/ExplorerStone.png",
  Hero: "/images/HeroStone.png",
  Innocent: "/images/InnocentStone.png",
  Joker: "/images/JokerStone.png",
  Lover: "/images/LoverStone.png",
  Magician: "/images/MagicianStone.png",
  Rebel: "/images/RebelStone.png",
  Ruler: "/images/RulerStone.png",
  Sage: "/images/SageStone.png",
};

const getBackgroundImage = (archetypeName) => {
  if (["Rebel", "Magician", "Hero"].includes(archetypeName)) {
    return "/images/HexagonBackgroundIMG.png"; // Ensure this path is correct
  } else if (["Creator", "Ruler", "Caregiver"].includes(archetypeName)) {
    return "/images/OctagonBackgroundIMG.png"; // Ensure this path is correct
  } else if (["Innocent", "Sage", "Explorer"].includes(archetypeName)) {
    return "/images/TeardropBackgroundIMG.png"; // Ensure this path is correct
  } else if (["Lover", "Joker", "Everyman"].includes(archetypeName)) {
    return "/images/DiamondBackgroundIMG.png"; // Ensure this path is correct
  } else {
    return null; // Default case, no background image
  }
};

const archetypeImages = {
  Caregiver: "/images/Caregiver.png",
  Creator: "/images/Creator.png",
  Everyman: "/images/Everyman.png",
  Explorer: "/images/Explorer.png",
  Hero: "/images/Hero.png",
  Innocent: "/images/Innocent.png",
  Joker: "/images/Joker.png",
  Lover: "/images/Lover.png",
  Magician: "/images/Magician.png",
  Rebel: "/images/Rebel.png",
  Ruler: "/images/Ruler.png",
  Sage: "/images/Sage.png",
};

const ArchetypeLibraryPage = ({ isDarkMode, toggleTheme }) => {
  const [archetypes, setArchetypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState({});
  const [modalsOpen, setModalsOpen] = useState({});
  const [isNotSignedIn, setIsNotSignedIn] = useState(false);
  const [rotatingImages, setRotatingImages] = useState({}); // To track rotating state

  const handleChatClick = (event) => {
    event.stopPropagation();
    setIsNotSignedIn(true); // Trigger the message display
    setTimeout(() => {
      setIsNotSignedIn(false); // Hide the message after a short delay
    }, 3000);
    console.log("Chat button clicked");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: isDarkMode ? "#1F2124" : "#ffffff", // Card background based on theme
      color: isDarkMode ? "#ffffff" : "#000000", // Change text color
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
      alignItems: "center",
      overflowY: "auto",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "1200px",
      justifyContent: "center",
      marginBottom: "20px",
    },
    card: {
      borderRadius: "5px",
      height: "220px",
      perspective: "1000px",
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s", // Add transition for box-shadow
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add initial shadow effect
      backgroundColor: isDarkMode ? "#1e2124" : "#ffffff", // Change based on theme
    },
    cardInner: {
      position: "relative",
      width: "100%",
      height: "100%",
      textAlign: "center",
      transition: "transform 0.6s",
      transformStyle: "preserve-3d",
    },
    cardFace: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "15px",
      boxSizing: "border-box",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      border: "1px solid #2E3136",
    },
    cardFront: {
      backgroundColor: "inherit",
      color: "inherit",
      border: "6px double #2f3136", // Add border style here
      borderRadius: "5px",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      textTransform: "uppercase", // Corrected property spelling
      letterSpacing: "4px",
    },
    cardMission: {
      fontSize: "14px",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%", // Ensure the content fills the card height
    },
    cardBack: {
      backgroundColor: "#2f3136",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "15px",
      boxSizing: "border-box",
      border: "2px solid", // Border based on the dynamic archetype color
      borderRadius: "8px",
    },
    imageSquare: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      padding: "8px",
      border: "1px solid", // Dashed border with dynamic color
      objectFit: "cover",
    },

    cardTitleBack: {
      fontSize: "14px",
      fontWeight: "bold",
      // marginBottom: "10px",
    },
    cardInfoTop: {
      fontSize: "12px",
      marginTop: "auto",
    },
    cardContent2: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "8px",
    },

    cardMotto: {
      fontSize: "16px",
      textAlign: "center",
      marginBottom: "10px",
    },

    mainSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // padding: "10px 0",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px", // Space between images
      position: "relative", // Important for positioning the rotating image
    },

    rotatingImageWrapper: {
      // width: "80px", // Size of the circle
      // height: "80px",
      perspective: "1000px", // Add 3D perspective
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative", // For proper positioning of the static circle and image
    },

    staticCircle: {
      position: "absolute", // Ensures the circle wraps around the image
      width: "72px", // Size of the static circle
      height: "72px",
      borderRadius: "50%",
      zIndex: "1", // Static circle behind the rotating image
    },

    rotatingImage: (isRotating, duration) => ({
      width: "60px", // Inherit the size from the wrapper
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
      transformStyle: "preserve-3d", // Ensures 3D space for rotation
      zIndex: "2", // Ensures the rotating image is above the static circle
      animation: isRotating
        ? `rotateY360 ${duration}s infinite linear`
        : "none", // Apply rotation only if isRotating is true
    }),

    "@keyframes rotateY360": {
      from: {
        transform: "rotateY(0deg)", // Start position
      },
      to: {
        transform: "rotateY(360deg)", // Full rotation
      },
    },

    cardInfo: {
      fontSize: "10px",
      marginTop: "10px",
      textAlign: "center",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      // gap: "10px",
      marginRight: "10px",
    },

    buttonLeft: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      // border: "none",
      cursor: "pointer",
      border: "2px dashed", // Dashed border with dynamic color
      marginRight: "10px", // Space between images
    },

    buttonRight: {
      width: "50px",
      height: "50px",
      borderRadius: "10%",
      cursor: "pointer",
      border: "2px dashed", // Dashed border with dynamic color
      marginLeft: "10px", // Space between images
    },
    //vertical buttons
    buttonTop: {
      fontSize: "10px",
      width: "70px",
      height: "50px",
      borderTopLeftRadius: "10px", // Only round the bottom-left corner
      borderTopRightRadius: "10px", // Only round the bottom-right corner
      borderBottomRightRadius: "10px", // Only round the bottom-left corner
      borderBottomLeftRadius: "10px", // Only round the bottom-left corner
      borderRight: "1px solid",
      borderBottom: "1px solid",
      borderLeft: "1px solid",
      borderTop: "1px solid",
      cursor: "pointer",
      marginRight: "10px", // Space between images
    },

    buttonBottom: {
      fontSize: "10px",
      width: "50px",
      height: "50px",
      borderBottomLeftRadius: "10px", // Only round the bottom-left corner
      borderBottomRightRadius: "10px", // Only round the bottom-right corner
      borderRight: "1px solid",
      borderBottom: "1px solid",
      borderLeft: "1px solid",
      borderTop: "0px solid",
      cursor: "pointer",
      marginRight: "10px", // Space between images
    },
    chatIconContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    chatIcon: {
      width: "50px",
      height: "50px",
      cursor: "pointer",
      backgroundColor: "transparent",
    },
    message: {
      position: "absolute",
      bottom: "40px", // Positioning the message directly below the icon
      width: "300px", // Set a fixed width for the message
      color: "#ff0000", // Text color for the message
      padding: "8px",
      borderRadius: "5px",
      textAlign: "center",
      // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      fontSize: "12px",
    },

    modalContent: {
      backgroundColor: "transparent", // Dark background
      color: "#ffffff", // Light text for readability
      padding: "20px", // Padding for space around content
      borderRadius: "10px", // Rounded corners for smooth feel
      maxWidth: "600px", // Max width on larger screens
      width: "90%", // Responsive width for smaller screens
      maxHeight: "80vh", // Modal height limited to 80% of viewport height
      minHeight: "90%", // Modal height limited to 90%
      overflowY: "auto", // Scroll vertically if content exceeds modal height
      overflowX: "hidden", // Prevent horizontal scrolling within the modal content
      margin: "auto", // Center the modal
      textAlign: "center", // Center text content
      position: "relative", // For positioning the close button
      transition: "all 0.3s ease-in-out", // Smooth transitions
      display: "flex", // Use flexbox layout
      flexDirection: "column", // Stack children vertically
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
    },
    modalTitle: {
      fontSize: "1.5rem", // Normal font size for title
      fontWeight: "bold",
      marginBottom: "20px",
      color: lighten(0.2, "#ffffff"), // Slightly lighter title color
    },
    modalText: {
      fontSize: "1rem", // Normal readable font size for content
      lineHeight: "1.6",
      // marginBottom: "4px",
      padding: "20px",
      textAlign: "left",
      // Remove the border style from here
    },
    closeButton: {
      position: "absolute",
      top: "15px",
      right: "15px",
      backgroundColor: "transparent",
      color: "#ffffff",
      border: "none",
      fontSize: "1.5rem", // Standard size for close button
      cursor: "pointer",
      padding: "10px",
      transition: "color 0.2s ease",
      zIndex: 1000,
      "&:hover": {
        color: lighten(0.3, "#ffffff"), // Lighter on hover
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const localData = getDataFromLocalStorage();
      if (localData) {
        setArchetypes(localData);
        setLoading(false);
      } else {
        const data = await getAllArchetypes();
        if (data.length > 0) {
          saveDataToLocalStorage(data);
          setArchetypes(data);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []); // This ensures the effect runs only once

  const toggleCard = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
    setRotatingImages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (id) => {
    setModalsOpen((prev) => ({ ...prev, [id]: true }));
  };

  const closeModal = (id) => {
    setModalsOpen((prev) => ({ ...prev, [id]: false }));
    setRotatingImages((prev) => ({ ...prev, [id]: false }));
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {archetypes.map((archetype) => {
          const isRotating = rotatingImages[archetype.id] || false;
          const randomDuration = Math.floor(Math.random() * 5) + 8;

          return (
            <div
              key={archetype.id}
              style={{
                ...styles.card,
                transform: flippedCards[archetype.id]
                  ? "scale(1.05)"
                  : "scale(1)",
              }}
              onClick={() => toggleCard(archetype.id)}
            >
              <div
                style={{
                  ...styles.cardInner,
                  transform: flippedCards[archetype.id]
                    ? "rotateY(180deg)"
                    : "rotateY(0)",
                }}
              >
                {/* Front of the card */}
                <div
                  style={{
                    ...styles.cardFace,
                    backgroundColor: archetype.color,
                    color: getTextColor(archetype.color),
                    backgroundImage: `url(${getBackgroundImage(
                      archetype.name
                    )})`,
                    backgroundSize: "200%",
                    backgroundPosition: "center",
                  }}
                >
                  <div style={styles.cardContent}>
                    <h2 style={styles.cardTitle}>{archetype.name}</h2>
                    <p style={styles.cardMission}>{archetype.mission}</p>
                  </div>
                  <div style={styles.cardContent2}>
                    <p>Galactic sector: {archetype.planet}</p>
                  </div>
                </div>

                {/* Back of the card */}
                <div
                  style={{
                    ...styles.cardFace,
                    ...styles.cardBack,
                    border: `5px double ${archetype.color}`,
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundColor: darken(0.1, archetype.color),
                    color: getTextColor(archetype.color),
                  }}
                >
                  <div style={styles.cardContent}>
                    <div style={styles.mainSection}>
                      <div style={styles.buttonContainer}>
                        <button
                          style={{
                            ...styles.buttonTop,
                            borderColor: archetype.color,
                            backgroundColor: darken(0.3, archetype.color),
                            borderWidth: "1px",
                            borderStyle: "solid",
                          }}
                          onClick={(event) => {
                            event.stopPropagation();
                            openModal(archetype.id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCog}
                            style={{
                              color: archetype.color,
                              fontSize: "24px",
                            }}
                          />
                        </button>
                        {/* <button
                        style={{
                          ...styles.buttonBottom,
                          borderColor: archetype.color,
                          backgroundColor: darken(0.3, archetype.color),
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          console.log("Tools button clicked");
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{
                            color: archetype.color,
                            fontSize: "18px",
                          }}
                        />
                      </button> */}
                        <Modal
                          isOpen={modalsOpen[archetype.id]}
                          onRequestClose={() => closeModal(archetype.id)}
                          contentLabel={`${archetype.name} Modal`}
                          style={{
                            overlay: {
                              backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark overlay for focus
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "10px",
                            },
                            content: {
                              backgroundColor: darken(0.4, archetype.color),
                              color: "#ffffff", // Use a static white text color
                              padding: "20px",
                              borderRadius: "10px",
                              maxWidth: "600px",
                              width: "80%",
                              maxHeight: "90vh",
                              height: "70%",
                              overflowY: "auto",
                              textAlign: "center",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                              transition: "all 0.3s ease-in-out",
                              border: `1px solid ${archetype.color}`, // Dynamic border color for modal
                            },
                          }}
                        >
                          <button
                            onClick={() => closeModal(archetype.id)}
                            style={styles.closeButton}
                          >
                            &times;
                          </button>
                          <div style={styles.modalContent}>
                            <p style={{ marginBottom: "10px" }}>
                              <b
                                style={{
                                  color: archetype.color,
                                  textTransform: "uppercase",
                                }}
                              >
                                {archetype.name}
                              </b>{" "}
                              Student ID:
                            </p>
                            <FloatingGEM
                              src={archetypeImages[archetype.name]}
                              alt={`${archetype.name}`}
                              style={{
                                borderColor: archetype.color,
                              }}
                            />

                            <ContentContainer bgColor={archetype.color}>
                              <StyledNormalText>
                                <StyledParagraph
                                  color={getTextColor(archetype.color)}
                                >
                                  {archetype.id}
                                </StyledParagraph>
                              </StyledNormalText>
                            </ContentContainer>
                            {/* <p style={styles.modalText}>
                            More information about{" "}
                            <b style={{ color: archetype.color }}>
                              {archetype.name}
                            </b>{" "}
                            and its characteristics will be displayed here.
                          </p> */}
                            <div
                              style={{
                                padding: "20px",
                                borderRadius: "10px",
                                marginTop: "20px",
                              }}
                            >
                              {archetype.motivations && (
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "4px",
                                      color: archetype.color,
                                      justifyContent: "start",
                                      alignItems: "start",
                                      padding: "4px",
                                      marginLeft: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <b
                                      style={{
                                        color: archetype.color,
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      Motivations:
                                    </b>
                                    {archetype.motivations.map(
                                      (behavior, index) => (
                                        <span
                                          key={index}
                                          style={{
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {behavior}
                                          {index <
                                            archetype.motivations.length - 1 &&
                                            ","}{" "}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                              {archetype.traits && (
                                <div>
                                  <div
                                    style={{
                                      color: archetype.color,
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "4px",
                                      justifyContent: "start",
                                      alignItems: "start",
                                      padding: "4px",
                                      marginLeft: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <b
                                      style={{
                                        color: darken(0, archetype.color),
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      Traits:
                                    </b>
                                    {archetype.traits.map((behavior, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {behavior}
                                        {index < archetype.traits.length - 1 &&
                                          ","}{" "}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {archetype.behaviors && (
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "4px",
                                      marginLeft: "10px",
                                      color: archetype.color,
                                      justifyContent: "start",
                                      alignItems: "start",
                                      padding: "4px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <b
                                      style={{
                                        color: darken(0, archetype.color),
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      Behaviors:
                                    </b>
                                    {archetype.behaviors.map(
                                      (behavior, index) => (
                                        <span
                                          key={index}
                                          style={{ whiteSpace: "nowrap" }}
                                        >
                                          {behavior}
                                          {index <
                                            archetype.behaviors.length - 1 &&
                                            ","}{" "}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div>
                              {/* Chat icon container */}
                              <div
                                style={styles.chatIconContainer}
                                onClick={handleChatClick}
                              >
                                <FontAwesomeIcon
                                  icon={faComments}
                                  style={{
                                    ...styles.chatIcon,
                                    color: archetype.color,
                                    fontSize: "32px",
                                  }}
                                />

                                {/* Conditionally render the message below the chat icon */}
                                {isNotSignedIn && (
                                  <div style={styles.message}>
                                    Must be signed in to access chat
                                    functionality
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* </BionaryContainer> */}
                            {/* <StyledText>
                            <p
                              style={{
                                color: archetype.color,
                                fontSize: "6px",
                              }}
                            >
                              {convertToBinary(
                                new Date(archetype.timestamp).toLocaleString()
                              )}
                            </p>
                          </StyledText> */}
                          </div>
                        </Modal>
                      </div>
                      <div style={styles.imageContainer}>
                        {/* <img
                        src={archetypeStones[archetype.name]}
                        alt={`${archetype.name} Stone`}
                        style={{
                          ...styles.imageSquare,
                          borderColor: archetype.color,
                          backgroundColor: darken(0.3, archetype.color),
                          color: getTextColor(archetype.color),
                        }}
                      /> */}
                        {/* <img
                        src={archetypeImages[archetype.name]}
                        alt={`${archetype.name}`}
                        style={{
                          ...styles.imageSquare,
                          borderColor: archetype.color,
                          backgroundColor: darken(0.3, archetype.color),
                          color: getTextColor(archetype.color),
                        }}
                      /> */}
                        <div style={styles.rotatingImageWrapper}>
                          {/* Static Circle */}
                          <div
                            style={{
                              ...styles.staticCircle,
                              borderColor: archetype.color,
                              backgroundColor: darken(0.3, archetype.color),
                              borderWidth: "1px",
                              borderStyle: "solid",
                            }}
                          />
                          {/* Rotating Image */}
                          <img
                            src={archetypeStones[archetype.name]}
                            alt={`${archetype.name}`}
                            style={styles.rotatingImage(
                              isRotating,
                              randomDuration
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={styles.cardInfo}>
                      <p>Order: {archetype.order}</p>
                      <p>Third Eye: {archetype.thirdEye}</p>
                    </div>
                    <div style={styles.cardInfo}>
                      <p>
                        Gaia Timestamp:{" "}
                        {new Date(archetype.timestamp).toLocaleString()}
                      </p>
                      <p>ID: {archetype.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArchetypeLibraryPage;
