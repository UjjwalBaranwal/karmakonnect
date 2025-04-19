import { Navigate } from "react-router";
import { useUser } from "../Context/UserContext";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  console.log(user);

  return user ? children : <Navigate to="/signup-user" />;
}

export default ProtectedRoute;
