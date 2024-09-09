import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { borderRadius } from "polished";
import { lighten, darken } from "polished"; // Import lighten from polished

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

const ArchetypeLibraryPage = () => {
  const [archetypes, setArchetypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState({});

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

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#1e2124",
      color: "#ffffff",
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
      height: "200px",
      perspective: "1000px",
      cursor: "pointer",
      transition: "transform 0.3s",
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
    },
    cardFront: {
      backgroundColor: "inherit",
      color: "inherit",
      border: "5px double #2f3136", // Add border style here
    },

    cardBack: {
      backgroundColor: "#2f3136",
      color: "#ffffff",
      transform: "rotateY(180deg)",
      // border: "5px double", // Add border style here
    },

    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      textTransform: "uppercase", // Corrected property spelling
      // marginBottom: "10px",
    },
    cardTitleBack: {
      fontSize: "14px",
      fontWeight: "bold",
      // marginBottom: "10px",
    },
    cardMotto: {
      // fontStyle: "italic",
      marginBottom: "10px",
      // textDecoration: "underline",
      // textUnderlineOffset: "5px", // Adjust the value as per your spacing requirement
    },
    cardInfoTop: {
      fontSize: "12px",
      marginTop: "auto",
    },
    cardInfo: {
      fontSize: "10px",
      marginTop: "auto",
    },
    imageSquare: {
      width: "50px",
      height: "50px",
      margin: "10px auto 0px", // Center the image horizontally and add margin below it
      objectFit: "cover", // Ensure the image fits within the square without distortion
      border: "1px dashed",
      padding: "4px",
      marginBottom: "10px",
      borderRadius: "50px",
    },

    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%", // Ensure the content fills the card height
    },
    cardContent2: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "8px",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px", // This creates space between the images
      marginBottom: "0px",
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
      {/* <h1 style={styles.header}>Archetype Library</h1> */}
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
              <div
                style={{
                  ...styles.cardFace,
                  ...styles.cardFront,
                  backgroundColor: archetype.color,
                  color: getTextColor(archetype.color),
                }}
              >
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{archetype.name}</h2>
                  {/* <p>Order: {archetype.order}</p> */}
                  <p style={styles.cardMission}>{archetype.mission}</p>
                </div>
                <div style={styles.cardContent2}>
                  <p>Galactic sector: {archetype.planet}</p>
                </div>
              </div>
              <div
                style={{
                  ...styles.cardFace,
                  ...styles.cardBack,
                  borderColor: archetype.color, // Dynamic border color
                }}
              >
                <div style={styles.cardContent}>
                  {/* <h2 style={styles.cardTitle}>{archetype.name} Details</h2> */}
                  <p style={styles.cardMotto}> {archetype.motto}</p>
                  <div style={styles.cardInfo}>
                    <p>Order: {archetype.order}</p>
                    <p>Third Eye: {archetype.thirdEye}</p>
                  </div>
                  <div style={styles.imageContainer}>
                    <img
                      src={archetypeStones[archetype.name]}
                      alt={`${archetype.name} Stone`}
                      style={{
                        ...styles.imageSquare,
                        ...styles.cardBack,
                        borderColor: archetype.color,
                        backgroundColor: darken(0.4, archetype.color), // Darken the background color by 20%
                        color: getTextColor(archetype.color),
                      }}
                    />
                    <img
                      src={archetypeImages[archetype.name]}
                      alt={`${archetype.name}`}
                      style={{
                        ...styles.imageSquare,
                        ...styles.cardBack,
                        borderColor: archetype.color,
                        backgroundColor: darken(0.4, archetype.color), // Darken the background color by 20%
                        color: getTextColor(archetype.color),
                      }}
                    />
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
      <div />
      <Footer />
    </div>
  );
};

export default ArchetypeLibraryPage;
