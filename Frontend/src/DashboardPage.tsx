import React from "react";
import PaletteCard from "./PaletteCard";
import imageInstance from "./test-json/clusters.json";

const DashboardPage: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="space-y-4">
					<PaletteCard
						clusterData={imageInstance.clusterData}
						imageUrl={imageInstance.imageUrl}
					/>
					<PaletteCard
						clusterData={imageInstance.clusterData}
						imageUrl={imageInstance.imageUrl}
					/>
					<PaletteCard
						clusterData={imageInstance.clusterData}
						imageUrl={imageInstance.imageUrl}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
