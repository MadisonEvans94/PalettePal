import React, { useState } from "react";
import { usePaletteCrud } from "./hooks/usePaletteCrud";
import { useAppContext } from "./Contexts/AppContext";
interface EditPaletteNameModalProps {
	palette_id: number | null;
}
const EditPaletteNameModal: React.FC<EditPaletteNameModalProps> = ({
	palette_id,
}) => {
	const [paletteName, setPaletteName] = useState<string>("");
	const { updatePaletteName } = usePaletteCrud();
	const { setShowModal } = useAppContext();

	const handlePaletteNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPaletteName(event.target.value);
	};

	const handleSubmit = async () => {
		if (palette_id !== null) {
			await updatePaletteName(palette_id, paletteName);
			setShowModal(false);
		}
	};

	return (
		<>
			<h2 className="text-lg text-left w-full font-semibold">
				Change Your Palette Name
			</h2>

			<input
				className="p-1 min-w-[400px] rounded my-1 border border-neutral-400 focus:border-accent focus:outline-none"
				type="text"
				placeholder="Palette Name..."
				value={paletteName}
				onChange={handlePaletteNameChange}
			/>
			<button
				className="bg-neutral-400 w-full max-w-[200px] min-width-[150px] mx-auto text-white mt-2 hover:bg-accent transition p-1 rounded"
				onClick={handleSubmit}
			>
				Submit
			</button>
		</>
	);
};

export default EditPaletteNameModal;
