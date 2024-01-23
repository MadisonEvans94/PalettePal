import React from "react";
import PaletteCard from "../components/PaletteCard";
import paletteInstances from "../test-json/clusters.json";

const DashboardPage: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="space-y-4">
					{paletteInstances.map((paletteInstance) => {
						return (
							<PaletteCard
								key={paletteInstance.id}
								palette={paletteInstance}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
