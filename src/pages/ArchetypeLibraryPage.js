import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Modal from "react-modal";
import { lighten, darken } from "polished"; // Import lighten from polished
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUser } from "@fortawesome/free-solid-svg-icons"; // Importing the relevant icons

// Simulating environment variable
const BASE_URL = process.env.REACT_APP_ARCHETYPES_API_URL;

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

// Function to determine which background image to use based on the archetype name
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

const ArchetypeLibraryPage = ({ isDarkMode, toggleTheme }) => {
  const [archetypes, setArchetypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState({});
  const [modalsOpen, setModalsOpen] = useState({}); // Track open modals for each card

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllArchetypes();
      setArchetypes(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleCard = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Function to open the modal for a specific card
  const openModal = (id) => {
    setModalsOpen((prev) => ({ ...prev, [id]: true }));
  };

  // Function to close the modal for a specific card
  const closeModal = (id) => {
    setModalsOpen((prev) => ({ ...prev, [id]: false }));
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
    modalContent: {
      backgroundColor: "transparent", // Dark background
      color: "#ffffff", // Light text for readability
      padding: "20px", // Padding for space around content
      borderRadius: "10px", // Rounded corners for smooth feel
      maxWidth: "600px", // Max width on larger screens
      width: "90%", // Responsive width for smaller screens
      maxHeight: "80vh", // Modal height limited to 80% of viewport height
      overflowY: "auto", // Scroll if content exceeds modal height
      margin: "auto", // Center the modal
      textAlign: "center", // Center text content
      position: "relative", // For positioning the close button
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)", // Subtle shadow for depth
      transition: "all 0.3s ease-in-out", // Smooth transitions
      display: "flex", // Use flexbox layout
      flexDirection: "column", // Stack children vertically
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
      height: "100%", // Allow the modal content to take the full height
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
      marginBottom: "20px",
      padding: "20px",
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
      "&:hover": {
        color: lighten(0.3, "#ffffff"), // Lighter on hover
      },
    },
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
        {archetypes.map((archetype) => (
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
                  backgroundImage: `url(${getBackgroundImage(archetype.name)})`,
                  backgroundSize: "200%", // Zoomed in by making the image size larger
                  backgroundPosition: "center", // Keep the image centered
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
                  ...styles.cardBack, // Add back card styles
                  border: `5px double ${archetype.color}`, // Dynamic border color
                  backfaceVisibility: "hidden", // Ensure the back card is not visible when not flipped
                  transform: "rotateY(180deg)", // Rotate the back card to align properly
                  backgroundColor: darken(0.1, archetype.color), // Make the background color lighter
                  color: getTextColor(archetype.color), // Match text color with front card
                }}
              >
                <div style={styles.cardContent}>
                  <div style={styles.mainSection}>
                    <div style={styles.buttonContainer}>
                      <button
                        style={{
                          ...styles.buttonTop, // Shared button style
                          borderColor: archetype.color, // Ensure border color is set
                          backgroundColor: darken(0.3, archetype.color), // Darken the background color by 40%
                          borderWidth: "1px", // Ensure the border width is consistent
                          borderStyle: "solid", // Explicitly set the border style
                        }}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent card flip
                          openModal(archetype.id); // Open modal specific to this card
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCog} // Tools icon
                          style={{
                            color: archetype.color, // Directly set icon color to archetype's color
                            fontSize: "24px",
                          }}
                        />
                      </button>
                      <button
                        style={{
                          ...styles.buttonBottom, // Shared button style
                          borderColor: archetype.color,
                          backgroundColor: darken(0.3, archetype.color), // Darken the background color by 40%
                        }}
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent card flip
                          console.log("Tools button clicked"); // Handle other functionality here
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUser} // Paintbrush icon representing "Create"
                          style={{
                            color: archetype.color, // Directly set icon color to archetype's color
                            fontSize: "18px",
                          }}
                        />
                      </button>
                      <Modal
                        isOpen={modalsOpen[archetype.id]}
                        onRequestClose={() => closeModal(archetype.id)}
                        contentLabel={`${archetype.name} Modal`}
                        style={{
                          overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark overlay for focus
                            display: "flex",
                            alignItems: "center", // Vertically center modal
                            justifyContent: "center", // Horizontally center modal
                            padding: "10px", // Padding for mobile screens
                          },
                          content: {
                            backgroundColor: "rgba(0, 0, 0, 0.45)", // Dark overlay for focus
                            color: "#ffffff", // Use a static white text color
                            padding: "20px", // Padding for space around content
                            borderRadius: "10px", // Rounded corners for smooth feel
                            maxWidth: "600px", // Max width on larger screens
                            width: "80%", // Responsive width for smaller screens
                            maxHeight: "90vh", // Increase the max height (change to 90vh or a specific height)
                            height: "auto", // Set to auto to allow it to expand based on content
                            overflowY: "auto", // Scroll if content exceeds modal height
                            textAlign: "center", // Center text content
                            position: "absolute", // Change to absolute for centering
                            top: "50%", // Position from the top
                            left: "50%", // Position from the left
                            transform: "translate(-50%, -50%)", // Center the modal
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)", // Subtle shadow for depth
                            transition: "all 0.3s ease-in-out", // Smooth transitions
                            border: `2px solid ${archetype.color}`, // Dynamic border color for modal
                          },
                        }}
                      >
                        <div style={styles.modalContent}>
                          <h2
                            style={{
                              ...styles.modalTitle,
                              color: ` ${archetype.color}`,
                            }}
                          >
                            {archetype.name} Builder
                          </h2>
                          <p
                            style={{
                              ...styles.modalText,
                              // border: `1px solid ${archetype.color}`, // Dynamic border color for modal text
                            }}
                          >
                            More information about {archetype.name} and its
                            characteristics will be displayed here. You can
                            explore various traits and deep insights related to
                            this archetype.
                          </p>

                          <button
                            onClick={() => closeModal(archetype.id)}
                            style={styles.closeButton}
                          >
                            &times;
                          </button>
                        </div>
                      </Modal>
                    </div>
                    <div style={styles.imageContainer}>
                      <img
                        src={archetypeStones[archetype.name]}
                        alt={`${archetype.name} Stone`}
                        style={{
                          ...styles.imageSquare,
                          borderColor: archetype.color,
                          backgroundColor: darken(0.3, archetype.color), // Darken the background color by 20%
                          color: getTextColor(archetype.color),
                        }}
                      />
                      <img
                        src={archetypeImages[archetype.name]}
                        alt={`${archetype.name}`}
                        style={{
                          ...styles.imageSquare,
                          borderColor: archetype.color,
                          backgroundColor: darken(0.3, archetype.color), // Darken the background color by 20%
                          color: getTextColor(archetype.color),
                        }}
                      />
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
        ))}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ArchetypeLibraryPage;
