import React from "react";

function ClipboardCopyButton({ contentToCopy }) {
	const handleCopyClick = () => {
		navigator.clipboard.writeText(contentToCopy);
	};

	return (
		<button
			className="p-3 my-3 border rounded border-white"
			onClick={handleCopyClick}>
			copy to clipboard
		</button>
	);
}

export default ClipboardCopyButton;
