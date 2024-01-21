import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import DashboardPage from "./DashboardPage";
import NavBar from "./NavBar";
import PaletteView from "./PaletteView";
import AuthPage from "./AuthPage";
import { AuthProvider } from "./useAuth";
import { AppContext, ClusterData } from "./AppContext";
import ProtectedRoute from "./ProtectedRoute"; // Import the new component

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

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
				<AuthProvider>
					<div className="h-full flex flex-col">
						<NavBar />
						<div className="flex-grow overflow-auto">
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route
									path="/dashboard"
									element={<ProtectedRoute />}
								>
									<Route index element={<DashboardPage />} />
								</Route>
								<Route
									path="/palette-view"
									element={<PaletteView />}
								/>
								<Route path="/auth" element={<AuthPage />} />
							</Routes>
						</div>
					</div>
				</AuthProvider>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
