import React from "react";

const Palette = ({ centroid_rgb }) => {
	if (centroid_rgb === undefined) {
		return <></>;
	}

	const colorList = centroid_rgb.map((color, index) => (
		<div key={index} className="md:w-full mx-2">
			<div
				className="h-full w-36 md:w-full"
				style={{
					background: `${color}`,
				}}>
				{/* {color} */}
			</div>
		</div>
	));
	return (
		<>
			<div className="flex overscroll-x-auto overflow-x-auto h-60 mx-10 ">
				{colorList}
			</div>
		</>
	);
};

export default Palette;
