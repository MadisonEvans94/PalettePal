import React from "react";
import Dashpane from "../../components/Dashpane/Dashpane";
const Dashboard = () => {
	return (
		<div className="bg-blue-200 h-screen w-full">
			<div className="flex flex-row w-full h-full">
				<Dashpane />
			</div>
		</div>
	);
};

export default Dashboard;
