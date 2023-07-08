import React from "react";
import useFileHandler from "../../hooks/useFileHandler";

const InputButton = ({ buttonText, styleProp }) => {
	const { handleFileChange, canvasRef } = useFileHandler();

	return (
		<div>
			<input
				className="hidden"
				type="file"
				id="image-input"
				accept="image/jpeg, image/png, image/webp"
				onChange={handleFileChange}
			/>
			<label htmlFor="image-input" className={styleProp}>
				{buttonText}
			</label>
			<canvas ref={canvasRef} style={{ display: "none" }} />
		</div>
	);
};

export default InputButton;
