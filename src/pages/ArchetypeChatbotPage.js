import React, { useState } from "react";

const ArchetypeChatbotPage = () => {
  const [message, setMessage] = useState("");

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
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
    },
    chatWindow: {
      backgroundColor: "#36393f",
      borderRadius: "5px",
      padding: "15px",
      marginBottom: "20px",
      height: "300px",
      overflowY: "auto",
    },
    input: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#40444b",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#7289da",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  const handleSendMessage = () => {
    // Placeholder for message sending logic
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Archetype Chatbot</h1>
      <div style={styles.chatWindow}>
        {/* Chat messages would be displayed here */}
      </div>
      <input
        style={styles.input}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button style={styles.button} onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ArchetypeChatbotPage;
