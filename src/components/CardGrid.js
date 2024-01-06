import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OptionCard from "./OptionCard";
import { getAllArchetypes } from "../services/archetypeService";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    4,
    minmax(187.5px, 1fr)
  ); // Adjusted for 4 columns
  gap: 15px; // Reduced gap
  padding: 15px; // Reduced padding
  justify-content: center;
  align-items: stretch;
  max-height: 100vh; // Full viewport height
  overflow: auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(
      3,
      minmax(187.5px, 1fr)
    ); // 3 columns layout for medium screens
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(
      2,
      minmax(187.5px, 1fr)
    ); // 2 columns layout for small screens
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; // 1 column layout for extra small screens
  }
`;

const CardGrid = () => {
  const [archetypes, setArchetypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllArchetypes();
      setArchetypes(data);
    };
    fetchData();
  }, []);

  return (
    <GridContainer>
      {archetypes.map((archetype) => (
        <OptionCard
          key={archetype.id}
          title={archetype.name}
          content={archetype.motto}
          color={archetype.color}
        />
      ))}
    </GridContainer>
  );
};

export default CardGrid;
