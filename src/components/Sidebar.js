import React, { useEffect, useState } from "react";
import {
  FaSquare,
  FaPlay,
  FaRegArrowAltCircleRight,
  FaCaretRight,
} from "react-icons/fa";

import styled from "styled-components";

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)"};
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 998;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 0;")}
  width: 75%;
  height: 100vh;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#2f3136" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#000000")};
  transform: ${(props) =>
    props.isOpen
      ? "translateX(0)"
      : `translateX(${props.direction === "left" ? "-100%" : "100%"})`};
  transition: transform ${(props) => props.speed}ms ease-in-out;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: ${({ isDarkMode }) =>
    isDarkMode
      ? "0 4px 6px rgba(255, 255, 255, 0.1)"
      : "0 4px 6px rgba(0, 0, 0, 0.1)"};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#40444A")};
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.shouldRotate ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  /* box-shadow: ${({ isDarkMode }) =>
    isDarkMode
      ? "0 4px 6px rgba(255, 255, 255, 0.1)"
      : "0 4px 6px rgba(0, 0, 0, 0.1)"}; */
  padding: 0;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  height: 100%;
`;

const Sidebar = ({
  isDarkMode,
  isOpen,
  toggleSidebar,
  direction = "left",
  speed = 300,
  children,
}) => {
  const [shouldRotate, setShouldRotate] = useState(false);

  // Handle delayed rotation at 80% of the animation duration
  useEffect(() => {
    if (isOpen) {
      const startRotationTimer = setTimeout(() => {
        setShouldRotate(true);
      }, speed * 0.8);
      return () => clearTimeout(startRotationTimer);
    } else {
      setShouldRotate(false);
    }
  }, [isOpen, speed]);

  return (
    <>
      {/* Overlay */}
      <Overlay
        isDarkMode={isDarkMode}
        isOpen={isOpen}
        onClick={toggleSidebar}
      />
      {/* Sidebar Container */}
      <Container
        isOpen={isOpen}
        direction={direction}
        speed={speed}
        isDarkMode={isDarkMode}
      >
        <CloseButton
          shouldRotate={shouldRotate}
          onClick={toggleSidebar}
          isDarkMode={isDarkMode}
        >
          <FaCaretRight size="34px" /> {/* Change size as needed */}
        </CloseButton>
        <Content>{children}</Content>
      </Container>
    </>
  );
};

export default Sidebar;
