import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  component: Component,
  redirectPath = "/signin",
  requiredRole,
  isDarkMode,
  ...rest
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>; // Optional spinner
  }

  if (!user) {
    // Redirect to sign-in page if not authenticated
    return <Redirect to={redirectPath} />;
  }

  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} isDarkMode={isDarkMode} />}
    />
  );
};

export default ProtectedRoute;
