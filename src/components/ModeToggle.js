import React from "react";
import styled from "styled-components";
import { FaUserTie } from "react-icons/fa"; // Icons for Adult and Kid modes
import { TbMoodKid } from "react-icons/tb";
import { FaChild } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";

const ToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 60px;
  height: 34px;
  margin: 10px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ isKidMode, isDarkMode }) =>
    isKidMode
      ? isDarkMode
        ? "#1F2124"
        : "#F5F5F5"
      : isDarkMode
      ? "#F5F5F5"
      : "#2E3136"}; /* Dynamic background color based on modes */
  border-radius: 34px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: 0.4s;

  &:before {
    content: "";
    position: absolute;
    height: 26px;
    width: 26px;
    background-color: ${({ isKidMode, isDarkMode }) =>
      isKidMode
        ? isDarkMode
          ? "#F5F5F5"
          : "#2E3136"
        : isDarkMode
        ? "#2E3136"
        : "#F5F5F5"}; /* Dynamic circle color */
    border-radius: 50%;
    bottom: 4px;
    left: 4px;
    transform: ${({ isKidMode }) =>
      isKidMode ? "translateX(26px)" : "translateX(0)"};
    transition: 0.4s;
  }
`;

const ModeToggle = ({ isKidMode, onToggle, disabled, isDarkMode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FaUserTie
      size={24}
      color={
        isKidMode
          ? isDarkMode
            ? "#F5F5F5"
            : "#2E3136"
          : isDarkMode
          ? "#F5F5F5"
          : "#2E3136"
      }
    />
    <ToggleWrapper>
      <ToggleInput
        type="checkbox"
        checked={isKidMode}
        onChange={() => !disabled && onToggle()}
        disabled={disabled}
      />
      <ToggleSlider isKidMode={isKidMode} />
    </ToggleWrapper>
    <FaChild
      size={24}
      color={
        isKidMode
          ? isDarkMode
            ? "#F5F5F5"
            : "#2E3136"
          : isDarkMode
          ? "#F5F5F5"
          : "#2E3136"
      }
    />
  </div>
);

export default ModeToggle;
