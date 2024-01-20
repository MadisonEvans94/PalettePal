import React, { useState } from "react";
import { ClusterData } from "./App";
import PaletteColorWidget from "./PaletteColorWidget";

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
