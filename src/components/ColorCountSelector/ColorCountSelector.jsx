import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
const ColorCountSelector = ({ clusterQty, setClusterQty, pixelData }) => {
	function handleIncrement() {
		if (clusterQty === 5) {
			setClusterQty(5);
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
			<div className="flex flex-row items-center justify-between py-2 mx-auto text-3xl text-primary md:w-48 w-60 rounded-xl lg:my-8">
				<motion.button
					initial={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{
						scale: 1,
						transition: { type: "spring", mass: 0.5, damping: 30 },
					}}
					className="mx-4 text-lg"
					onClick={handleDecrement}>
					<FaMinus />
				</motion.button>
				{clusterQty}
				<motion.button
					initial={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{
						scale: 1,
						transition: { type: "spring", mass: 0.5, damping: 30 },
					}}
					className="mx-4 text-lg"
					onClick={handleIncrement}>
					<FaPlus />
				</motion.button>
			</div>
		</>
	);
};

export default ColorCountSelector;
