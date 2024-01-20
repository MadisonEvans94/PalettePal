import React from "react";
import { ClusterData } from "./App";

interface ColorCounterProps {
	decrementColorCount: () => void;
	colorCount: number;
	incrementColorCount: () => void;
	clusterData: ClusterData;
}
const ColorCounter: React.FC<ColorCounterProps> = ({
	colorCount,
	decrementColorCount,
	incrementColorCount,
	clusterData,
}) => {
	return (
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
	);
};

export default ColorCounter;
