import React from "react";
import videoUrl from "../../assets/paint.mp4";
import "./SideBar.css";

/**
 * @module SideBar
 * @desc A component that renders the sidebar of the Palette Pal app
 * @returns {JSX.Element} The JSX element that renders the SideBar component
 */
const SideBar = () => {
	return (
		<>
			<div className="sidebar-container">
				<video
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						top: 0,
						left: 0,
						objectFit: "cover",
						opacity: 0.5,
					}}
					autoPlay
					loop
					muted>
					<source src={videoUrl} type="video/mp4" />
				</video>

				<div
					style={{
						margin: "0 0 2rem 0",
						position: "relative",
					}}>
					<h1>Palette Pal</h1>
					<p>Welcome to Palette Pal, an interactive color picker!</p>
					{/* image input button */}
				</div>
			</div>
		</>
	);
};

export default SideBar;
