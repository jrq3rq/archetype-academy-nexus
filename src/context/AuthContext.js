// src/context/AuthContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => setIsAuthenticated(true);
  const signOut = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
