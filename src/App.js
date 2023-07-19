// App.js
import React, { useState } from "react";
import PrivateRoute from "./routes/Wrappers/ProtectedRoute";
import "./App.css";
import PaletteView from "./routes/PaletteView/PaletteView";
import Landing from "./routes/Landing/Landing";
import { CentroidContext } from "./Contexts/CentroidContext";
import AppContext from "./Contexts/AppContext";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard/Dashboard";
import Navigation from "./components/Navigation/Navigation";

import LoadingModal from "./components/LoadingModal";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { Account } from "./components/Account";

const Layout = () => {
	return (
		<div className="h-screen">
			<div className="absolute z-50 w-full">
				<Navigation />
			</div>

			<Outlet />
		</div>
	);
};

function App() {
	const [pixelData, setPixelData] = useState([]);
	const [imgFile, setImgFile] = useState(null);
	const [centroidArray, setCentroidArray] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
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
						}}
					>
						{isLoading && <LoadingModal />}
						<Account>
							<Routes>
								<Route path="/" element={<Layout />}>
									<Route path="/" element={<Landing />} />
									<Route path="palette-view" element={<PaletteView />} />
									<Route path="login" element={<Login />} />
									<Route path="signup" element={<Signup />} />

									<Route
										path="dashboard"
										element={
											<PrivateRoute>
												<Dashboard />
											</PrivateRoute>
										}
									/>
								</Route>
							</Routes>
						</Account>
					</AppContext.Provider>
				</CentroidContext.Provider>
			</Router>
		</>
	);
}

export default App;
