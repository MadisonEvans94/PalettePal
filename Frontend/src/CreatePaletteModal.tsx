import React from "react";

interface CreatePaletteModalProps {
	handleAction: () => void;
	children?: React.ReactNode;
}

const CreatePaletteModal: React.FC<CreatePaletteModalProps> = ({
	handleAction,
	children,
}) => {
	return (
		<div className="bg-white rounded p-2 mx-auto">
			<h2>Choose A Name For Your Palette</h2>
			<div className="flex space-x-2">
				<input type="text" placeholder="Palette Name..." />
				<button
					className="bg-primary p-1 rounded"
					onClick={handleAction}
				>
					submit
				</button>
			</div>
			{children}
		</div>
	);
};

export default CreatePaletteModal;
