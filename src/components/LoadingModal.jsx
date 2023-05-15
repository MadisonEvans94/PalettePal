import React from "react";

const LoadingModal = () => {
	return (
		<div className="text-xl w-full h-full flex flex-row justify-center items-center text-black absolute bg-[rgba(0,0,0,.5)]">
			<div className="w-[300px] h-[300px] rounded-[150px] bg-white flex flex-row justify-center items-center">
				Loading...
			</div>
		</div>
	);
};

export default LoadingModal;
