import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../../UserPool";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [stage, setStage] = useState("signUp");
	const [code, setCode] = useState("");
	const navigate = useNavigate();

	const [passwordError, setPasswordError] = useState(false); // for password requirements

	const onSubmit = (event) => {
		event.preventDefault();

		const lowerCaseReg = new RegExp("(?=.*[a-z])");
		const upperCaseReg = new RegExp("(?=.*[A-Z])");
		const numericReg = new RegExp("(?=.*[0-9])");
		const specialCharReg = new RegExp("(?=.*[!@#$%^&*])");

		if (
			!lowerCaseReg.test(password) ||
			!upperCaseReg.test(password) ||
			!numericReg.test(password) ||
			!specialCharReg.test(password)
		) {
			setPasswordError(true);
			return;
		} else {
			setPasswordError(false);
		}

		UserPool.signUp(email, password, [], null, (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(data);
			setStage("confirm");
		});
	};

	const onConfirm = (event) => {
		event.preventDefault();

		const cognitoUser = new CognitoUser({
			Username: email,
			Pool: UserPool,
		});

		cognitoUser.confirmRegistration(code, true, function (err, result) {
			if (err) {
				alert(err.message || JSON.stringify(err));
				return;
			}
			console.log("call result: " + result);
			// TODO Here you can redirect the user to login
			navigate("/login");
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md p-10 space-y-8 bg-white rounded-lg shadow-md">
				<div>
					<h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
						{stage === "signUp"
							? "Create your account"
							: "Confirm your account"}
					</h2>
				</div>
				<form
					className="mt-8 space-y-6"
					onSubmit={stage === "signUp" ? onSubmit : onConfirm}
				>
					<input type="hidden" name="remember" value="true" />
					<div className="-space-y-px rounded-md shadow-sm">
						{stage === "signUp" && (
							<>
								<div>
									<label htmlFor="email-address" className="sr-only">
										Email address
									</label>
									<input
										id="email-address"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Email address"
										value={email}
										onChange={(event) => setEmail(event.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="password" className="sr-only">
										Password
									</label>
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Password"
										value={password}
										onChange={(event) => setPassword(event.target.value)}
									/>
									{passwordError && (
										<div className="mt-2 text-red-600">
											Password must contain at least 1 lowercase letter, 1
											uppercase letter, 1 number, and 1 special character.
										</div>
									)}
								</div>
							</>
						)}
						{stage === "confirm" && (
							<div>
								<label htmlFor="confirmationCode" className="sr-only">
									Confirmation Code
								</label>
								<input
									id="confirmationCode"
									name="confirmationCode"
									type="text"
									required
									className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Confirmation Code"
									value={code}
									onChange={(event) => setCode(event.target.value)}
								/>
							</div>
						)}
					</div>
					<div>
						<button
							type="submit"
							className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md group hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
							{stage === "signUp" ? "Sign Up" : "Confirm"}
						</button>
					</div>
					<p>
						{stage === "signUp"
							? "Have an account? Login "
							: "Didn't receive a code? "}
						<span
							className="cursor-pointer"
							onClick={() =>
								stage === "signUp"
									? navigate("/login")
									: console.log("Resend code functionality")
							}
						>
							<strong>here</strong>
						</span>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Signup;
