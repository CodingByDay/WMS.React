import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

/**
 * Matches previous per-screen checkUID(): redirect to login only when uid cookie is missing.
 */
export default function ProtectedRoute({ children }) {
  const cookies = new Cookies();
  const uid = cookies.get("uid");
  if (typeof uid === "undefined") {
    return <Navigate to="/" replace />;
  }
  return children;
}
