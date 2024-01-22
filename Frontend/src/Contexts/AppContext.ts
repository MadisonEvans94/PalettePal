import { createContext, useContext } from "react";
import { ClusterData } from "../types";
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
