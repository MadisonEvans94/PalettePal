import { useContext } from "react";
import { CentroidContext } from "../Contexts/CentroidContext";

export function useCentroidContext() {
	const context = useContext(CentroidContext);

	if (!context) {
		throw new Error(
			"useCentroidContext must be used within a CentroidContext Provider"
		);
	}

	return context;
}
