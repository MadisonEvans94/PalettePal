import React, { useState } from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
import { motion } from "framer-motion";
function ClipboardCopyButton({ clusterQty }) {
	// eslint-disable-next-line 
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);
	const { centroidArray } = useContext(CentroidContext);
	const handleCopyClick = () => {
		navigator.clipboard.writeText(centroidArray.colors[clusterQty - 1]);
		setShowCopiedMessage(true);
		setTimeout(() => setShowCopiedMessage(false), 3000);
	};

	return (
		<motion.button
			layout
			className="w-48 p-3 my-3 transition border rounded border-primary text-info hover:text-primary bg-primary hover:bg-white"
			onClick={handleCopyClick}>
			copy to clipboard
		</motion.button>
	);
}

export default ClipboardCopyButton;
