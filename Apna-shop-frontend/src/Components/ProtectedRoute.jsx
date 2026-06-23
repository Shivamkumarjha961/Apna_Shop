import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    // Alert user first
    alert("⚠️ Access denied. Please login first to view this page.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
