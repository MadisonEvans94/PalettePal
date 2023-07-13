import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../../UserPool";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [stage, setStage] = useState("signUp"); // initial stage is 'signUp'
	const [code, setCode] = useState(""); // for the confirmation code

	const onSubmit = (event) => {
		event.preventDefault();
		UserPool.signUp(email, password, [], null, (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(data);
			setStage("confirm"); // set stage to 'confirm' after signup
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
		});
	};

	//TODO You can implement a switch statement or if-else chains to conditionally render based on stage. MAKE STAGE A STATE OF THE USER BASED ON USERCONFIRMED ATTR
	if (stage === "signUp") {
		return (
			<div className="pt-32 bg-gray-400">
				<form
					onSubmit={onSubmit}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email">
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							type="text"
							placeholder="Email"
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							type="password"
							placeholder="******************"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit">
							Sign Up
						</button>
					</div>
				</form>
			</div>
		);
	} else if (stage === "confirm") {
		return (
			<div className="pt-32 bg-gray-400">
				<form
					onSubmit={onConfirm}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="confirmationCode">
							Confirmation Code
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={code}
							onChange={(event) => setCode(event.target.value)}
							type="text"
							placeholder="Confirmation Code"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit">
							Confirm
						</button>
					</div>
				</form>
			</div>
		);
	}
};

export default Signup;
