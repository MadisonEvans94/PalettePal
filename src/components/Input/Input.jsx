import React from "react";
import "./Input.css";
const Input = () => {
	return (
		<>
			<div className="input-container">
				<input type="file" id="image-input" accept="image/png, image/jpg" />
			</div>
		</>
	);
};

export default Input;
