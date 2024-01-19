import React from "react";

interface WidgetPaneProps {
	processedImageData: {
		message: string;
		clusters: string[];
		ratio: number[];
	};
}
const WidgetPane: React.FC<WidgetPaneProps> = ({ processedImageData }) => {
	return (
		<div className="bg-gray-800 text-white h-full flex items-center">
			<div className="mx-auto border">
				<div className="flex flex-row gap-1 justify-center">
					{processedImageData.clusters.map((cluster) => (
						<PaletteColor color={cluster} />
					))}
				</div>
				<div>counter goes here</div>
				<button>copy palette</button>
			</div>
		</div>
	);
};

export default WidgetPane;

interface PaletteColorProps {
	color: string;
}
const PaletteColor: React.FC<PaletteColorProps> = ({ color }) => {
	return <div style={{ backgroundColor: color }} className="w-12 h-12" />;
};
