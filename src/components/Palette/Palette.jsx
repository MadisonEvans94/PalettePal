import React from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
const Palette = ({ centroid_rgb }) => {
	const { centroidArray } = useContext(CentroidContext);

	// const colorList = centroidArray[2].map((color, index) => (
	// 	<div
	// 		key={index}
	// 		className="
	// 		h-full w-48 border
	// 		md:mx-2"
	// 		style={{
	// 			background: `${color}`,
	// 		}}
	// 	/>
	// ));

	return (
		<>
			<div className="w-screen overflow-x-auto h-48 flex flex-row justify-center">
				<div
					className="h-48 w-48 border md:mx-2 rounded-full flex-none"
					style={{
						background: "#F0F",
					}}
				/>
				<div
					className="h-48 w-48 border md:mx-2 rounded-full flex-none"
					style={{
						background: "#0FF",
					}}
				/>
				<div
					className="h-48 w-48 border md:mx-2 rounded-full flex-none"
					style={{
						background: "#00F",
					}}
				/>
				<div
					className="h-48 w-48 border md:mx-2 rounded-full flex-none"
					style={{
						background: "#00F",
					}}
				/>
			</div>
		</>
	);
};

export default Palette;
