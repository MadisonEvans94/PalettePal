import React, { useState } from "react";
import { ReactComponent as RightCaret } from "../assets/icons/CaretRight.svg";
import { ReactComponent as LeftCaret } from "../assets/icons/CaretLeft.svg";
import { useAppContext } from "../Contexts/AppContext";
import { Palette } from "../types";
import { useNavigate } from "react-router-dom";
interface PaletteCardProps {
	palette: Palette;
}
const PaletteCard: React.FC<PaletteCardProps> = ({ palette }) => {
	const [colorCount, setColorCount] = useState<number>(2);
	const { setActivePalette, setActiveImageUrl } = useAppContext();
	const navigate = useNavigate();
	const handleColorIncrement = () => {
		setColorCount((prevCount) =>
			prevCount < palette.clusterData.clusters.length - 1
				? prevCount + 1
				: prevCount
		);
	};

	const handleColorDecrement = () => {
		setColorCount((prevCount) =>
			prevCount > 0 ? prevCount - 1 : prevCount
		);
	};

	const openInPaletteView = () => {
		setActivePalette(palette);
		setActiveImageUrl(palette.imageUrl);
		navigate("/palette-view");
	};

	return (
		<div className="border border-black max-w-[800px] h-fit mx-auto bg-neutral-300 rounded-lg overflow-hidden">
			<div className="flex">
				<div className="w-80 h-80 bg-gray-200 flex items-center justify-center">
					{palette.imageUrl && (
						<img
							className="object-cover w-full h-full"
							src={palette.imageUrl}
							alt="sample"
						/>
					)}
				</div>
				<div className="w-2/3 bg-white p-4 flex flex-col justify-between">
					<div className="flex justify-between items-center space-x-2">
						<h2 className="text-2xl font-bold">{palette.name}</h2>
						<div className="flex space-x-2">
							<button className="px-3 py-1 bg-red-600 text-white rounded">
								Delete
							</button>
							<button className="px-3 py-1 bg-blue-600 text-white rounded">
								Copy Palette
							</button>
						</div>
					</div>

					<div className="flex items-center justify-between my-6">
						<LeftCaret
							className="w-4 cursor-pointer"
							onClick={handleColorDecrement}
						/>
						<div className="flex space-x-2">
							{palette.clusterData.clusters[colorCount].map(
								(color) => {
									return (
										<div
											key={color}
											style={{ backgroundColor: color }}
											className="w-6 h-6 rounded-full"
										/>
									);
								}
							)}
						</div>
						<RightCaret
							className="w-4 cursor-pointer"
							onClick={handleColorIncrement}
						/>
					</div>

					<button
						onClick={openInPaletteView}
						className="px-3 py-1 border border-gray-400 text-gray-700 rounded self-center"
					>
						Open In Palette View
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaletteCard;
