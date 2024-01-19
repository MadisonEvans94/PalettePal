import { createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";

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
				<div>
					<nav>
						<Link to="/">Home</Link> |{" "}
						<Link to="/dashboard">Dashboard</Link>
					</nav>

					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/dashboard" element={<DashboardPage />} />
					</Routes>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

function DashboardPage() {
	return (
		<>
			<div>dashboard</div>
		</>
	);
}

export default App;
