import React from "react";
import resp from "./test-json/clusters.json";
console.log(resp.clusters[0]);

// function rgbToHex(rgbArray: number[]) {
// 	return (
// 		"#" +
// 		rgbArray
// 			.map((val) => {
// 				const hex = val.toString(16);
// 				return hex.length === 1 ? "0" + hex : hex;
// 			})
// 			.join("")
// 	);
// }

const WidgetPane: React.FC = () => {
	return (
		<div className="bg-gray-800 text-white h-full flex items-center">
			<div className="mx-auto border">
				<div className="flex flex-row gap-1 justify-center">
					{resp.clusters.map((cluster) => (
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
