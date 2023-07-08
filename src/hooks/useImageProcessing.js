import { useState, useEffect, useContext } from "react";
import { hexArrayToRGBArray, processPixels } from "../helpers/imageHelpers";
import AppContext from "../Contexts/AppContext";
import { useCentroidContext } from "./useCentroidContext";

export const useImageProcessing = () => {
	const { pixelData } = useContext(AppContext);
	const { centroidArray } = useCentroidContext();
	const [clusterQty, setClusterQty] = useState(3);
	const [centroidVals, setCentroidVals] = useState(null);
	const [pixelVals, setPixelVals] = useState(null);

	useEffect(() => {
		if (pixelData && centroidArray) {
			const [processedRgb, processedXVal, processedYVal, processedZVal] =
				processPixels(pixelData);
			const centroidRGBVals = hexArrayToRGBArray(centroidArray[clusterQty - 1]);
			setPixelVals({
				rgb: processedRgb,
				xVal: processedXVal,
				yVal: processedYVal,
				zVal: processedZVal,
			});
			setCentroidVals({
				xVals: centroidRGBVals[0],
				yVals: centroidRGBVals[1],
				zVals: centroidRGBVals[2],
			});
		}
	}, [centroidArray, clusterQty, pixelData]);

	return { clusterQty, setClusterQty, centroidVals, pixelVals };
};
