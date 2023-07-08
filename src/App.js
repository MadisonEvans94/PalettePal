// App.js
import React, { useState } from "react";
import PrivateRoute from "./components/Wrappers/ProtectedRoute";
import "./App.css";
import PaletteView from "./routes/PaletteView/PaletteView";
import Landing from "./routes/Landing/Landing";
import { CentroidContext } from "./Contexts/CentroidContext";
import AppContext from "./Contexts/AppContext";
import UserContext from "./Contexts/UserContext"; // Add this line
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

const testUser = {
	id: 123,
	name: "Tom Cook",
	email: "tom@example.com",
	imageUrl:
		"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
};

function App() {
	const [pixelData, setPixelData] = useState([]);
	const [imgFile, setImgFile] = useState(null);
	const [centroidArray, setCentroidArray] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(testUser);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

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
					<UserContext.Provider
						value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route path="app" element={<Layout />}>
								<Route path="palette-view" element={<PaletteView />} />
								<Route
									path="dashboard"
									element={
										<PrivateRoute>
											<Dashboard />
										</PrivateRoute>
									}
								/>
								<Route path="settings" element={<Settings />} />
							</Route>
						</Routes>
					</UserContext.Provider>
				</AppContext.Provider>
			</CentroidContext.Provider>
		</Router>
	);
}

export default App;
