import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Loader from "./Loader";

function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading, accountStatus } = useUser();

  // Show the loader while the user data is being fetched
  if (loading) {
    return <Loader />;
  }

  // If loading is finished and no user is logged in, redirect to login
  if (!user && !accountStatus) {
    return <Navigate to="/account/login" />;
  }

  // If a required role is set and the user has the right role, allow access
  if (requiredRole && user?.userrole === requiredRole && accountStatus) {
    return children;
  }

  // If no required role or the role doesn't match, redirect to home
  return <Navigate to="/" />;
}

export default ProtectedRoute;
