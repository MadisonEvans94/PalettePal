import React from "react";
import Dashpane from "../../components/Dashpane/Dashpane";
const Dashboard = () => {
	return (
		<div className="w-full h-screen pt-16 ">
			<div className="flex flex-row w-full h-full">
				<Dashpane />
			</div>
		</div>
	);
};

export default Dashboard;
