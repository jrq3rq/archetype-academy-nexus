// src/pages/ProtectedDashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../components/Dashboard";

const ProtectedDashboard = ({ isDarkMode }) => {
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Temporarily set isAuthenticated to true for direct access
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <Dashboard isDarkMode={isDarkMode} />;
};

export default ProtectedDashboard;
