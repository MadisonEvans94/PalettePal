import React from "react";
import { Link } from "react-router-dom";

import ProfileAccessButton from "./ProfileAccessButton";

const NavBar: React.FC = () => {
	return (
		<nav className="flex justify-between px-8 py-4 bg-neutral-500 items-center">
			<Link to="/">Palette Pal</Link>
			<ProfileAccessButton />
		</nav>
	);
};

export default NavBar;
