import React from "react";
import { ReactComponent as Close } from "../assets/icons/Close.svg";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
	modalContent: React.ReactNode;
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
	showModal: boolean;
}

const backdropVariants = {
	hidden: {
		opacity: 0,
		backdropFilter: `blur(0px)`,
		backgroundColor: "rgba(0, 0, 0, 0)",
	},
	visible: {
		opacity: 1,
		backdropFilter: `blur(3px)`,
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		transition: { duration: 0.2 },
	},
};

const modalVariants = {
	hidden: { y: 50, opacity: 0 },
	visible: { y: 0, opacity: 1, transition: { duration: 0.2 } },
};

const Modal: React.FC<ModalProps> = ({
	modalContent,
	closeModal,
	showModal,
}) => {
	return (
		<AnimatePresence>
			{showModal && (
				<motion.div
					layout
					className="fixed inset-0 flex items-center justify-center z-[1000]"
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<motion.div
						className="z-50 relative bg-dark p-4 rounded-md"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{/* Modal Content */}
						{modalContent}
						<Close
							className="text-white transition cursor-pointer absolute p-1 rounded top-1 right-1"
							onClick={() => closeModal(false)}
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
