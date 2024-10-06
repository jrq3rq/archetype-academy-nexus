import React from "react";
import styled from "styled-components";

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ checked }) =>
    checked ? "#F5F5F5" : "#2E3136"}; /* White when checked (dark mode) */
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ checked }) =>
      checked ? "#1F2124" : "#F5F5F5"}; /* Black when checked (dark mode) */
    border-radius: 50%;
    transition: 0.4s;
    transform: ${({ checked }) =>
      checked ? "translateX(26px)" : "translateX(0)"};
  }
`;

const ToggleSwitch = ({ isDarkMode, toggleTheme }) => {
  return (
    <SwitchContainer>
      <Input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <Slider checked={isDarkMode} />
    </SwitchContainer>
  );
};

export default ToggleSwitch;
