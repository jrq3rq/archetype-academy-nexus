// LoadingSpinner.jsx

import React from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingSpinner = () => (
  <SpinnerContainer>
    <BounceLoader color="#45FE47" size={60} />
  </SpinnerContainer>
);

export default LoadingSpinner;
