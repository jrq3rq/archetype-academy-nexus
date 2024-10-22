import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./ReCaptchaComponent.css";

export default function RecaptchaGate({ onVerified }) {
  const [error, setError] = useState("");

  const handleVerify = (value) => {
    if (value) {
      setError(""); // Reset error on successful verification
      onVerified(value); // This value should be the reCAPTCHA token
    } else {
      setError("Verification failed. Please try again.");
    }
  };

  return (
    <div className="recaptcha-container">
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={handleVerify}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
