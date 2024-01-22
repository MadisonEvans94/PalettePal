import React, { useState } from "react";
import { ReactComponent as RightCaret } from "./assets/svg/CaretRight.svg";
import { ReactComponent as LeftCaret } from "./assets/svg/CaretLeft.svg";
import { ClusterData } from "./AppContext";

// TODO: fix the redundancy
export type PaletteCardProps = {
	paletteData: ClusterData;
};
const PaletteCard: React.FC<PaletteCardProps> = ({ paletteData }) => {
	const [colorCount, setColorCount] = useState<number>(2);
	const handleColorIncrement = () => {
		setColorCount((prevCount) =>
			prevCount < paletteData.clusters.length - 1
				? prevCount + 1
				: prevCount
		);
	};

	const handleColorDecrement = () => {
		setColorCount((prevCount) =>
			prevCount > 0 ? prevCount - 1 : prevCount
		);
	};
	return (
		<div className="border border-black max-w-[800px] mx-auto bg-neutral-300 rounded-lg overflow-hidden">
			<div className="flex">
				<div className="w-1/3 bg-gray-200 flex items-center justify-center">
					<img
						className="object-cover w-full h-full"
						src="https://images.unsplash.com/photo-1586455122341-927f2dec0691?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="sample"
					/>
				</div>
				<div className="w-2/3 bg-white p-4 flex flex-col justify-between">
					<div className="flex justify-end space-x-2">
						<button className="px-3 py-1 bg-red-600 text-white rounded">
							Delete
						</button>
						<button className="px-3 py-1 bg-blue-600 text-white rounded">
							Copy Palette
						</button>
					</div>

					<div className="flex items-center justify-between my-6">
						<LeftCaret
							className="w-4 cursor-pointer"
							onClick={handleColorDecrement}
						/>
						<div className="flex space-x-2">
							{paletteData.clusters[colorCount].map((color) => {
								return (
									<div
										style={{ backgroundColor: color }}
										className="w-6 h-6 rounded-full"
									/>
								);
							})}
						</div>
						<RightCaret
							className="w-4 cursor-pointer"
							onClick={handleColorIncrement}
						/>
					</div>

					<button className="px-3 py-1 border border-gray-400 text-gray-700 rounded self-center">
						Open In Palette View
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaletteCard;
