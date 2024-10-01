// ArchetypeCard.jsx

import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: #282c34;
  border: 2px solid #45fe47;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  text-align: center;
  color: #ffffff;
`;

const ArchetypeImage = styled.img`
  max-width: 100px;
  height: auto;
  margin-bottom: 10px;
`;

const ArchetypeName = styled.h3`
  font-size: 1.2em;
  margin-bottom: 5px;
`;

const Reasoning = styled.p`
  font-size: 0.9em;
  color: #cccccc;
`;

const ArchetypeCard = ({ title, name, imagePath, profileUrl, reasoning }) => {
  return (
    <Card>
      <h2>{title}</h2>
      <ArchetypeImage src={imagePath} alt={`${name} Image`} />
      <ArchetypeName>{name}</ArchetypeName>
      {reasoning && <Reasoning>{reasoning}</Reasoning>}
      {profileUrl && (
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
          <button style={{ padding: "8px 16px", marginTop: "10px" }}>
            View Profile
          </button>
        </a>
      )}
    </Card>
  );
};

export default ArchetypeCard;
