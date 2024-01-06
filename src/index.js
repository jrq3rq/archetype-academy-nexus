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
