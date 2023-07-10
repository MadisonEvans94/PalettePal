// App.js
import React, { useState } from "react";
import PrivateRoute from "./routes/Wrappers/ProtectedRoute";
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
import LoadingModal from "./components/LoadingModal";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { Account } from "./components/Account";
const Layout = () => {
	return (
		<div className="h-screen">
			<div className="absolute w-full z-50">
				<Navigation />
			</div>

			<Outlet />
		</div>
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
	console.log("~~~~~~~~~~~~ APP DIAGNOSTICS ~~~~~~~~~~~~\n\n");

	const [pixelData, setPixelData] = useState([]);
	const [imgFile, setImgFile] = useState(null);
	const [centroidArray, setCentroidArray] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(testUser);
	const [isAuthenticated, setIsAuthenticated] = useState(true);
	console.log(isAuthenticated, "AUTHENTICATED?");
	console.log(user, "USER");
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
						{isLoading && <LoadingModal />}
						<Account>
							<Routes>
								<Route path="/" element={<Layout />}>
									<Route path="/" element={<Landing />} />
									<Route path="palette-view" element={<PaletteView />} />
									<Route path="signup" element={<Signup />} />
									<Route path="login" element={<Login />} />
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
						</Account>
					</UserContext.Provider>
				</AppContext.Provider>
			</CentroidContext.Provider>
		</Router>
	);
}

export default App;
