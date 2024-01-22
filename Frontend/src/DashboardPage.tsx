import React from "react";
import PaletteCard from "./PaletteCard";
import { useAuth } from "./useAuth";

const DashboardPage: React.FC = () => {
	return (
		<div>
			<PaletteCard />
		</div>
	);
};

export default DashboardPage;
