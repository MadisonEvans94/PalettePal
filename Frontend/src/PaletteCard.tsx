import React from "react";
import { ReactComponent as RightCaret } from "./assets/svg/CaretRight.svg";
import { ReactComponent as LeftCaret } from "./assets/svg/CaretLeft.svg";

const PaletteCard: React.FC = () => {
	return (
		<div className="border border-black max-w-[800px] mx-auto bg-neutral-300 rounded-lg overflow-hidden">
			<div className="flex">
				<div className="w-1/3 bg-gray-200 p-4 flex items-center justify-center">
					<span className="text-gray-500">Image section</span>
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
						<LeftCaret className="w-4 cursor-pointer" />
						<div className="flex space-x-2">
							<div className="w-6 h-6 bg-green-500 rounded-full" />
							<div className="w-6 h-6 bg-orange-500 rounded-full" />
							<div className="w-6 h-6 bg-purple-500 rounded-full" />
						</div>
						<RightCaret className="w-4 cursor-pointer" />
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
