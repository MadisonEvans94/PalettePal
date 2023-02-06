import React from "react";
import "./Palette.css";

const Palette = ({ centroid_rgb }) => {
	console.log(
		"value of centroid_rgb after it's been passed as a prop " + centroid_rgb
	);
	if (centroid_rgb === undefined) {
		return <></>;
	}

	const colorList = centroid_rgb.map((color, index) => (
		<li key={index} className="colorBlock" style={{ margin: "4rem 1rem" }}>
			<div
				style={{
					background: `${color}`,
					borderRadius: "2rem",
					height: "100%",
					width: "100%",
					textAlign: "center",
				}}>
				{color}
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
