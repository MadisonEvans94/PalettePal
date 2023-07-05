import React from "react";

const PaletteCard = ({ paletteInfo }) => {
	return (
		<div className="shadow-lg h-48 mx-auto max-w-4xl rounded-lg flex flex-row overflow-hidden">
			<div className="w-full flex flex-row">
				<div className="w-2/3 relative">
					<img
						className="absolute h-full w-full object-cover object-center"
						src={paletteInfo.imgUrl}
						alt=""
					/>
				</div>
				<div>
					<p>{paletteInfo.name}</p>
					<p>{paletteInfo.date}</p>
				</div>
			</div>
			<div className="w-full justify-center items-center flex space-x-2 p-2">
				{paletteInfo.palette.map((color, index) => {
					return (
						<div
							key={index}
							className="h-20 w-20 rounded-full"
							style={{ backgroundColor: color }}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default PaletteCard;
