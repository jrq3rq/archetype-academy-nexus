// src/components/LocationList.js
import React, { useEffect, useState } from "react";
import { firestore } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

// Styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  backdrop-filter: blur(50px);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #2e3136;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#2E3136")};
`;

const LocationItem = styled.div`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#f0f0f0")};
  padding: 1.2rem;
  border-radius: 8px;
`;

const LocationName = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
`;

const LocationDetails = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  color: ${({ isDarkMode }) => (isDarkMode ? "#dcdcdc" : "#333")};
`;

const TypeAndPlan = styled.p`
  font-size: 0.7rem;
  padding-top: 5px;
  color: ${({ isDarkMode }) => (isDarkMode ? "#dcdcdc" : "#333")};
`;

const LocationList = ({ isDarkMode }) => {
  const { user, isLoading } = useAuth();
  const [location, setLocation] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      if (user) {
        console.log("User ID from AuthContext:", user.uid);
        try {
          const docRef = doc(firestore, "locations", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log(
              "Document data retrieved successfully:",
              docSnap.data()
            );
            setLocation(docSnap.data());
          } else {
            console.warn("No document found for user ID:", user.uid);
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        } finally {
          setLoadingData(false);
        }
      } else {
        // Clear location data when user is signed out
        setLocation(null);
        setLoadingData(false);
      }
    };

    fetchLocation();
  }, [user]);

  if (isLoading || loadingData) {
    return <Wrapper isDarkMode={isDarkMode}>Loading...</Wrapper>;
  }

  if (!location) {
    return (
      <Wrapper isDarkMode={isDarkMode}>
        <Container>
          <Title isDarkMode={isDarkMode}>
            Welcome to the Personalized Learning Hub
          </Title>
          <p>Your gateway to immersive, tailored learning experiences.</p>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <Container>
        <LocationItem isDarkMode={isDarkMode}>
          <LocationName isDarkMode={isDarkMode}>
            {location.locationName}
          </LocationName>
          <LocationDetails isDarkMode={isDarkMode}>
            Address: {location.address}
            <br />
            <TypeAndPlan isDarkMode={isDarkMode}>
              Type: {location.locationType}
            </TypeAndPlan>
            <TypeAndPlan isDarkMode={isDarkMode}>
              Subscription Plan: {location.subscriptionPlan}
            </TypeAndPlan>
          </LocationDetails>
        </LocationItem>
      </Container>
    </Wrapper>
  );
};

export default LocationList;
