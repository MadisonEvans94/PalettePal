// PrivateRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
const PrivateRoute = ({ children }) => {
	const { isAuthenticated } = useContext(UserContext);
	const location = useLocation();

	return isAuthenticated ? (
		children
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
};

export default PrivateRoute;
