import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as ProfileAccessIcon } from "./assets/svg/ProfileAccessIcon.svg";
import { Link } from "react-router-dom";

const ProfileAccessButton: React.FC = () => {
	const [showProfileOptions, setShowProfileOptions] =
		useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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
		<div className="relative" ref={dropdownRef}>
			<button onClick={() => setShowProfileOptions((prev) => !prev)}>
				<ProfileAccessIcon />
			</button>
			{showProfileOptions && (
				<div className="absolute bg-neutral-500 flex flex-col">
					<Link
						to="/dashboard"
						className="border"
						onClick={handleLinkClick}
					>
						Dashboard
					</Link>
					<Link
						to="/options"
						className="border"
						onClick={handleLinkClick}
					>
						Options
					</Link>
					<button
						onClick={() =>
							console.log("logout functionality goes here")
						}
						className="border"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfileAccessButton;
