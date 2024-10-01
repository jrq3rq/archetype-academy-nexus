// src/components/QRCodeSection.jsx

import React, { useRef } from "react";
import styled from "styled-components";
import { QRCodeCanvas } from "qrcode.react";
import PropTypes from "prop-types";

const QRContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  background-color: #333;
  border-radius: 10px;
`;

const DownloadButton = styled.button`
  padding: 10px 20px;
  background-color: #45fe47;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #66ff66;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const QRCodeSection = ({
  qrCodeData,
  generateQRCode,
  isQRCodeGenerating,
  qrButtonLabel,
}) => {
  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "ArchetypeAcademy-QRCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <QRContainer>
      <QRCodeCanvas
        ref={qrCodeRef}
        value={qrCodeData}
        size={128}
        level="H"
        includeMargin={true}
      />
      <DownloadButton onClick={downloadQRCode}>Download QR Code</DownloadButton>
    </QRContainer>
  );
};

QRCodeSection.propTypes = {
  qrCodeData: PropTypes.string.isRequired,
  generateQRCode: PropTypes.func.isRequired,
  isQRCodeGenerating: PropTypes.bool.isRequired,
  qrButtonLabel: PropTypes.string.isRequired,
};

export default QRCodeSection;
