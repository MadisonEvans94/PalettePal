// App.js
import React, { useState } from "react";
import "./App.css";
import PaletteView from "./routes/PaletteView/PaletteView";
import Landing from "./routes/Landing/Landing";
import { CentroidContext } from "./Contexts/CentroidContext";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard/Dashboard";
import Navigation from "./components/Navigation/Navigation";

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
				<Routes>
					<Route
						path="/"
						element={
							<Landing
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								setPixelData={setPixelData}
								setImgFile={setImgFile}
								imgFile={imgFile}
							/>
						}
					/>
					<Route path="app" element={<Layout />}>
						<Route
							path="palette-view"
							element={
								<PaletteView
									isLoading={isLoading}
									setIsLoading={setIsLoading}
									pixelData={pixelData}
									setPixelData={setPixelData}
									imgFile={imgFile}
									setImgFile={setImgFile}
								/>
							}
						/>
						<Route path="dashboard" element={<Dashboard />} />
					</Route>
				</Routes>
			</CentroidContext.Provider>
		</Router>
	);
}

export default App;
