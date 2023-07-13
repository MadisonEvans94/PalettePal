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
					className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
					<div className="mb-4">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="email">
							Email
						</label>
						<input
							className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							type="text"
							placeholder="Email"
						/>
					</div>
					<div className="mb-6">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="password">
							Password
						</label>
						<input
							className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							type="password"
							placeholder="******************"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
					className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
					<div className="mb-4">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="confirmationCode">
							Confirmation Code
						</label>
						<input
							className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							value={code}
							onChange={(event) => setCode(event.target.value)}
							type="text"
							placeholder="Confirmation Code"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
