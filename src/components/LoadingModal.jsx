import React from "react";
import loadingAnimation from "../assets/svg/loading_arrows.png";
const LoadingModal = ({ description }) => {
	return (
		<div className="z-50 text-xl w-full h-full flex flex-col justify-center items-center text-black absolute bg-[rgba(0,0,0,0.75)]">
			<img src={loadingAnimation} alt="loadingAnimation" />
			{description ? (
				<p className="my-2 text-info">{description}</p>
			) : (
				<p className="my-2 text-info">loading ...</p>
			)}
		</div>
	);
};

export default LoadingModal;
