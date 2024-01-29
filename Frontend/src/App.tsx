import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import NavBar from "./components/NavBar";
import PaletteView from "./pages/PaletteViewPage";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./hooks/useAuth";
import { AppContext } from "./Contexts/AppContext";
import { Palette } from "./types";
import Modal from "./components/Modal";
import CreatePaletteModal from "./CreatePaletteModal";

const imageProcessorEndpoint =
	process.env.REACT_APP_IMAGE_PROCESSOR_ENDPOINT || "";

function App() {
	const [activePalette, setActivePalette] = useState<Palette | null>(null);
	const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [modalContent, setModalContent] = useState<React.ReactNode | null>(
		null
	);

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
					<div className="h-full flex flex-col relative">
						<NavBar />
						{showModal && (
							<Modal
								modalContent={modalContent}
								closeModal={() => setShowModal(false)}
							/>
						)}
						<div className="flex-grow overflow-auto">
							<Routes>
								<Route path="/" element={<HomePage />} />

								<Route
									path="/dashboard"
									element={<DashboardPage />}
								/>

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
