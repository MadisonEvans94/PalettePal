import React from "react";
import "./ContentSection.css";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import Input from "../Input/Input.jsx";
import { useState } from "react";

const ContentSection = () => {
	const [pixelData, setPixelData] = useState([]);
	const [centroidRGB, setCentroidRGB] = useState([
		"rgba(255,255,255)",
		"rgba(255,255,255)",
		"rgba(255,255,255)",
	]);

	return (
		<>
			<div className="content-section-container">
				<Input setPixelDataForParent={setPixelData} />

				<div className="plot-container">
					{/* setPalette={setPalette}  */}
					<CustomPlot pixelData={pixelData} setCentroidRGB={setCentroidRGB} />
					<Palette paletteArray={centroidRGB} />
				</div>
			</div>
		</>
	);
};

export default ContentSection;
