import { Outlet, replace, useNavigate } from "react-router";
import { useAuth } from "../context/UserContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading)
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (!user) return navigate("/", { replace: true });
  return <Outlet />;
}

export default ProtectedRoute;
