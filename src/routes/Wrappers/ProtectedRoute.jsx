// PrivateRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../../components/Account";
const PrivateRoute = ({ children }) => {
	const { isAuthenticated } = useContext(AccountContext);
	const location = useLocation();

	return isAuthenticated ? (
		children
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
};

export default PrivateRoute;
