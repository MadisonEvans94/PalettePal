import { createContext, useContext } from "react";
import { AppContextType } from "../types";
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
