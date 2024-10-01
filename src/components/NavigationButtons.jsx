// src/components/NavigationButtons.jsx

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #282c34;
  color: #ffffff;
  transition: background-color 0.3s;
  min-width: 100px;

  &:disabled {
    background-color: #555555;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #555555;
  }
`;

const NavigationButtons = ({
  currentTraitIndex,
  totalTraits,
  onPrev,
  onNext,
  onSubmit,
  disableNext,
}) => {
  return (
    <ButtonContainer>
      {currentTraitIndex > 0 && (
        <NavButton onClick={onPrev}>Previous Trait</NavButton>
      )}

      {currentTraitIndex < totalTraits - 1 ? (
        <NavButton onClick={onNext} disabled={disableNext}>
          Next Trait
        </NavButton>
      ) : (
        <NavButton onClick={onSubmit} disabled={disableNext}>
          Submit Answers
        </NavButton>
      )}
    </ButtonContainer>
  );
};

NavigationButtons.propTypes = {
  currentTraitIndex: PropTypes.number.isRequired,
  totalTraits: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disableNext: PropTypes.bool.isRequired,
};

export default NavigationButtons;
