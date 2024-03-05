import React from "react";
import { ClusterData } from "../types";

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
		<div className="flex justify-center items-center pb-12">
			<button
				onClick={decrementColorCount}
				disabled={colorCount === 0}
				className={`w-12 h-12 text-2xl font-bold transition text-white rounded ${
					colorCount === 0
						? "opacity-50 bg-dark"
						: "bg-dark hover:bg-theme1"
				}`}
			>
				-
			</button>
			<span className="text-lg px-4 text-dark font-bold">
				{colorCount + 1}
			</span>{" "}
			<button
				onClick={incrementColorCount}
				disabled={colorCount === clusterData.clusters.length - 1}
				className={`text-2xl w-12 h-12 font-bold transition text-white rounded ${
					colorCount === clusterData.clusters.length - 1
						? "opacity-50 bg-dark"
						: "bg-dark hover:bg-theme1"
				}`}
			>
				+
			</button>
		</div>
	);
};

export default ColorCounter;
