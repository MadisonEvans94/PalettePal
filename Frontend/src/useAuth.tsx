import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
	isAuthenticated: boolean;
	signUp: (
		username: string,
		email: string,
		password: string
	) => Promise<void>;
	logIn: (email: string, password: string) => Promise<void>;
	logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
				setIsAuthenticated(true);
				navigate("/");
			} else {
				// Handle errors, e.g., show an error message
			}
		} catch (error) {
			// Handle network errors, e.g., show an error message
		}
	};

	// TODO: test with server
	const logIn = async (email: string, password: string): Promise<void> => {
		try {
			const response = await fetch(
				"https://127.0.0.1:8000/auth/log-in/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ email, password }),
				}
			);

			if (response.ok) {
				// If the login is successful, you may receive user data or a success message
				setIsAuthenticated(true);
				navigate("/dashboard"); // Navigate to a protected route after login
			} else {
				// Handle errors, e.g., show an error message to the user
			}
		} catch (error) {
			// Handle network errors, e.g., show an error message to the user
		}
	};

	// TODO: test with server
	const logOut = async (): Promise<void> => {
		try {
			const response = await fetch(
				"https://127.0.0.1:8000/auth/log-out/",
				{
					method: "POST",
					credentials: "include", // Needed to include the HTTP-only cookie in the request
				}
			);

			if (response.ok) {
				setIsAuthenticated(false);
				navigate("/login"); // Navigate to the login page after logout
			} else {
				// Handle errors, e.g., show an error message to the user
			}
		} catch (error) {
			// Handle network errors, e.g., show an error message to the user
		}
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, signUp, logIn, logOut }}
		>
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
