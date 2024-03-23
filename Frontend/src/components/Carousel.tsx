import React, { useState, ReactNode } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

interface CarouselProps {
	components: ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ components }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : components.length - 1
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex < components.length - 1 ? prevIndex + 1 : 0
		);
	};

	return (
		<div className="flex items-center justify-center w-full h-full md:px-2 ">
			<FiArrowLeftCircle
				className="text-3xl cursor-pointer text-dark ml-10 hover:text-theme1 transition"
				onClick={goToPrevious}
				size="2em"
			/>
			<div className="w-full h-full flex justify-center items-center overflow-hidden">
				{components[currentIndex]}
			</div>
			<FiArrowRightCircle
				className="text-3xl cursor-pointer text-dark mr-10 hover:text-theme1 transition"
				onClick={goToNext}
				size="2em"
			/>
		</div>
	);
};

export default Carousel;
