import React from "react";
import "./ContentSection.css";
import CustomPlot from "../../prototyping/CustomPlot";
import Palette from "../Palette/Palette.jsx";

const ContentSection = () => {
	return (
		<>
			<div className="content-section-container">
				<div className="canvas">
					<canvas></canvas>
				</div>
				<div className="plot-container">
					<CustomPlot />
					<Palette paletteArray={["#FFFFFF", "#A1A1A1", "#0F0F0F"]} />
				</div>
			</div>
		</>
	);
};

export default ContentSection;
