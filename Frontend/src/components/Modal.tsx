import React from "react";
import { ReactComponent as Close } from "../assets/icons/Close.svg";

interface ModalProps {
	modalContent: React.ReactNode; // Changed to React.ReactNode for JSX elements
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ modalContent, closeModal }) => {
	return (
		<div className="text-neutral-400 absolute w-full h-full flex flex-col justify-center backdrop-blur z-[1000] items-center">
			{/* Use CreatePaletteModal as a JSX element */}
			<div className="bg-white border space-y-2  border-neutral-400 relative rounded-lg py-10 px-12 mx-auto flex flex-col justify-center">
				{modalContent}
				<Close
					className="hover:text-neutral-700 transition cursor-pointer absolute p-1 rounded top-0 right-1"
					onClick={() => closeModal((prev) => !prev)}
				>
					cancel
				</Close>
			</div>
		</div>
	);
};

export default Modal;
