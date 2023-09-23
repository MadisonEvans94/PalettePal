import React from "react";
import loadingAnimation from "../assets/svg/loading_arrows.png";
const LoadingModal = () => {
	return (
		<div className="z-50 text-xl w-full h-full flex flex-row justify-center items-center text-black absolute bg-[rgba(0,0,0,0.75)]">
			<img src={loadingAnimation} alt="loadingAnimation" />
		</div>
	);
};

export default LoadingModal;
