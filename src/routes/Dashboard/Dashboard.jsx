import React from "react";

const Dashboard = () => {
	return (
		<div className="bg-blue-200 h-screen w-full">
			<Navigation />

			<div className="flex flex-row w-full">
				<Sidebar />
				<Dashpane />
			</div>
		</div>
	);
};

export default Dashboard;
function Dashpane() {
	return <div className="bg-yellow-200">Dashpane</div>;
}

function Sidebar() {
	return <div className="bg-green-200">Sidebar</div>;
}

function Navigation() {
	return <div className="bg-red-200">Navigation</div>;
}
