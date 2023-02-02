import React from "react";
import "./ContentSection.css";
import CustomPlot from "../../prototyping/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import Input from "../Input/Input.jsx";
import { useState } from "react";

const ContentSection = () => {
	const [pixelData, setPixelData] = useState([]);
	return (
		<>
			<div className="content-section-container">
				<Input setPixelDataForParent={setPixelData} />

				<div className="plot-container">
					<CustomPlot pixelData={pixelData} />
					<Palette paletteArray={["#FFFFFF", "#A1A1A1", "#FF9FFE"]} />
				</div>
			</div>
		</>
	);
};

export default ContentSection;
