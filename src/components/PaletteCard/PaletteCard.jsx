import React from "react";

const PaletteCard = () => {
	return (
		<div className="bg-red-300 h-32 mx-auto max-w-4xl rounded flex flex-row overflow-hidden">
			<div className="w-full border flex flex-row">
				<div className="w-2/3 relative">
					<img
						className="absolute h-full w-full object-cover object-center"
						src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
						alt=""
					/>
				</div>
				<div>
					<p>Name</p>
					<p>Date</p>
				</div>
			</div>
			<div className="w-full border">info</div>
		</div>
	);
};

export default PaletteCard;
