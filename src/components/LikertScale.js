import React from "react";

const LikertScale = ({ question, name, onChange, isDarkMode }) => {
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#2E3136" : "#f0f0f0", // Card background based on theme
        padding: "15px",
        marginBottom: "25px",
        borderRadius: "8px",
        transition: "background-color 0.3s", // Smooth transition
        border: "1px solid #2E3136", // Add a 1px solid black border
      }}
    >
      <div
        style={{
          backgroundColor: isDarkMode ? "#2E3136" : "#f0f0f0", // Question background based on theme
          color: "#2E3136", // Text color based on theme
          padding: "10px",
          borderRadius: "5px",
          fontSize: "18px", // Adjust font size for better readability
        }}
      >
        {question}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Add space between the items
          paddingTop: "10px",
          paddingLeft: "10px", // Add padding to the sides for spacing
          paddingRight: "10px",
          flexWrap: "wrap", // Allow wrapping for smaller screens
        }}
      >
        <label
          style={{
            marginRight: "10px",
            color: isDarkMode ? "#f0f0f0" : "#2E3136",
            fontSize: "14px", // Change the font size for this label
          }}
        >
          <input
            type="radio"
            name={name}
            value="1"
            onChange={onChange}
            style={{ marginRight: "5px" }} // Space between the radio button and label
          />
          Very Inaccurate
        </label>
        <label
          style={{
            marginRight: "10px",
            color: isDarkMode ? "#f0f0f0" : "#2E3136",
            fontSize: "14px", // Change the font size for this label
          }}
        >
          <input
            type="radio"
            name={name}
            value="2"
            onChange={onChange}
            style={{ marginRight: "5px" }}
          />
          Somewhat Inaccurate
        </label>
        <label
          style={{
            marginRight: "10px",
            color: isDarkMode ? "#f0f0f0" : "#2E3136",
            fontSize: "14px", // Change the font size for this label
          }}
        >
          <input
            type="radio"
            name={name}
            value="3"
            onChange={onChange}
            style={{ marginRight: "5px" }}
          />
          Neither Accurate Nor Inaccurate
        </label>
        <label
          style={{
            marginRight: "10px",
            color: isDarkMode ? "#f0f0f0" : "#2E3136",
            fontSize: "14px", // Change the font size for this label
          }}
        >
          <input
            type="radio"
            name={name}
            value="4"
            onChange={onChange}
            style={{ marginRight: "5px" }}
          />
          Somewhat Accurate
        </label>
        <label
          style={{
            color: isDarkMode ? "#f0f0f0" : "#2E3136",
            fontSize: "14px",
          }}
        >
          <input
            type="radio"
            name={name}
            value="5"
            onChange={onChange}
            style={{ marginRight: "5px" }}
          />
          Very Accurate
        </label>
      </div>
    </div>
  );
};

export default LikertScale;
