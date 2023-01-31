import React from "react";
import Palette from "../Palette/Palette";

const ContentSection = () => {
	return (
		<>
			<div className="content-section-container">
				<div className="canvas">canvas goes here</div>
				<h2>Palette</h2>
				<Palette></Palette>
			</div>
		</>
	);
};

export default ContentSection;
