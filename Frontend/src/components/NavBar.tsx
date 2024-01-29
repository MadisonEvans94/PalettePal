import React from "react";
import { Link } from "react-router-dom";

import ProfileAccessButton from "./ProfileAccessButton";

const NavBar: React.FC = () => {
	const askAmILoggedIn = () => {
		const token = localStorage.getItem("access_token");
		if (token)
			console.log("Yes, you are logged in. This is your token: " + token);
		else console.log("No you are not logged in");
	};
	return (
		<nav className="flex justify-between px-8 py-4 bg-neutral-500 items-center">
			<Link to="/">Palette Pal</Link>
			<ProfileAccessButton />
			<button className="rounded bg-white p-1" onClick={askAmILoggedIn}>
				am I logged in?
			</button>
		</nav>
	);
};

export default NavBar;
