// ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/auth" replace />;
	}

	return <Outlet />; // Renders the matched child route.
};

export default ProtectedRoute;
