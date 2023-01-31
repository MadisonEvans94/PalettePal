import React from "react";
import "./ContentSection.css";
import Palette from "../Palette/Palette";

const ContentSection = () => {
	return (
		<>
			<div className="content-section-container">
				<div className="canvas">
					<canvas></canvas>
				</div>
				<h2>Palette</h2>
				<Palette></Palette>
			</div>
		</>
	);
};

export default ContentSection;
