import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as PP } from "../assets/icons/PP.svg";
// import ProfileAccessButton from "./ProfileAccessButton";

const NavBar: React.FC = () => {
	return (
		<nav className="flex bg-dark justify-between px-8 py-4 items-center">
			<Link to="/">
				<PP className="w-fit h-10" />
			</Link>
			{/* <ProfileAccessButton /> */}
		</nav>
	);
};

export default NavBar;
