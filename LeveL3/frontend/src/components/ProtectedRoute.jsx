import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  
  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - adminOnly:", adminOnly);
  console.log("ProtectedRoute - user.user.role:", user?.user?.role);

  if (!user) {
    console.log("No user, redirecting to login");
    return <Navigate to="/login" />;
  }
  if (adminOnly && user.user?.role !== "admin") {
    console.log("Not admin, redirecting to home");
    return <Navigate to="/" />;
  }
  console.log("Access granted");
  return children;
};

export default ProtectedRoute;
