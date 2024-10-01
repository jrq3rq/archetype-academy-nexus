// ErrorMessage.jsx

import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  background-color: #ffcccc;
  color: #cc0000;
  border: 1px solid #cc0000;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 100%;
  max-width: 600px;
`;

const ErrorMessage = ({ message }) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

export default ErrorMessage;
