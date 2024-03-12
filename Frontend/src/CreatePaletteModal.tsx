import React, { useState } from "react";
import { createPalette } from "./api/apiFunctions";
import { useAppContext } from "./Contexts/AppContext";

const CreatePaletteModal: React.FC = () => {
	const { activePalette, setActivePalette } = useAppContext();
	const [paletteName, setPaletteName] = useState<string>("");

	const handlePaletteNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPaletteName(event.target.value);
	};

	const handleSubmit = async () => {
		if (activePalette) {
			const updatedPalette = { ...activePalette, name: paletteName };
			setActivePalette(updatedPalette);
			await createPalette(updatedPalette);
		}
	};

	return (
		<div className="bg-white rounded p-2 mx-auto text-dark">
			<h2>Choose A Name For Your Palette</h2>
			<div className="flex space-x-2">
				<input
					type="text"
					placeholder="Palette Name..."
					value={paletteName}
					onChange={handlePaletteNameChange}
				/>
				<button
					className="bg-primary p-1 rounded"
					onClick={handleSubmit}
				>
					submit
				</button>
			</div>
		</div>
	);
};

export default CreatePaletteModal;
