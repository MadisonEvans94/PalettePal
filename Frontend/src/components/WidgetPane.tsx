import React from "react";
import PaletteRatioWidget from "./PaletteRatioWidget";
import PaletteColorWidget from "./PaletteColorWidget";
import ColorCounter from "./ColorCounter";
import Carousel from "./Carousel";
import { WidgetPaneProps } from "../types";

const WidgetPane: React.FC<WidgetPaneProps> = ({
	clusterData,
	colorCount,
	setColorCount,
}) => {
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
	const componentsToCycle = [
		<PaletteColorWidget
			clusterData={clusterData}
			colorCount={colorCount}
			key="paletteColorWidget"
		/>,
		<PaletteRatioWidget
			clusterData={clusterData}
			colorCount={colorCount}
			key="paletteRatioWidget"
		/>,
	];

	return (
		<div className=" text-neutral-700 h-full w-full flex flex-col items-center">
			<Carousel components={componentsToCycle} />
			<ColorCounter
				decrementColorCount={decrementColorCount}
				colorCount={colorCount}
				incrementColorCount={incrementColorCount}
				clusterData={clusterData}
			/>
		</div>
	);
};

export default WidgetPane;
