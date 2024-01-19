import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
	return (
		<nav className="flex-none py-4">
			<Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
		</nav>
	);
};

export default NavBar;
