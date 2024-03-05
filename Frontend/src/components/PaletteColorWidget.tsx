import React from "react";
import { ClusterData } from "../types";

interface PaletteColorProps {
	color: string;
}

export interface PaletteColorWidgetProps {
	clusterData: ClusterData;
	colorCount: number;
}

const PaletteColor: React.FC<PaletteColorProps> = ({ color }) => {
	const [isHovered, setIsHovered] = React.useState(false);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(color);
		} catch (e) {
			console.error("Copy to clipboard failed", e);
		}
	}

	return (
		<div
			style={{ backgroundColor: color }}
			className="w-16 h-16 rounded-sm cursor-pointer relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={copyToClipboard}
		>
			{isHovered && (
				<div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-1 bg-black text-white text-xs rounded">
					{color}
				</div>
			)}
		</div>
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
