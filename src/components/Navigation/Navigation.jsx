import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu as Hamburger } from "react-icons/ai";
import { AccountContext } from "../Account";
import InputButton from "../Input/Input";
import { FiLogOut as LogoutBtn } from "react-icons/fi";
const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout, isAuthenticated } = useContext(AccountContext);
	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="flex flex-wrap items-center justify-between w-full p-6 border-b backdrop-blur-3xl lg:h-26">
			<div className="flex items-center flex-shrink-0 mr-6">
				<Link
					onClick={() => setIsOpen(false)}
					to="/"
					className="text-xl font-semibold tracking-tight transition cursor-pointer text-shade hover:text-primary">
					PP
				</Link>
			</div>
			<div className="block lg:hidden">
				<button
					onClick={handleClick}
					className="flex items-center px-3 py-2 border rounded cursor-pointer text-shade border-shade ">
					<Hamburger className="w-5 h-5" />
				</button>
			</div>
			<div
				className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
					isOpen ? "" : "hidden"
				}`}>
				<div className="items-end justify-end w-full text-sm lg:flex lg:flex-row">
					<InputButton
						buttonText="Upload Image"
						styleProp="block mt-4 mr-4 transition cursor-pointer text-shade lg:border lg:p-2 lg:rounded lg:inline-block lg:mt-0 text-md hover:text-white hover:lg:bg-primary hover:lg:border-primary hover:lg:text-info"
					/>

					<Link
						onClick={() => setIsOpen(false)}
						to="/palette-view"
						className="block mt-4 mr-4 transition cursor-pointer text-shade lg:border lg:p-2 lg:rounded lg:inline-block lg:mt-0 text-md hover:text-white hover:lg:bg-primary hover:lg:border-primary hover:lg:text-info">
						Palette View
					</Link>

					{isAuthenticated && (
						<Link
							onClick={() => setIsOpen(false)}
							to="/dashboard"
							className="block mt-4 mr-4 transition cursor-pointer text-shade lg:border lg:p-2 lg:rounded lg:inline-block lg:mt-0 text-md hover:text-white hover:lg:bg-primary hover:lg:border-primary hover:lg:text-info">
							Dashboard
						</Link>
					)}
					{isAuthenticated ? (
						<div
							onClick={logout}
							className="block mt-4 mr-4 transition cursor-pointer text-shade lg:border lg:p-2 lg:rounded lg:inline-block lg:mt-0 text-md hover:text-white hover:lg:bg-primary hover:lg:border-primary hover:lg:text-info">
							<LogoutBtn size="20px" />
						</div>
					) : (
						<Link
							onClick={() => setIsOpen(false)}
							to="/login"
							className="block mt-4 text-white cursor-pointer lg:inline-block lg:mt-0 hover:text-white">
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
