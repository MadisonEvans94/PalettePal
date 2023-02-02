import React from "react";
import "./ContentSection.css";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import Input from "../Input/Input.jsx";
import { useState } from "react";

const ContentSection = () => {
	const [pixelData, setPixelData] = useState([]);
	const [palette, setPalette] = useState([]);
	if (palette.length > 0) {
		return (
			<>
				<div className="content-section-container">
					<Input setPixelDataForParent={setPixelData} />

					<div className="plot-container">
						<CustomPlot pixelData={pixelData} setPalette={setPalette} />
						<Palette
							paletteArray={[`${palette[0]}`, `${palette[1]}`, `${palette[2]}`]}
						/>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="content-section-container">
					<Input setPixelDataForParent={setPixelData} />

					<div className="plot-container">
						<CustomPlot pixelData={pixelData} setPalette={setPalette} />
						<Palette paletteArray={["#FFF", "#FFF", "#FFF"]} />
					</div>
				</div>
			</>
		);
	}
};

export default ContentSection;
