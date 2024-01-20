import React, { useState } from "react";
import { ClusterData } from "./App";

interface WidgetPaneProps {
	clusterData: ClusterData;
}

const WidgetPane: React.FC<WidgetPaneProps> = ({ clusterData }) => {
	const [colorCount, setColorCount] = useState<number>(2);

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
		<div className="bg-gray-800 text-white h-full flex items-center">
			<PaletteColorWidget
				clusterData={clusterData}
				colorCount={colorCount}
				decrementColorCount={decrementColorCount}
				incrementColorCount={incrementColorCount}
			/>
		</div>
	);
};

export default WidgetPane;

interface PaletteColorProps {
	color: string;
}

interface PaletteColorWidgetProps {
	clusterData: ClusterData;
	colorCount: number;
	decrementColorCount: () => void;
	incrementColorCount: () => void;
}

const PaletteColor: React.FC<PaletteColorProps> = ({ color }) => {
	return <div style={{ backgroundColor: color }} className="w-12 h-12" />;
};

const PaletteColorWidget: React.FC<PaletteColorWidgetProps> = ({
	clusterData,
	colorCount,
	decrementColorCount,
	incrementColorCount,
}) => {
	return (
		<div className="mx-auto p-4 flex flex-col">
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
						colorCount === clusterData.clusters.length - 1
							? "text-gray-500"
							: "text-gray-300 hover:text-white hover:border-white"
					}`}
					disabled={colorCount === clusterData.clusters.length - 1}
				>
					+
				</button>
			</div>
		</div>
	);
};
