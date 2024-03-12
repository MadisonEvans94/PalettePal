import React, { useEffect } from "react";
import PaletteCard from "../../components/PaletteCard";
import { Palette } from "../../types";
import { usePaletteCrud } from "../../hooks/usePaletteCrud";

const DashboardPage: React.FC = () => {
	const { palettes, fetchPalettes } = usePaletteCrud();
	useEffect(() => {
		fetchPalettes();
	}, [fetchPalettes]);

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="space-y-4">
					{palettes &&
						palettes.map((paletteInstance: Palette) => (
							<PaletteCard
								key={paletteInstance.id}
								palette={paletteInstance}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
