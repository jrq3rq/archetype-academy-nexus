const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#1e2124",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
    alignItems: "center",
    overflowY: "auto",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  questionContainer: {
    backgroundColor: "#2E3136",
    padding: "20px",
    borderRadius: "10px",
    width: "auto",
    maxWidth: "700px",
    marginBottom: "20px",
    color: "#ffffff",
    border: "1px solid #2E3136",
  },
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "20px",
  },
  navButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    color: "#2E3136",
    transition: "background-color 0.3s",
    minWidth: "100px",
    border: "1px solid #2E3136",
  },
  submitButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#45FE47",
    color: "#282c34",
    transition: "background-color 0.3s",
    minWidth: "100px",
    border: "1px solid #2E3136",
  },
  modal: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      padding: "0",
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
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
      zIndex: "1000",
    },
  },
  scoresContainer: {
    marginTop: "60px",
    marginBottom: "20px",
    fontSize: "18px",
    textAlign: "center",
  },
  scoreItem: {
    margin: "10px 0",
  },
  qrCodeContainer: {
    textAlign: "center",
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#333",
    borderRadius: "10px",
  },
  qrButton: {
    padding: "10px 20px",
    backgroundColor: "#45FE47",
    color: "#000000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  autoPopup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#2E3136",
    borderRadius: "12px",
    padding: "20px",
    width: "50%",
    maxWidth: "600px",
    height: "auto",
    maxHeight: "80vh",
    overflowY: "auto",
    color: "#ffffff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "transparent",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "1.5rem",
  },
};

export default styles;