import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({ promptData, selectedArchetype }) => {
  const [showQRCode, setShowQRCode] = useState(false);

  const handleGenerateQRCode = () => {
    if (selectedArchetype) {
      setShowQRCode(true);
    } else {
      alert("Please select an archetype first.");
    }
  };

  const styles = {
    qrCodeSection: {
      marginTop: "20px",
      textAlign: "center",
    },
    qrButton: {
      padding: "10px 20px",
      backgroundColor: "#7289da",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    qrCodeContainer: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.qrCodeSection}>
      <button style={styles.qrButton} onClick={handleGenerateQRCode}>
        Generate QR Key
      </button>
      {showQRCode && (
        <div style={styles.qrCodeContainer}>
          <QRCodeCanvas value={JSON.stringify(promptData)} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
