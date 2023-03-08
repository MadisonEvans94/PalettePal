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
			<div className="mx-auto flex flex-row justify-between items-center text-5xl md:w-48 w-60 border rounded-xl my-8 py-4">
				<motion.button
					initial={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{
						scale: 1,
						transition: { type: "spring", mass: 0.5, damping: 30 },
					}}
					className="mx-4 text-4xl"
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
					className="mx-4 text-4xl"
					onClick={handleIncrement}>
					<FaPlus />
				</motion.button>
			</div>
		</>
	);
};

export default ColorCountSelector;
