import React from "react";
import "./Palette.css";

const Palette = ({ centroid_rgb }) => {
	if (centroid_rgb === undefined) {
		return <></>;
	}

	const colorList = centroid_rgb.map((color, index) => (
		<li key={index} className="colorBlock" style={{ margin: "1em 0 0 0" }}>
			<div
				style={{
					background: `${color}`,
					height: "100%",
					width: "100%",
					textAlign: "center",
				}}>
				{/* {color} */}
			</div>
		</li>
	));
	return (
		<>
			<div className="palette">
				<ul>{colorList}</ul>
			</div>
		</>
	);
};

export default Palette;
