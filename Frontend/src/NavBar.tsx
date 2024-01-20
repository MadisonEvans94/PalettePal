import React from "react";
import { Link } from "react-router-dom";

import ProfileAccessButton from "./ProfileAccessButton";

const NavBar: React.FC = () => {
	return (
		<nav className="flex py-4 bg-neutral-500">
			<Link className="border" to="/">
				Home
			</Link>
			<ProfileAccessButton />
		</nav>
	);
};

export default NavBar;
