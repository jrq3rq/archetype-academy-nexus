import React, { useState, useEffect } from "react";

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

const getTextColor = (bgColor) => {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
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
    },
    cardBack: {
      backgroundColor: "#2f3136",
      color: "#ffffff",
      transform: "rotateY(180deg)",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    cardMotto: {
      fontStyle: "italic",
      marginBottom: "10px",
    },
    cardInfo: {
      fontSize: "12px",
      marginTop: "auto",
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
      <h1 style={styles.header}>Archetype Library</h1>
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
                <h2 style={styles.cardTitle}>{archetype.name}</h2>
                <p style={styles.cardMotto}>{archetype.motto}</p>
                <p>{archetype.mission}</p>
              </div>
              <div style={{ ...styles.cardFace, ...styles.cardBack }}>
                <h2 style={styles.cardTitle}>{archetype.name} Details</h2>
                <div style={styles.cardInfo}>
                  <p>ID: {archetype.id}</p>
                  <p>
                    Timestamp: {new Date(archetype.timestamp).toLocaleString()}
                  </p>
                  <p>Order: {archetype.order}</p>
                  <p>Planet: {archetype.planet}</p>
                  <p>Third Eye: {archetype.thirdEye}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchetypeLibraryPage;
