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
		<nav className="flex items-center justify-between flex-wrap backdrop-blur-3xl border-b p-6 w-full lg:h-26">
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
					<Hamburger className="h-5 w-5" />
				</button>
			</div>
			<div
				className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
					isOpen ? "" : "hidden"
				}`}>
				<div className="text-sm w-full lg:flex lg:flex-row justify-end items-end">
					<InputButton
						buttonText="Upload Image"
						styleProp="lg:border lg:p-2 lg:rounded block mt-4 lg:inline-block lg:mt-0 text-white text-md hover:text-white mr-4 cursor-pointer hover:lg:bg-white hover:lg:text-black transition"
					/>

					<Link
						onClick={() => setIsOpen(false)}
						to="/palette-view"
						className="lg:border lg:p-2 lg:rounded block mt-4 lg:inline-block lg:mt-0 text-white text-md  hover:text-white mr-4 cursor-pointer hover:lg:bg-white hover:lg:text-black transition">
						Palette View
					</Link>

					{isAuthenticated && (
						<Link
							onClick={() => setIsOpen(false)}
							to="/dashboard"
							className="block text-md lg:border lg:p-2 lg:rounded mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 cursor-pointer hover:lg:bg-white hover:lg:text-black transition">
							Dashboard
						</Link>
					)}
					{isAuthenticated ? (
						<div
							onClick={logout}
							className="flex flex-row mt-4 lg:inline-block lg:mt-0 text-white hover:text-white cursor-pointer">
							<LogoutBtn size="24px" />
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
