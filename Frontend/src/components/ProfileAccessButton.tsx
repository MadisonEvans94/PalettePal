import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as ProfileAccessIcon } from "../assets/icons/ProfileAccessIcon.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProfileAccessButton: React.FC = () => {
	const [showProfileOptions, setShowProfileOptions] =
		useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { logOut } = useAuth();
	const handleLinkClick = () => {
		setShowProfileOptions(false);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowProfileOptions(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<div className="relative text-white" ref={dropdownRef}>
			<button onClick={() => setShowProfileOptions((prev) => !prev)}>
				<ProfileAccessIcon />
			</button>
			{showProfileOptions && (
				<div className="absolute z-50 -left-32 rounded-lg bg-neutral-400 flex flex-col overflow-hidden">
					<Link
						to="/palette-view"
						className="p-2 hover:bg-neutral-700"
						onClick={handleLinkClick}
					>
						Palette View
					</Link>
					<Link
						to="/dashboard"
						className="p-2 hover:bg-neutral-700"
						onClick={handleLinkClick}
					>
						Dashboard
					</Link>

					<button
						onClick={() => {
							logOut();
							setShowProfileOptions(false);
						}}
						className="p-2 hover:bg-neutral-700"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfileAccessButton;
