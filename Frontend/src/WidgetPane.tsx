import React, { useState } from "react";
import { ClusterData } from "./App";
import PaletteRatioWidget from "./PaletteRatioWidget";
interface WidgetPaneProps {
	clusterData: ClusterData;
}

const WidgetPane: React.FC<WidgetPaneProps> = ({ clusterData }) => {
	const [colorCount, setColorCount] = useState<number>(2);
	console.log(clusterData);
	const incrementColorCount = () => {
		if (colorCount < clusterData.clusters.length - 1) {
			setColorCount(colorCount + 1);
		}
	};

	const decrementColorCount = () => {
		if (colorCount > 0) {
			setColorCount(colorCount - 1);
		}
	};

	return (
		<div className="bg-gray-800 text-white h-full w-full flex flex-col items-center">
			<PaletteRatioWidget
				clusterData={clusterData}
				decrementColorCount={decrementColorCount}
				colorCount={colorCount}
				incrementColorCount={incrementColorCount}
			/>
			<div className="flex justify-center items-center p-2">
				<button
					onClick={decrementColorCount}
					disabled={colorCount === 0}
					className={`px-3 py-1 border border-gray-400 rounded ${
						colorCount === 0 ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					-
				</button>
				<span className="text-lg px-4">{colorCount + 1}</span>{" "}
				<button
					onClick={incrementColorCount}
					disabled={colorCount === clusterData.clusters.length - 1}
					className={`px-3 py-1 border border-gray-400 rounded ${
						colorCount === clusterData.clusters.length - 1
							? "opacity-50 cursor-not-allowed"
							: ""
					}`}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default WidgetPane;
