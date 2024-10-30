// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({
  component: Component,
  redirectPath = "/signin",
  requiredRole,
  ...rest
}) => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  // Show a loading state while authentication status is being checked
  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>; // Optional: use a spinner here for better UX
  }

  // Redirect to sign-in if user is not authenticated
  if (!isAuthenticated) {
    return <Redirect to={redirectPath} />;
  }

  // Redirect to an unauthorized page if the user's role does not match the requiredRole
  if (requiredRole && user?.role !== requiredRole) {
    return <Redirect to="/unauthorized" />;
  }

  // Render the component if authentication and role checks pass
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
