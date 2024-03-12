import React from "react";
import { ClusterData } from "../types";
// TODO: move interfaces to index.ts
// TODO: add copy feedback
interface PaletteColorProps {
	color: string;
}

export interface PaletteColorWidgetProps {
	clusterData: ClusterData;
	colorCount: number;
}

const PaletteColor: React.FC<PaletteColorProps> = ({ color }) => {
	const [isHovered, setIsHovered] = React.useState(false);

	const hexToRgb = (hex: string) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
			  }
			: null;
	};

	const getContrastYIQ = (hexcolor: string) => {
		const rgb = hexToRgb(hexcolor);
		if (rgb) {
			const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
			return yiq >= 128 ? "black" : "white";
		}
		return "black";
	};

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(color);
		} catch (e) {
			console.error("Copy to clipboard failed", e);
		}
	}

	const textColor = getContrastYIQ(color);

	return (
		<div
			style={{ backgroundColor: color }}
			className="w-16 h-16 rounded-sm cursor-pointer relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={copyToClipboard}
		>
			{isHovered && (
				<div
					className="absolute border border-white left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-1 text-xs rounded"
					style={{ backgroundColor: color, color: textColor }}
				>
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
