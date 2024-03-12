import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import PaletteView from "./pages/PaletteViewPage";
import { AuthProvider } from "./hooks/useAuth";
import { AppContext } from "./Contexts/AppContext";
import { Palette } from "./types";
import Modal from "./components/Modal";

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

function App() {
	const [activePalette, setActivePalette] = useState<Palette | null>(null);
	const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [modalContent, setModalContent] = useState<React.ReactNode | null>(
		null
	);

	// Using a custom hook to determine if NavBar should be displayed
	const ShowNavBar = () => {
		const location = useLocation();
		return location.pathname !== "/" ? <NavBar /> : null;
	};

	return (
		<AppContext.Provider
			value={{
				imageProcessorEndpoint,
				activePalette,
				setActivePalette,
				setActiveImageUrl,
				activeImageUrl,
				showModal,
				setShowModal,
				modalContent,
				setModalContent,
			}}
		>
			<Router>
				<AuthProvider>
					<div className="bg-theme1 h-full flex flex-col relative">
						<ShowNavBar />
						{showModal && (
							<Modal
								modalContent={modalContent}
								closeModal={() => setShowModal(false)}
								showModal={showModal}
							/>
						)}
						<div className="flex-grow overflow-auto">
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route
									path="/palette-view"
									element={<PaletteView />}
								/>
							</Routes>
						</div>
					</div>
				</AuthProvider>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
