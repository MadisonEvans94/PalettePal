import React from "react";
import "./ContentSection.css";
import CustomPlot from "../../prototyping/CustomPlot";

const ContentSection = () => {
	return (
		<>
			<div className="content-section-container">
				<div className="canvas">
					<canvas></canvas>
				</div>
				<div className="plot-container">
					<CustomPlot />
					test
				</div>
			</div>
		</>
	);
};

export default ContentSection;
