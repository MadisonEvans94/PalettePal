import React, { useState } from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";
function ClipboardCopyButton({ clusterQty }) {
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);
	const { centroidArray } = useContext(CentroidContext);
	const handleCopyClick = () => {
		navigator.clipboard.writeText(centroidArray.colors[clusterQty - 1]);
		setShowCopiedMessage(true);
		setTimeout(() => setShowCopiedMessage(false), 3000);
	};

	return (
		<div>
			<button
				className="p-3 my-3 border rounded border-white"
				onClick={handleCopyClick}>
				copy to clipboard
			</button>
			{showCopiedMessage && (
				<span style={{ marginLeft: "10px" }}>Copied to clipboard!</span>
			)}
		</div>
	);
}

export default ClipboardCopyButton;
