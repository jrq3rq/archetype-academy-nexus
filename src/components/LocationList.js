import React, { useEffect, useState } from "react";
import { firestore } from "../services/firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

// Styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem 1rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  backdrop-filter: blur(50px);
  padding: 1rem;
  border-radius: 12px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#2E3136")};
`;

const LocationItem = styled.p`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#f0f0f0")};
  padding: 1.2rem;
  border-radius: 8px;
  border: 1px solid #2e3136;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "rgba(64, 68, 75, 0.8)" : "rgba(240, 240, 240, 0.5)"};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
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
  const history = useHistory();

  useEffect(() => {
    const fetchLocation = async () => {
      if (!user) {
        setLoadingData(false);
        setLocation(null);
        return;
      }

      try {
        console.log("User ID from AuthContext:", user.uid);
        const docRef = doc(firestore, "locations", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data retrieved successfully:", docSnap.data());
          setLocation(docSnap.data());
        } else {
          console.warn("No document found for user ID:", user.uid);
          setLocation(null);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchLocation();
  }, [user]);

  const handleDashboardAccess = () => {
    history.push("/dashboard");
  };

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
        <LocationItem isDarkMode={isDarkMode} onClick={handleDashboardAccess}>
          <LocationName isDarkMode={isDarkMode}>
            {location.locationName}
          </LocationName>
          <LocationDetails isDarkMode={isDarkMode}>
            <TypeAndPlan isDarkMode={isDarkMode}>
              Membership Subscription: {location.subscriptionPlan}
            </TypeAndPlan>
          </LocationDetails>
          <TypeAndPlan isDarkMode={isDarkMode}>
            Type: {location.locationType}
          </TypeAndPlan>
        </LocationItem>
      </Container>
    </Wrapper>
  );
};

export default LocationList;
