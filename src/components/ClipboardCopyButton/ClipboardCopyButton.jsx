import React from "react";
import { useContext } from "react";
import { CentroidContext } from "../../Contexts/CentroidContext";

function ClipboardCopyButton({ clusterQty }) {
	const { centroidArray } = useContext(CentroidContext);
	const handleCopyClick = () => {
		console.log("array to copy", centroidArray);
		navigator.clipboard.writeText(centroidArray[clusterQty - 1]);
	};

	return (
		<button
			className="w-48 p-3 my-3 transition border rounded border-primary text-info hover:text-secondary bg-primary hover:bg-white"
			onClick={handleCopyClick}
		>
			copy to clipboard
		</button>
	);
}

export default ClipboardCopyButton;
