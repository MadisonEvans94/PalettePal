import React, { useEffect, useState } from "react";
import PaletteCard from "../components/PaletteCard";
// import palettes from "../test-json/samplePalettes.json";
import { getPalettes } from "../api/apiFunctions";
import { Palette } from "../types";

const DashboardPage: React.FC = () => {
	const [palettes, setPalettes] = useState<Palette[] | null>(null);

	useEffect(() => {
		const fetchPalettes = async () => {
			const fetchedPalettes = await getPalettes();
			setPalettes(fetchedPalettes);
		};
		fetchPalettes();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="space-y-4">
					{palettes &&
						palettes.map((paletteInstance: Palette) => {
							return (
								// <div>{paletteInstance.date}</div>
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
