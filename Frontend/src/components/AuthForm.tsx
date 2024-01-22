import React from "react";
import { AuthFormProps } from "../types";

const AuthForm: React.FC<AuthFormProps> = ({
	formType,
	handleSubmit,
	children,
}) => {
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						{formType === "signup" ? "Create an Account" : "Login"}
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={handleSubmit}
						className="space-y-6"
						action="#"
						method="POST"
					>
						{children}
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{formType === "signup" ? "Sign Up" : "Login"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AuthForm;
