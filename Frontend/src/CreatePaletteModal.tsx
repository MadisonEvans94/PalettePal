import React from "react";
import { createPalette } from "./api/apiFunctions";
import { useAppContext } from "./Contexts/AppContext";
interface CreatePaletteModalProps {
	// createPalette: (palette: Palette) => Promise<Palette | null>;
	children?: React.ReactNode;
}

const CreatePaletteModal: React.FC<CreatePaletteModalProps> = ({
	children,
}) => {
	const { activePalette } = useAppContext();
	return (
		<div className="bg-white rounded p-2 mx-auto">
			<h2>Choose A Name For Your Palette</h2>
			<div className="flex space-x-2">
				<input type="text" placeholder="Palette Name..." />
				{activePalette && (
					<button
						className="bg-primary p-1 rounded"
						onClick={() => createPalette(activePalette)}
					>
						submit
					</button>
				)}
			</div>
			{children}
		</div>
	);
};

export default CreatePaletteModal;
