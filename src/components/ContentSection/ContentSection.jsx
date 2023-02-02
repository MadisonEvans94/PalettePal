import React from "react";
import "./ContentSection.css";
import CustomPlot from "../Plot/CustomPlot";
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
					{/* setPalette={setPalette}  */}
					<CustomPlot pixelData={pixelData} />
					<Palette
						paletteArray={[
							"rgba(12,8,7,1)",
							"rgba(202,142,127)",
							"rgba(117,69,69,1)",
						]}
					/>
				</div>
			</div>
		</>
	);
};

export default ContentSection;
