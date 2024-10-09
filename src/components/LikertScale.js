const LikertScale = ({ question, name, onChange, isDarkMode }) => {
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#2E3136" : "#f0f0f0", // Card background based on theme
        padding: "20px", // Adjusted padding
        borderRadius: "10px", // Rounded corners
        width: "90%", // Ensure full width for each card
        maxWidth: "700px", // Set a maximum width for the card
        marginBottom: "20px", // Spacing between cards
        color: isDarkMode ? "#ffffff" : "#000000", // Text color based on theme
        border: "1px solid #2E3136", // Border color
      }}
    >
      <div
        style={{
          backgroundColor: isDarkMode ? "#2E3136" : "#f0f0f0", // Question background based on theme
          color: isDarkMode ? "#ffffff" : "#000000", // Text color based on theme
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
          flexWrap: "wrap", // Allow wrapping for smaller screens
          justifyContent: "flex-start", // Align items to the left
          paddingTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        className="likert-options"
      >
        {["1", "2", "3", "4", "5"].map((value, index) => (
          <label
            key={value}
            style={{
              marginRight: index < 4 ? "10px" : "0", // Margin between labels
              color: isDarkMode ? "#f0f0f0" : "#2E3136",
              fontSize: "14px",
              textAlign: "left", // Align text to the left
              display: "flex", // Flex display for the label
              alignItems: "center", // Center items vertically
              flex: "1 0 18%", // Allow flexibility for each label and set a base width for each
              minWidth: "100px", // Minimum width to ensure labels don’t shrink too small
            }}
          >
            <input
              type="radio"
              name={name}
              value={value}
              onChange={onChange}
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
            flex-direction: column; /* Stack vertically on mobile */
            align-items: flex-start; /* Align items to the start */
          }
          .likert-options label {
            margin-bottom: 10px; /* Add space between stacked items */
            margin-right: 0; /* Remove margin on the right */
            width: 100%; /* Ensure full width for each label */
          }
        }

        @media (min-width: 481px) and (max-width: 700px) {
          .likert-options label {
            flex: 1 0 45%; /* Allow two options per row in this range */
          }
        }

        @media (min-width: 701px) {
          .likert-options label {
            flex: 1 0 18%; /* Default to four options per row for larger screens */
          }
        }
      `}</style>
    </div>
  );
};

// Function to get the label text based on value
const getLabelText = (value) => {
  switch (value) {
    case "1":
      return "Strongly Disagree";
    case "2":
      return "Disagree";
    case "3":
      return "Neutral"; // No change needed
    case "4":
      return "Agree"; // Changed from "Somewhat True"
    case "5":
      return "Strongly Agree"; // Changed from "Very True"
    default:
      return "";
  }
};

export default LikertScale;
