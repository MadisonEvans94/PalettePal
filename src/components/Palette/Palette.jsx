import React from "react";
import "./Palette.css";

const Palette = ({ centroid_rgb }) => {
	if (centroid_rgb === undefined) {
		return <></>;
	}

	const colorList = centroid_rgb.map((color, index) => (
		<div key={index} className="colorBlock">
			<div
				style={{
					background: `${color}`,
					height: "100%",
					width: "100%",
					textAlign: "center",
				}}>
				{/* {color} */}
			</div>
		</div>
	));
	return (
		<>
			<div className="flex flex-row overscroll-x-auto overflow-x-auto h-96">
				{colorList}
			</div>
		</>
	);
};

export default Palette;
