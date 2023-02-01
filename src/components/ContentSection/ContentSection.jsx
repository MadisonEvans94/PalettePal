import React from "react";
import "./ContentSection.css";
import Palette from "../Palette/Palette";

const ContentSection = () => {
	return (
		<>
			<div className="content-section-container">
				<input type="file" id="image-input" accept="image/png, image/jpg" />

				{/* container where plotly plot will be */}
				<div class="plot-container">
					<div id="tester" class="plot"></div>
				</div>
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
