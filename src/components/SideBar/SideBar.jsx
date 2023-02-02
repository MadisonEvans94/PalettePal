import React from "react";

import "./SideBar.css";

const SideBar = () => {
	return (
		<>
			<div className="sidebar-container">
				<div className="header">
					<h1>Palette Pal</h1>
					<p>
						Welcome to Palette Pal, an interactive web tool designed to help you
						develop a useful color scheme based on a reference image. Click on
						the canvas to upload a reference photo, or drag and drop an image to
						begin
					</p>
					{/* image input button */}
				</div>
				<div className="links">
					<a href="https://github.com/">github</a>
				</div>
			</div>
		</>
	);
};

export default SideBar;
