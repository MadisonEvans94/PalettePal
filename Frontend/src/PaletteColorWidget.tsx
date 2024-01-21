import React from "react";
import { ClusterData } from "./AppContext";

interface PaletteColorProps {
	color: string;
}

export interface PaletteColorWidgetProps {
	clusterData: ClusterData;
	colorCount: number;
}

const PaletteColor: React.FC<PaletteColorProps> = ({ color }) => {
	return (
		<div
			style={{ backgroundColor: color }}
			className="w-16 h-16 rounded-sm"
		/>
	);
};

const PaletteColorWidget: React.FC<PaletteColorWidgetProps> = ({
	clusterData,
	colorCount,
}) => {
	return (
		<div className="mx-auto p-4 flex flex-col">
			<div className="flex flex-row gap-1 justify-center">
				{clusterData.clusters[colorCount].map((cluster, id) => (
					<PaletteColor color={cluster} key={id} />
				))}
			</div>
		</div>
	);
};

export default PaletteColorWidget;
