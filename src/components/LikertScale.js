import React from "react";

const LikertScale = ({ question, name, onChange }) => {
  return (
    <div
      style={{
        backgroundColor: "#2E3136",
        padding: "15px",
        marginBottom: "25px",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "16px", // Adjust font size for better readability
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
        <label style={{ marginRight: "10px" }}>
          <input
            type="radio"
            name={name}
            value="1"
            onChange={onChange}
            style={{ marginRight: "5px" }} // Space between the radio button and label
          />
          Very Inaccurate
        </label>
        <label style={{ marginRight: "10px" }}>
          <input
            type="radio"
            name={name}
            value="2"
            onChange={onChange}
            style={{ marginRight: "5px" }}
          />
          Somewhat Inaccurate
        </label>
        <label style={{ marginRight: "10px" }}>
          <input
            type="radio"
            name={name}
            value="3"
            onChange={onChange}
            style={{ marginRight: "5px" }}
          />
          Neither Accurate Nor Inaccurate
        </label>
        <label style={{ marginRight: "10px" }}>
          <input
            type="radio"
            name={name}
            value="4"
            onChange={onChange}
            style={{ marginRight: "5px" }}
          />
          Somewhat Accurate
        </label>
        <label>
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
