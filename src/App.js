// App.js
import React, { useState } from "react";
import "./App.css";
import PaletteView from "./routes/PaletteView/PaletteView";
import Landing from "./routes/Landing/Landing";
import { CentroidContext } from "./Contexts/CentroidContext";
import AppContext from "./Contexts/AppContext"; // Add this line
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard/Dashboard";
import Navigation from "./components/Navigation/Navigation";
import Settings from "./routes/Settings/Settings";

const Layout = () => {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	);
};

function App() {
	const [pixelData, setPixelData] = useState([]);
	const [imgFile, setImgFile] = useState(null);
	const [centroidArray, setCentroidArray] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Router>
			<CentroidContext.Provider value={{ centroidArray, setCentroidArray }}>
				<AppContext.Provider
					value={{
						isLoading,
						setIsLoading,
						pixelData,
						setPixelData,
						imgFile,
						setImgFile,
					}}>
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="app" element={<Layout />}>
							<Route path="palette-view" element={<PaletteView />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="settings" element={<Settings />} />
						</Route>
					</Routes>
				</AppContext.Provider>
			</CentroidContext.Provider>
		</Router>
	);
}

export default App;
