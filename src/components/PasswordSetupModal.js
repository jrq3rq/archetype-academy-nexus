import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { firestore } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#40444b" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#1F2124")};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #2e3136;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #44fd47;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PasswordSetupModal = ({ isOpen, onClose, isDarkMode, userId }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSave = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const docRef = doc(firestore, "locations", userId);
    await setDoc(
      docRef,
      { dashboardPassword: hashedPassword },
      { merge: true }
    );
    alert("Password set successfully");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer isDarkMode={isDarkMode}>
        <Title>Set Dashboard Password</Title>
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button onClick={handlePasswordSave}>Save Password</Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PasswordSetupModal;
