import React from "react";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa"; // Import Sun and Moon icons

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
    checked
      ? "#F5F5F5"
      : "#2E3136"}; /* White in light mode, dark in dark mode */
  transition: 0.4s;
  border-radius: 34px;

  /* The toggle circle */
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ checked }) =>
      checked ? "#1F2124" : "#F5F5F5"}; /* Toggle circle color */
    border-radius: 50%;
    transition: 0.4s;
    transform: ${({ checked }) =>
      checked ? "translateX(26px)" : "translateX(0)"};
  }

  /* Sun Icon */
  & .sun-icon {
    position: absolute;
    top: 50%;
    right: 10px; /* Aligned to the right in light mode */
    transform: translateY(-50%);
    /* color: #f5f5f5;  */
    color: #f1c40f;
    font-size: 16px;
    display: ${({ checked }) =>
      checked ? "none" : "block"}; /* Only show in light mode */
  }

  /* Moon Icon */
  & .moon-icon {
    position: absolute;
    top: 50%;
    left: 10px; /* Aligned to the left in dark mode */
    transform: translateY(-50%);
    color: #2e3136; /* Moon color, opposite of dark background */
    font-size: 16px;
    display: ${({ checked }) =>
      checked ? "block" : "none"}; /* Only show in dark mode */
  }
`;

const ToggleSwitch = ({ isDarkMode, toggleTheme }) => {
  return (
    <SwitchContainer>
      <Input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <Slider checked={isDarkMode}>
        <FaSun className="sun-icon" />
        <FaMoon className="moon-icon" />
      </Slider>
    </SwitchContainer>
  );
};

export default ToggleSwitch;
