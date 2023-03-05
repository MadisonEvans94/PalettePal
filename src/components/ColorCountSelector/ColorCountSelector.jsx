import React from "react";

const ColorCountSelector = ({ clusterQty, setClusterQty }) => {
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
	return (
		<>
			<div className="color-count-selector">
				<button onClick={handleDecrement}>-</button>
				{clusterQty}
				<button onClick={handleIncrement}>+</button>
			</div>
		</>
	);
};

export default ColorCountSelector;
