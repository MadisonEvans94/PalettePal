import React from "react";
import { useState } from "react";

const ColorCountSelector = () => {
	const [count, setCount] = useState(3);
	function handleIncrement() {
		if (count === 8) {
			setCount(8);
		} else {
			setCount(count + 1);
		}
	}
	function handleDecrement() {
		if (count < 2) {
			setCount(1);
		} else {
			setCount(count - 1);
		}
	}
	return (
		<>
			<div className="color-count-selector">
				<button onClick={handleDecrement}>-</button>
				{count}
				<button onClick={handleIncrement}>+</button>
			</div>
		</>
	);
};

export default ColorCountSelector;
