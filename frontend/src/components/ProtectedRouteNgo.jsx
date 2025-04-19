import { Navigate } from "react-router";
import { useNgo } from "../Context/NgoContext";

function ProtectedRouteNgo({ children }) {
  const { ngo } = useNgo();
  console.log(ngo);
  return ngo ? children : <Navigate to="/ngo" />;
}

export default ProtectedRouteNgo;
