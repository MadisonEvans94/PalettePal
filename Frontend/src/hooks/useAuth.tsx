import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
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

	// Initialize the authentication state from local storage
	useEffect(() => {
		const token = localStorage.getItem("access_token");
		setIsAuthenticated(!!token);
	}, []);

	const signUp = async (
		username: string,
		email: string,
		password: string
	): Promise<void> => {
		const response = await fetch("http://127.0.0.1:8000/auth/sign-up/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});
		console.log(isAuthenticated);

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("access_token", data.access);
			setIsAuthenticated(true);
			navigate("/dashboard");
		} else {
			// Handle errors, e.g., show an error message
		}
	};

	const logIn = async (email: string, password: string): Promise<void> => {
		const response = await fetch("http://127.0.0.1:8000/auth/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("access_token", data.access);
			setIsAuthenticated(true);
			navigate("/dashboard");
		} else {
			// Handle errors, e.g., show an error message to the user
		}
	};

	const logOut = async (): Promise<void> => {
		localStorage.removeItem("access_token");
		setIsAuthenticated(false);
		navigate("/dashboard");
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
