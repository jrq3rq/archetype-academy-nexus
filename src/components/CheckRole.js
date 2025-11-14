import { useEffect } from "react";
import { auth } from "../services/firebaseConfig";

const CheckRole = () => {
  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser
        .getIdTokenResult()
        .then((idTokenResult) => {
          console.log("User Role:", idTokenResult.claims.role); // Logs the user's role
        })
        .catch((error) => {
          console.error("Error fetching token claims:", error);
        });
    } else {
      console.log("No user is logged in.");
    }
  }, []); // Runs once when the component mounts

  return null; // You can optionally display some output here if needed
};

export default CheckRole;
