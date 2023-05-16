import React from "react";
import loadingAnimation from "../assets/svg/loading_arrows.gif";
const LoadingModal = () => {
	return (
		<div className="text-xl w-full h-full flex flex-row justify-center items-center text-black absolute bg-[rgba(0,0,0,.5)]">
			<div className="w-[300px] h-[300px] rounded-[150px] bg-white flex flex-row justify-center items-center">
				Loading...
			</div>
			<img src={loadingAnimation} alt="loadingAnimation" />
		</div>
	);
};

export default LoadingModal;
