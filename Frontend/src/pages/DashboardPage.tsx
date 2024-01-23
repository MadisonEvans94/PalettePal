import React, { useEffect, useState } from "react";
import PaletteCard from "../components/PaletteCard";
// import paletteInstances from "../test-json/samplePalettes.json";
import { getPalettes } from "../api/apiFunctions";
import { Palette } from "../types";

const DashboardPage: React.FC = () => {
	const [palettes, setPalettes] = useState<Palette[] | null>(null);
	if (localStorage.getItem("access_token"))
		console.log(localStorage.getItem("access_token"));
	useEffect(() => {
		const fetchPalettes = async () => {
			const fetchedPalettes = await getPalettes();
			setPalettes(fetchedPalettes);
		};

		fetchPalettes();
	}, []); // Empty dependency array means this effect runs once after the initial render
	palettes && console.log(palettes[0]);
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="space-y-4">
					{palettes &&
						palettes.map((paletteInstance: Palette) => {
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
