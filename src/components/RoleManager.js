import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext"; // Use AuthContext for authentication
import { firestore } from "../services/firebaseConfig"; // Firebase Firestore
import { doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

// Styled Components
const RoleManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: #2e3136;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #40444b;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  color: ${({ isError }) => (isError ? "red" : "green")};
  font-weight: bold;
  margin-top: 10px;
`;

const RoleManager = () => {
  const { user, signOut } = useAuth(); // Use AuthContext for user and signOut
  const [userId, setUserId] = useState(""); // State for UID input
  const [locationName, setLocationName] = useState(""); // State for Location Name input
  const [message, setMessage] = useState(""); // Feedback message
  const [isLoading, setIsLoading] = useState(false); // Loading state for buttons
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setMessage("You are currently logged in. Please log out to proceed.");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(); // Sign out the user
      setMessage("You have been logged out. Please proceed with login.");
    } catch (error) {
      console.error("Error logging out:", error);
      setMessage("Failed to log out. Try again.");
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage("");

    // Normalize inputs for comparison
    const normalizedUserId = userId.trim();
    const normalizedLocationName = locationName.trim().toLowerCase();

    if (!normalizedUserId || !normalizedLocationName) {
      setMessage("Both UID and Location Name are required.");
      setIsLoading(false);
      return;
    }

    try {
      const docRef = doc(firestore, "locations", normalizedUserId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const isNameMatching =
          data.locationName?.toLowerCase() === normalizedLocationName;

        if (isNameMatching) {
          setMessage("Login successful! Redirecting...");
          history.push("/home");
        } else {
          setMessage("Location Name does not match. Please try again.");
        }
      } else {
        setMessage("No account found with the given UID.");
      }
    } catch (error) {
      if (error.code === "permission-denied") {
        setMessage("Insufficient permissions to access this data.");
      } else {
        console.error("Error fetching user data:", error);
        setMessage("An error occurred while verifying. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RoleManagerContainer>
      <h2>Login Verification</h2>
      {user ? (
        <>
          <p>You are currently logged in. Please log out to proceed.</p>
          <Button onClick={handleLogout} disabled={isLoading}>
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder="Enter UID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)} // Do not trim here
          />
          <Input
            type="text"
            placeholder="Enter Location Name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)} // Do not trim here
          />
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Verifying..." : "Login"}
          </Button>
        </>
      )}
      {message && (
        <Message
          isError={message.includes("failed") || message.includes("not match")}
        >
          {message}
        </Message>
      )}
    </RoleManagerContainer>
  );
};

export default RoleManager;
