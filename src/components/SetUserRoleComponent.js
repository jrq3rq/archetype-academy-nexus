import React, { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

const SetUserRoleComponent = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Initialize Firebase Functions
  const functions = getFunctions();
  const setUserRole = httpsCallable(functions, "setUserRole");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      // Call the function with user ID and role
      const result = await setUserRole({ uid: userId, role });
      setMessage(`Role "${role}" assigned successfully to user "${userId}".`);
      console.log("Role set successfully:", result.data);
    } catch (error) {
      console.error("Error setting role:", error);
      setMessage(
        "Failed to set role. Please check the console for more details."
      );
      setIsError(true);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h3>Set User Role</h3>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{ width: "100%", margin: "8px 0", padding: "8px" }}
          />
        </label>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", margin: "8px 0", padding: "8px" }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          Set Role
        </button>
      </form>
      {message && (
        <p style={{ color: isError ? "red" : "green", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SetUserRoleComponent;
