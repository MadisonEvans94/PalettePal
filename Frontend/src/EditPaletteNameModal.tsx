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
		<div className="bg-white rounded p-2 mx-auto">
			<h2>Change Your Palette Name</h2>
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

export default EditPaletteNameModal;
