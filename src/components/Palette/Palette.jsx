import React from "react";
import "./Palette.css";
const Palette = ({ paletteArray }) => {
	const colorList = paletteArray.map((color) => (
		<li key={color.toString()} className="colorBlock">
			<div>
				<div
					style={{
						backgroundColor: `${color}`,
						height: "100%",
						width: "100%",
						textAlign: "center",
					}}>
					{color}
				</div>
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
