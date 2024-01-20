import React from "react";
import { ClusterData } from "./App";

interface PaletteColorProps {
	color: string;
}

export interface PaletteColorWidgetProps {
	clusterData: ClusterData;
	colorCount: number;
}

const PaletteColor: React.FC<PaletteColorProps> = ({ color }) => {
	return <div style={{ backgroundColor: color }} className="w-12 h-12" />;
};

const PaletteColorWidget: React.FC<PaletteColorWidgetProps> = ({
	clusterData,
	colorCount,
}) => {
	return (
		<div className="mx-auto p-4 flex flex-col">
			<div className="flex flex-row gap-1 justify-center mb-4">
				{clusterData.clusters[colorCount].map((cluster, id) => (
					<PaletteColor color={cluster} key={id} />
				))}
			</div>
		</div>
	);
};

export default PaletteColorWidget;
