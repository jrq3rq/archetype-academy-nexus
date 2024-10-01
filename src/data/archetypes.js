// src/components/ArchetypeCard.jsx

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const ViewProfileButton = styled.button`
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #45fe47;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #66ff66;
  }
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
          <ViewProfileButton>View Profile</ViewProfileButton>
        </a>
      )}
    </Card>
  );
};

ArchetypeCard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  profileUrl: PropTypes.string,
  reasoning: PropTypes.string,
};

export default ArchetypeCard;
