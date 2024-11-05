// src/components/Toast.js
import React from "react";
import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  10%, 90% { opacity: 1; }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  animation: ${fadeInOut} 3s ease-in-out forwards;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Toast = ({ message }) => {
  return <ToastContainer>{message}</ToastContainer>;
};

export default Toast;
