import React from "react";

const DashboardPage: React.FC = () => {
	return (
		<>
			<div className="w-full h-full bg-gray-400 flex flex-col">
				<div className="w-full grid grid-cols-2">
					<div className="bg-gray-600 text-white">image pane</div>
					<div className="bg-gray-800 text-white">widget pane</div>
				</div>
				<div className="flex items-center justify-center">
					<button className="p-2 bg-black rounded text-white">
						save palette
					</button>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
