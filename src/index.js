// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import RecaptchaGate from "./components/RecaptchaGate";
// import ErrorBoundary from "./components/ErrorBoundary";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// const Main = () => {
//   const [isVerified, setIsVerified] = React.useState(false);

//   const handleVerification = (token) => {
//     console.log("ReCAPTCHA Token:", token); // Do something with the token
//     setIsVerified(true); // Update verification state
//   };

//   return (
//     <React.StrictMode>
//       {!isVerified ? (
//         <RecaptchaGate onVerified={handleVerification} />
//       ) : (
//         <App />
//       )}
//     </React.StrictMode>
//   );
// };

// root.render(<Main />);
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Import contexts or routers if needed
import { BrowserRouter as Router } from "react-router-dom";
// import { MyContextProvider } from "./context/MyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      {/* <MyContextProvider> */}
      <App />
      {/* </MyContextProvider> */}
    </Router>
  </React.StrictMode>
);
