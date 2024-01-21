// hooks/useAuth.js

import { useState, useCallback, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
// types/AuthTypes.ts

export interface AuthContextType {
	authToken: string | null;
	signUp: (
		username: string,
		email: string,
		password: string
	) => Promise<void>;
	logIn: (username: string, password: string) => Promise<void>;
	logOut: () => void;
}
type AuthProviderProps = {
	children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authToken, setAuthToken] = useState<string | null>(null);
	const navigate = useNavigate();

	const signUp = async (
		username: string,
		email: string,
		password: string
	): Promise<void> => {
		try {
			const response = await fetch(
				"https://127.0.0.1:8000/auth/sign-up/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ username, email, password }),
				}
			);

			if (response.ok) {
				const data = await response.json();
				setAuthToken(data.token); // Assuming the token is in the response
				navigate("/dashboard");
			} else {
				// Handle errors, e.g., show an error message
			}
		} catch (error) {
			// Handle network errors, e.g., show an error message
		}
	};

	const logIn = async (username: string, password: string): Promise<void> => {
		// Similar to signUp, but with the login endpoint
	};

	const logOut = async () => {
		// Invalidate the token on the server if necessary
		setAuthToken(null);
		navigate("/");
	};

	// Expose the authToken, and auth actions
	return (
		<AuthContext.Provider value={{ authToken, signUp, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
