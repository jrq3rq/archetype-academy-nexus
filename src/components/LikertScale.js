const LikertScale = ({ question, name, onChange, isDarkMode }) => {
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#2E3136" : "#f0f0f0",
        padding: "20px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "800px",
        color: isDarkMode ? "#ffffff" : "#000000",
        border: "1px solid #2E3136",
      }}
    >
      <div
        style={{
          backgroundColor: isDarkMode ? "#2E3136" : "#f0f0f0",
          color: isDarkMode ? "#ffffff" : "#000000",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "18px",
        }}
      >
        {question}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          paddingTop: "10px",
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
        className="likert-options"
      >
        {["1", "2", "3", "4", "5"].map((value, index) => (
          <label
            key={value}
            style={{
              marginRight: index < 4 ? "10px" : "0",
              color: isDarkMode ? "#f0f0f0" : "#2E3136",
              fontSize: "14px",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              flex: "1 0 18%",
              minWidth: "100px",
            }}
          >
            <input
              type="radio"
              name={name}
              value={value}
              onChange={(event) => onChange(Number(event.target.value))} // Pass numeric value
              style={{ marginRight: "5px" }}
            />

            {getLabelText(value)}
          </label>
        ))}
      </div>

      {/* Responsive styles with media query */}
      <style>{`
        @media (max-width: 480px) {
          .likert-options {
            flex-direction: column;
            align-items: flex-start;
          }
          .likert-options label {
            margin-bottom: 10px;
            margin-right: 0;
            width: 100%;
          }
        }

        @media (min-width: 481px) and (max-width: 700px) {
          .likert-options label {
            flex: 1 0 45%;
          }
        }

        @media (min-width: 701px) {
          .likert-options label {
            flex: 1 0 18%;
          }
        }
      `}</style>
    </div>
  );
};

const getLabelText = (value) => {
  switch (value) {
    case "1":
      return "Strongly Disagree";
    case "2":
      return "Disagree";
    case "3":
      return "Neutral";
    case "4":
      return "Agree";
    case "5":
      return "Strongly Agree";
    default:
      return "";
  }
};

export default LikertScale;
