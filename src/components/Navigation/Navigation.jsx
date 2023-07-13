import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { AccountContext } from "../Account";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useContext(AccountContext);
	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 w-full">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<Link
					onClick={() => setIsOpen(false)}
					to="/"
					className="font-semibold text-xl tracking-tight cursor-pointer">
					TITLE
				</Link>
			</div>
			<div className="block lg:hidden">
				<button
					onClick={handleClick}
					className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white cursor-pointer">
					<AiOutlineMenu className="h-6 w-6" />
				</button>
			</div>
			<div
				className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
					isOpen ? "" : "hidden"
				}`}>
				<div className="text-sm w-full lg:flex lg:flex-row justify-end items-end">
					<Link
						onClick={() => setIsOpen(false)}
						to="/upload-image"
						className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">
						Upload Image
					</Link>
					<Link
						onClick={() => setIsOpen(false)}
						to="/palette-view"
						className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">
						Palette View
					</Link>
					<Link
						onClick={() => setIsOpen(false)}
						to="/login"
						className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">
						Login
					</Link>
					<div
						onClick={logout}
						className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">
						logout test
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
