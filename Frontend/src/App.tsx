import { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import DashboardPage from "./DashboardPage";
import NavBar from "./NavBar";

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

interface AppContextType {
	imageProcessorEndpoint: string;
	uploadedImage: File | null;
	setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
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
	return (
		<AppContext.Provider
			value={{ imageProcessorEndpoint, uploadedImage, setUploadedImage }}
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
						</Routes>
					</div>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
