import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./components/Account";

const Status = () => {
	const [status, setStatus] = useState(false);
	const { getSession, logout } = useContext(AccountContext);
	useEffect(() => {
		getSession().then((session) => {
			console.log("Session: ", session);
			setStatus(true);
		});
	}, [getSession]);
	return (
		<div>
			{status ? <button onClick={logout}>logout</button> : "Please Log in"}
		</div>
	);
};

export default Status;
