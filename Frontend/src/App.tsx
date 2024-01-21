import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import DashboardPage from "./DashboardPage";
import NavBar from "./NavBar";
import PaletteView from "./PaletteView";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

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
function App() {
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const [clusterData, setClusterData] = useState<ClusterData | null>(() => {
		const savedClusterData = sessionStorage.getItem("clusterData");
		return savedClusterData ? JSON.parse(savedClusterData) : null;
	});

	useEffect(() => {
		// Save clusterData to sessionStorage whenever it changes
		if (clusterData) {
			sessionStorage.setItem("clusterData", JSON.stringify(clusterData));
		}
	}, [clusterData]);

	return (
		<AppContext.Provider
			value={{
				imageProcessorEndpoint,
				uploadedImage,
				setUploadedImage,
				clusterData,
				setClusterData,
			}}
		>
			<Router>
				<div className="h-full flex flex-col">
					<NavBar />
					<div className="flex-grow overflow-auto">
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route
								path="/dashboard"
								element={<DashboardPage />}
							/>
							<Route
								path="/palette-view"
								element={<PaletteView />}
							/>
							<Route path="/sign-up" element={<SignUpPage />} />
							<Route path="/login" element={<LoginPage />} />
						</Routes>
					</div>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
