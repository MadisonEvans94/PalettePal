import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./components/Account";
import { useNavigate } from "react-router-dom";

const Status = () => {
	const [status, setStatus] = useState(false);
	const { getSession, logout } = useContext(AccountContext);
	const navigate = useNavigate();
	useEffect(() => {
		getSession().then((session) => {
			console.log("Session: ", session);
			setStatus(true);
		});
	}, [getSession]);
	return (
		<div>
			{status ? (
				<button onClick={logout}>logout</button>
			) : (
				<button
					onClick={() => {
						navigate("/login");
					}}>
					Sign In
				</button>
			)}
		</div>
	);
};

export default Status;
