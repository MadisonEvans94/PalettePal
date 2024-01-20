import React, { useState } from "react";
import { ClusterData } from "./App";

interface WidgetPaneProps {
	clusterData: ClusterData;
}

const WidgetPane: React.FC<WidgetPaneProps> = ({ clusterData }) => {
	const [colorCount, setColorCount] = useState<number>(2);

	const incrementColorCount = () => {
		if (colorCount < 5) {
			setColorCount(colorCount + 1);
		}
	};

	const decrementColorCount = () => {
		if (colorCount > 0) {
			setColorCount(colorCount - 1);
		}
	};

	return (
		<div className="bg-gray-800 text-white h-full flex items-center">
			<div className="mx-auto border p-4">
				<div className="flex flex-row gap-1 justify-center mb-4">
					{clusterData.clusters[colorCount].map((cluster, id) => (
						<PaletteColor color={cluster} key={id} />
					))}
				</div>
				<div className="flex items-center justify-center gap-2">
					<button
						onClick={decrementColorCount}
						className={`px-3 py-1 border border-gray-400 rounded ${
							colorCount === 0
								? "text-gray-500"
								: "text-gray-300 hover:text-white hover:border-white"
						}`}
						disabled={colorCount === 0}
					>
						-
					</button>
					<span className="text-lg">{colorCount + 1}</span>
					<button
						onClick={incrementColorCount}
						className={`px-3 py-1 border border-gray-400 rounded ${
							colorCount === 5
								? "text-gray-500"
								: "text-gray-300 hover:text-white hover:border-white"
						}`}
						disabled={colorCount === 5}
					>
						+
					</button>
				</div>
				<button className="mt-4 p-2 bg-blue-500 rounded text-white hover:bg-blue-600">
					Copy Palette
				</button>
			</div>
		</div>
	);
};

export default WidgetPane;

interface PaletteColorProps {
	color: string;
}

const PaletteColor: React.FC<PaletteColorProps> = ({ color }) => {
	return <div style={{ backgroundColor: color }} className="w-12 h-12" />;
};
