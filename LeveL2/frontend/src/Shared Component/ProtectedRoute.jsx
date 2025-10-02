import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // you should save this on login

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />; // redirect home if not allowed
  }

  return children;
}

export default ProtectedRoute;
