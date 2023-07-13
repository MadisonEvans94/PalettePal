import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { AccountContext } from "../Account";
import InputButton from "../Input/Input";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout, isAuthenticated } = useContext(AccountContext);
	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="flex items-center justify-between flex-wrap backdrop-blur-3xl border-b p-6 w-full">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<Link
					onClick={() => setIsOpen(false)}
					to="/"
					className="font-semibold text-xl tracking-tight cursor-pointer">
					PP
				</Link>
			</div>
			<div className="block lg:hidden">
				<button
					onClick={handleClick}
					className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white cursor-pointer">
					<AiOutlineMenu className="h-6 w-6" />
				</button>
			</div>
			<div
				className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
					isOpen ? "" : "hidden"
				}`}>
				<div className="text-sm w-full lg:flex lg:flex-row justify-end items-end">
					<InputButton
						buttonText="upload image"
						styleProp="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white cursor-pointer"
					/>

					<Link
						onClick={() => setIsOpen(false)}
						to="/palette-view"
						className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 cursor-pointer">
						Palette View
					</Link>

					{isAuthenticated && (
						<Link
							onClick={() => setIsOpen(false)}
							to="/dashboard"
							className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 cursor-pointer">
							Dashboard
						</Link>
					)}
					{isAuthenticated ? (
						<div
							onClick={logout}
							className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white cursor-pointer">
							Logout
						</div>
					) : (
						<Link
							onClick={() => setIsOpen(false)}
							to="/login"
							className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white cursor-pointer">
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
