import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";

// Styled components
const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-height: 100vh; */
  padding: 2rem;
  /* background-color: ${({ isDarkMode }) =>
    isDarkMode ? "#1F2124" : "#F9F9F9"}; */
`;

const ListContainer = styled.div`
  max-width: 800px;
  width: 95%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2E3136" : "#ffffff")};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #2e3136;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
  text-align: center;
`;

const LocationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LocationItem = styled.li`
  font-size: 1.2rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
  padding: 10px;
  border-bottom: 1px solid
    ${({ isDarkMode }) => (isDarkMode ? "#40444A" : "#E0E0E0")};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#F5F5F5" : "#2E3136")};
`;

const LocationListViewer = ({ isDarkMode }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching locations from Firestore...");
        const locationsCollection = collection(firestore, "locations");
        const snapshot = await getDocs(locationsCollection);

        console.log("Snapshot size:", snapshot.size);

        const locationData = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Document data:", data);
          return data.locationName;
        });

        console.log("Fetched locations:", locationData);
        setLocations(locationData);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Failed to load locations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <OuterContainer isDarkMode={isDarkMode}>
      <ListContainer isDarkMode={isDarkMode}>
        <Title isDarkMode={isDarkMode}>All Locations</Title>
        {loading && (
          <LoadingMessage isDarkMode={isDarkMode}>Loading...</LoadingMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && locations.length === 0 && (
          <p>No locations found.</p>
        )}
        {!loading && !error && locations.length > 0 && (
          <LocationList>
            {locations.map((location, index) => (
              <LocationItem key={index} isDarkMode={isDarkMode}>
                {location}
              </LocationItem>
            ))}
          </LocationList>
        )}
      </ListContainer>
    </OuterContainer>
  );
};

export default LocationListViewer;
