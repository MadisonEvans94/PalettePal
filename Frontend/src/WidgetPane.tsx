import React from "react";

const WidgetPane: React.FC = () => {
	return (
		<div className="bg-gray-800 text-white h-full flex items-center">
			<div className="mx-auto border">
				<div className="flex flex-row gap-1 justify-center">
					<PaletteColor color="red" />
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
