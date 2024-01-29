import React from "react";
import { deletePalette } from "./api/apiFunctions";

interface ConfirmPaletteDeleteModalProps {
	paletteId: number | null;
}

const ConfirmPaletteDeleteModal: React.FC<ConfirmPaletteDeleteModalProps> = ({
	paletteId,
}) => {
	const handleSubmit = async () => {
		await deletePalette(paletteId);
	};

	return (
		<div className="bg-white rounded p-2 mx-auto">
			<h2>Are you sure you want to delete?</h2>
			<div className="flex space-x-2">
				<button
					className="bg-primary p-1 rounded"
					onClick={handleSubmit}
				>
					DELETE
				</button>
			</div>
		</div>
	);
};

export default ConfirmPaletteDeleteModal;
