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
					}}
					autoPlay
					loop
					muted>
					<source src={videoUrl} type="video/mp4" />
				</video>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						background:
							"linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%)",
					}}></div>

				<div
					style={{
						position: "relative",
						margin: "0 1rem",
					}}>
					<h1 style={{ margin: "5rem 0 5rem 0" }}>Palette Pal</h1>
					<p>
						Welcome to Palette Pal, an interactive color picker! Simply upload
						an image and receive a color palette suggestion based on that image!
					</p>
					{/* image input button */}
				</div>
			</div>
		</>
	);
};

export default SideBar;
