import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";
import { FormFieldProps } from "../types";

const AuthPage = () => {
	const { logIn, signUp } = useAuth();
	const [formType, setFormType] = useState("signup");
	const toggleFormType = () => {
		setFormType(formType === "signup" ? "login" : "signup");
	};
	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		await logIn(email, password);
	};
	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const username = formData.get("username") as string;

		await signUp(username, email, password);
	};

	return (
		<>
			<AuthForm
				formType={formType}
				handleSubmit={
					formType === "signup" ? handleSignUp : handleLogin
				}
			>
				{formType === "signup" && (
					<>
						<FormField
							label="Username"
							type="text"
							required
							id="username"
						/>
						<FormField
							label="Email"
							type="email"
							required
							id="email"
						/>
						<FormField
							label="Password"
							type="password"
							required
							id="password"
						/>
					</>
				)}
				{formType === "login" && (
					<>
						<FormField
							label="Email"
							type="email"
							required
							id="email"
						/>
						<FormField
							label="Password"
							type="password"
							required
							id="password"
						/>
					</>
				)}
				<div className="text-center mt-4">
					<button
						onClick={toggleFormType}
						className="text-indigo-600 hover:text-indigo-500 font-medium"
					>
						{formType === "signup"
							? "Already have an account? Log In"
							: "Don't have an account? Sign Up"}
					</button>
				</div>
			</AuthForm>
		</>
	);
};

export default AuthPage;

const FormField: React.FC<FormFieldProps> = ({ label, type, required, id }) => {
	return (
		<div>
			<label
				htmlFor={label}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{label}
			</label>
			<div className="mt-2">
				<input
					id={id}
					name={label.toLowerCase()}
					type={type}
					required={required}
					className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>
	);
};
