import { useState } from "react";
import {
	getPalettes,
	deletePalette,
	editPaletteName,
	createPalette,
} from "../api/apiFunctions";
import { Palette } from "../types";

const usePaletteCrud = () => {
	const [palettes, setPalettes] = useState<Palette[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	// If error structure is known, replace 'any' with the correct type
	const [error, setError] = useState<any>(null);

	const fetchPalettes = async () => {
		setLoading(true);
		try {
			const fetchedPalettes = await getPalettes();
			if (fetchedPalettes) {
				setPalettes(fetchedPalettes);
				setError(null); // Clear any previous errors
			} else {
				setError("Failed to fetch palettes.");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setLoading(false);
		}
	};

	const removePalette = async (id: number) => {
		try {
			const success = await deletePalette(id);
			if (success) {
				setPalettes((currentPalettes) =>
					currentPalettes.filter((p) => p.id !== id)
				);
				setError(null); // Clear any previous errors
			} else {
				setError("Failed to delete the palette.");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	};

	const updatePaletteName = async (id: number, name: string) => {
		try {
			const updatedPalette = await editPaletteName(id, name);
			if (updatedPalette) {
				setPalettes((currentPalettes) =>
					currentPalettes.map((p) =>
						p.id === id ? updatedPalette : p
					)
				);
				setError(null); // Clear any previous errors
			} else {
				setError("Failed to update the palette.");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	};

	const addPalette = async (newPalette: Palette) => {
		try {
			const createdPalette = await createPalette(newPalette);
			if (createdPalette) {
				setPalettes((currentPalettes) => [
					...currentPalettes,
					createdPalette,
				]);
				setError(null); // Clear any previous errors
			} else {
				setError("Failed to create a new palette.");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	};

	// Return the states and functions that the hook manages
	return {
		palettes,
		setPalettes,
		loading,
		error,
		fetchPalettes,
		removePalette,
		updatePaletteName,
		addPalette,
	};
};

// Export the hook as a named export
export { usePaletteCrud };
