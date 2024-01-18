// CentroidContext.ts
import React from "react";
import { CentroidContextType } from "../types";

export const CentroidContext = React.createContext<CentroidContextType>({
	centroidArray: {
		colors: {},
		// Initialize other properties as needed
	},
	// Initialize other state or functions as needed
});
