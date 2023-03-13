import React from "react";

const Palette = ({ centroid_rgb }) => {
	if (centroid_rgb === undefined) {
		return <></>;
	}

	const colorList = centroid_rgb.map((color, index) => (
		<div
			key={index}
			className="
			h-full w-48 
			md:mx-2"
			style={{
				background: `${color}`,
			}}
		/>
	));

	return (
		<>
			<div className="overscroll-x-auto overflow-x-auto h-48 mx-10 flex flex-row justify-center ">
				{colorList}
			</div>
		</>
	);
};

export default Palette;
