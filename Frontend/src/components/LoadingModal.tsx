import loading_spinner from "../assets/icons/loading_spinner.svg";
const LoadingModal = () => {
	return (
		<div className="z-50 text-xl w-full h-full flex flex-row justify-center items-center text-black absolute bg-[rgba(0,0,0,0.2)]">
			<img className="w-24 md:w-40" src={loading_spinner} alt="" />
		</div>
	);
};

export default LoadingModal;
