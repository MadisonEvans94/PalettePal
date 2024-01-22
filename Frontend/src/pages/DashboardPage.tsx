import React from "react";
import PaletteCard from "../components/PaletteCard";
import imageInstances from "../test-json/clusters.json";

const DashboardPage: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="space-y-4">
					{imageInstances.map((imageInstance, id) => {
						return (
							<PaletteCard
								// TODO: Update to use db id in future
								key={id}
								clusterData={imageInstance.clusterData}
								imageUrl={imageInstance.imageUrl}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
