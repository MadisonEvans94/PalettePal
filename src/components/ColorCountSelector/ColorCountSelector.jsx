import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
const ColorCountSelector = ({ clusterQty, setClusterQty, pixelData }) => {
	function handleIncrement() {
		if (clusterQty === 8) {
			setClusterQty(8);
		} else {
			setClusterQty(clusterQty + 1);
		}
	}
	function handleDecrement() {
		if (clusterQty < 2) {
			setClusterQty(1);
		} else {
			setClusterQty(clusterQty - 1);
		}
	}
	if (pixelData.length === 0) {
		return <></>;
	}
	return (
		<>
			<div className="flex flex-row justify-center items-center text-3xl">
				<button className="mx-4 text-4xl" onClick={handleDecrement}>
					<FaMinus />
				</button>
				{clusterQty}
				<button className="mx-4 text-4xl" onClick={handleIncrement}>
					<FaPlus />
				</button>
			</div>
		</>
	);
};

export default ColorCountSelector;
