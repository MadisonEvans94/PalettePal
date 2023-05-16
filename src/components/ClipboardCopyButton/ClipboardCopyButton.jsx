import React, { useState } from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { motion } from "framer-motion";
function ClipboardCopyButton({ clusterQty }) {
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);
	const { centroidArray } = useContext(CentroidContext);
	const handleCopyClick = () => {
		navigator.clipboard.writeText(centroidArray.colors[clusterQty - 1]);
		setShowCopiedMessage(true);
		setTimeout(() => setShowCopiedMessage(false), 3000);
	};

	return (
		<motion.div className="w-full flex flex-row justify-center my-4" layout>
			<motion.button
				layout
				className="border-white text-white hover:text-[#0f0f0f] hover:bg-white p-3 my-3 border rounded w-48"
				onClick={handleCopyClick}>
				copy to clipboard
			</motion.button>
			{showCopiedMessage && (
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { delay: 0.2 } }}
					layout
					className="ml-[10px] flex flex-row items-center justify-center text-white">
					Copied to clipboard!
				</motion.span>
			)}
		</motion.div>
	);
}

export default ClipboardCopyButton;
