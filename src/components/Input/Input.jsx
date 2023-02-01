import React from "react";
import "./Input.css";
import { useState, useEffect, useRef } from "react";

//[ ] find a react equivalent to change event listener on input

const Input = () => {
	const [imageUrl, setImageUrl] = useState(null);

	const handleFileChange = (e) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImageUrl(e.target.result);
			console.log(e.target.result);
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<div>
			<input type="file" accept="image/jpeg" onChange={handleFileChange} />
			{imageUrl && <img src={imageUrl} alt="Uploade" />}
		</div>
	);
};

export default Input;
