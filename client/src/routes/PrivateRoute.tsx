import { useAuth } from "@/Context/AuthContext";
import { Navigate, Outlet } from "react-router";


const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div className="p-6">Checking authentication...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
