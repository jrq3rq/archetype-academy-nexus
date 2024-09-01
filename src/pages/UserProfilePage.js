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

const UserProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
    preferredArchetype: "",
    notifications: true,
    theme: "dark",
  });

  const [archetypes, setArchetypes] = useState([]);

  useEffect(() => {
    const fetchArchetypes = async () => {
      const data = await getAllArchetypes();
      setArchetypes(data);
    };
    fetchArchetypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user data:", userData);
    alert("Profile updated successfully!");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#1e2124",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
    },
    header: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "30px",
      textAlign: "center",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      width: "100%",
      margin: "0 auto",
      backgroundColor: "#2c2f33",
      borderRadius: "10px",
      padding: "30px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      boxSizing: "border-box",
    },
    formGroup: {
      marginBottom: "25px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "16px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#40444b",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#40444b",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#40444b",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      minHeight: "80px",
      boxSizing: "border-box",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#7289da",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      {/* <h1 style={styles.header}>User Profile</h1> */}
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="username">
            Username
          </label>
          <input
            style={styles.input}
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="bio">
            Bio
          </label>
          <textarea
            style={styles.textarea}
            id="bio"
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="preferredArchetype">
            Preferred Archetype
          </label>
          <select
            style={styles.select}
            id="preferredArchetype"
            name="preferredArchetype"
            value={userData.preferredArchetype}
            onChange={handleInputChange}
          >
            <option value="">Select an Archetype</option>
            {archetypes.map((archetype) => (
              <option key={archetype.id} value={archetype.name}>
                {archetype.name}
              </option>
            ))}
          </select>
        </div>
        <button style={styles.button} type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;
