import { createContext, useContext } from "react";

export type ClusterData = {
	message: string;
	clusters: string[][]; // Array of arrays of hex color strings
	ratio: number[][]; // Array of arrays of cluster sizes
};

interface AppContextType {
	imageProcessorEndpoint: string;
	uploadedImage: File | null;
	setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
	clusterData: ClusterData | null;
	setClusterData: React.Dispatch<React.SetStateAction<ClusterData | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error(
			"useAppContext must be used within an AppContext.Provider"
		);
	}
	return context;
};
