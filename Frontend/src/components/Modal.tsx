import React from "react";
import CreatePaletteModal from "../CreatePaletteModal";

interface ModalProps {
	modalContent: React.ReactNode; // Changed to React.ReactNode for JSX elements
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ modalContent, closeModal }) => {
	return (
		<div className="absolute w-full h-full bg-black z-[1000] flex items-center">
			{/* Use CreatePaletteModal as a JSX element */}
			{modalContent}
			<button
				className="bg-neutral-300 p-1 rounded"
				onClick={() => closeModal((prev) => !prev)}
			>
				cancel
			</button>
		</div>
	);
};

export default Modal;
