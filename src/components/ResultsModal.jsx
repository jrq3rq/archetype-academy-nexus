// src/components/ResultsModal.jsx

import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import ArchetypeCard from "./ArchetypeCard";
import LoadingSpinner from "./LoadingSpinner";
import QRCodeSection from "./QRCodeSection";

const ModalContent = styled.div`
  position: relative;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.5rem;
`;

const ModalHeader = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 10px;
`;

const ScoresContainer = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
`;

const ScoreParagraph = styled.p`
  margin: 10px 0;
`;

const ResultsModal = ({
  isOpen,
  onClose,
  loading,
  scores,
  matchedArchetype,
  selectedArchetype,
  complementaryArchetype,
  qrCodeData,
  showQRCode,
  generateQRCode,
  isQRCodeGenerating,
  qrButtonLabel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Results Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
        },
        content: {
          backgroundColor: "#2E3136",
          borderRadius: "12px",
          padding: "20px",
          width: "50%",
          maxWidth: "600px",
          height: "auto",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          color: "#ffffff",
          margin: "0",
          transform: "translate(0, 0)",
          zIndex: "1000",
        },
      }}
    >
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ModalHeader>Mind Pulse-150 Results</ModalHeader>
            <ScoresContainer>
              {Object.entries(scores).map(([trait, score]) => (
                <ScoreParagraph key={trait}>
                  <strong>{trait}:</strong> {score}
                </ScoreParagraph>
              ))}
            </ScoresContainer>

            {showQRCode && qrCodeData && (
              <QRCodeSection
                qrCodeData={qrCodeData}
                generateQRCode={generateQRCode}
                isQRCodeGenerating={isQRCodeGenerating}
                qrButtonLabel={qrButtonLabel}
              />
            )}

            <ArchetypeCard
              title="Matched Archetype"
              name={matchedArchetype}
              imagePath={selectedArchetype.imagePath}
              profileUrl={selectedArchetype.profileUrl}
            />

            {complementaryArchetype.name && (
              <ArchetypeCard
                title="Complementary Archetype"
                name={complementaryArchetype.name}
                imagePath={complementaryArchetype.imagePath}
                reasoning={complementaryArchetype.reasoning}
              />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

ResultsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  matchedArchetype: PropTypes.string.isRequired,
  selectedArchetype: PropTypes.object.isRequired,
  complementaryArchetype: PropTypes.object.isRequired,
  qrCodeData: PropTypes.string.isRequired,
  showQRCode: PropTypes.bool.isRequired,
  generateQRCode: PropTypes.func.isRequired,
  isQRCodeGenerating: PropTypes.bool.isRequired,
  qrButtonLabel: PropTypes.string.isRequired,
};

export default ResultsModal;
