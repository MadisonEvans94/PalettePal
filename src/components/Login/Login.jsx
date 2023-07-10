import React, { useContext } from "react";
import { useState } from "react";
import { AccountContext } from "../Account";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { authenticate } = useContext(AccountContext);
	const onSubmit = (event) => {
		event.preventDefault();
		authenticate(email, password)
			.then((data) => {
				console.log(data, "logged in!");
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<div className="pt-32 bg-gray-400">
			<form onSubmit={onSubmit}>
				<label htmlFor="email">Email</label>
				<input
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					type="text"
				/>
				<label htmlFor="password">Password</label>
				<input
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					type="text"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
