import React from "react";
import "./ContentSection.css";
import CustomPlot from "../Plot/CustomPlot";
import Palette from "../Palette/Palette.jsx";
import Input from "../Input/Input.jsx";
import { useState, useEffect } from "react";

const ContentSection = () => {
	const [pixelData, setPixelData] = useState([]);
	const [centroidRGB, setCentroidRGB] = useState([
		"rgba(255,255,255)",
		"rgba(255,255,255)",
		"rgba(255,255,255)",
	]);
	const [colorsNeedUpdate, setColorsNeedUpdate] = useState(false);

	useEffect(() => {
		console.log("color centroids updated");
		console.log(centroidRGB);
	}, [centroidRGB]);

	return (
		<>
			<div className="content-section-container">
				<Input
					setPixelDataForParent={setPixelData}
					setColorsNeedUpdate={setColorsNeedUpdate}
				/>

				<div className="plot-container">
					{/* setPalette={setPalette}  */}
					<CustomPlot
						pixelData={pixelData}
						setCentroidRGB={setCentroidRGB}
						setColorsNeedUpdate={setColorsNeedUpdate}
						colorsNeedUpdate={colorsNeedUpdate}
					/>
					<Palette paletteArray={centroidRGB} />
				</div>
			</div>
		</>
	);
};

export default ContentSection;
