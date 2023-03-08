import React, { useState } from "react";

function ClipboardCopyButton({ contentToCopy }) {
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);

	const handleCopyClick = () => {
		navigator.clipboard.writeText(contentToCopy);
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
