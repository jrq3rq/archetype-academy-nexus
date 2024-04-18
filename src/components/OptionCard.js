import React from "react";
import styled from "styled-components";
import { adjustColor, getTextColor, isColorLight } from "../utils/colorUtils";

const CardContainer = styled.div`
  height: auto;
  border: 1px solid #000;
  background: ${(props) =>
    props.color || "#ffffff"}; // Use color prop or default to white
  border-radius: 11.25px;
  padding: 15px;
  box-shadow: 0 4.5px 9px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; // Center content horizontally
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-3.75px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// const Title = styled.h2`
//   color: #333;
//   font-size: 1.125em;
//   margin-bottom: 0.5625em;
//   text-align: center; // Center the title
// `;

const Content = styled.p`
  padding: 20px 40px 20px 40px;
  font-size: 0.9em;
  /* text-transform: uppercase; */
  color: #666;
  text-align: center; // Center the content
  margin: auto; // Ensure it's centered vertically
  flex-grow: 1; // Allows the content to take up available space
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7.5px;
  margin-top: 11.25px;
  width: 100%; // Ensure buttons span the full width of the card
`;

const ActionButton = styled.button`
  background: ${(props) => props.color || "#ffffff"};
  color: ${(props) => (isColorLight(props.color) ? "#000000" : "#FFFFFF")};
  border: none;
  border-radius: 7.5px;
  padding: 9px 11.25px;
  cursor: pointer;
  font-size: 0.675em;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${(props) => adjustColor(props.color || "#007bff")};
    color: ${(props) => getTextColor(adjustColor(props.color || "#007bff"))};
  }
`;

const HeadButtonGroup = styled.div`
  width: 100%; // Full width of the card
  margin-bottom: 11.25px; // Spacing between the head button and title
`;

const HeadButton = styled.button`
  background: ${(props) => props.color || "#ffffff"};
  color: ${(props) => (isColorLight(props.color) ? "#000000" : "#FFFFFF")};
  border: none;
  border-radius: 7.5px;
  padding: 9px 11.25px;
  width: 100%; // Set width to 100% of the parent container
  cursor: pointer;
  font-size: 0.675em;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${(props) => adjustColor(props.color || "#007bff")};
    color: ${(props) => getTextColor(adjustColor(props.color || "#007bff"))};
  }
`;

const OptionCard = ({ title, content, onClick, color, id }) => {
  return (
    <CardContainer>
      {/* <Title>{title}</Title> */}
      <HeadButtonGroup>
        <HeadButton color={color}>{title}</HeadButton>
        {/* Personalize */}
      </HeadButtonGroup>
      <Content>{content}</Content>
      <ButtonGroup>
        <ActionButton color={color}> Portal</ActionButton>
        <ActionButton color={color}>Settings </ActionButton>
        <ActionButton color={color}>Edit</ActionButton>
        <ActionButton color={color}>Mint </ActionButton>
      </ButtonGroup>
    </CardContainer>
  );
};

export default OptionCard;
