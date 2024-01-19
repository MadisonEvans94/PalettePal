import { createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import DashboardPage from "./DashboardPage";

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

interface AppContextType {
	imageProcessorEndpoint: string;
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
	return (
		<AppContext.Provider value={{ imageProcessorEndpoint }}>
			<Router>
				<div className="h-full flex flex-col">
					<nav className="flex-none">
						<Link to="/">Home</Link> |{" "}
						<Link to="/dashboard">Dashboard</Link>
					</nav>

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
