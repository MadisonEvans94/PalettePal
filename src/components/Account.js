import React, { createContext, useState, useEffect } from "react";
import UserPool from "../UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
const AccountContext = createContext();

const Account = (props) => {
	// eslint-disable-next-line
	const [userData, setUserData] = useState(null);
	const [tokens, setTokens] = useState(null); // new state for JWT tokens
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const getSession = async () => {
		return await new Promise((resolve, reject) => {
			const user = UserPool.getCurrentUser();
			if (user) {
				user.getSession((err, session) => {
					if (err) {
						console.error(err);
						reject();
					} else {
						resolve(session);
					}
				});
			} else {
			}
		});
	};

	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				setIsAuthenticated(true);
				setTokens(session.getIdToken().getJwtToken()); // save tokens
				setUserData({
					username: session.getIdToken().payload["cognito:username"],
				});
			} else {
				console.log("session not active");
				setIsAuthenticated(false);
				setUserData(null);
				setTokens(null);
			}
		});
	}, []);

	const authenticate = async (Username, Password) => {
		return await new Promise((resolve, reject) => {
			const user = new CognitoUser({
				Username,
				Pool: UserPool,
			});

			const authDetails = new AuthenticationDetails({
				Username,
				Password,
			});
			user.authenticateUser(authDetails, {
				onSuccess: (data) => {
					setTokens(data.getIdToken().getJwtToken()); // save tokens after successful authentication
					setIsAuthenticated(true);
					setUserData(user);
					resolve(data);
				},
				onFailure: (error) => {
					console.error(error);
					reject(error);
				},
				newPasswordRequired: (data) => {
					console.log("New Password required", data);
					resolve(data);
				},
			});
		});
	};

	const logout = async () => {
		const user = UserPool.getCurrentUser();
		if (user) {
			user.signOut();
			setIsAuthenticated(false);
			setUserData(null);
			setTokens(null);
			// give it some time to update the session
			setTimeout(() => console.log(UserPool.getCurrentUser()), 3000);
		}
	};

	return (
		<AccountContext.Provider
			value={{
				authenticate,
				getSession,
				logout,
				tokens,
				isAuthenticated,
				userData,
			}}
		>
			{props.children}
		</AccountContext.Provider>
	);
};

export { Account, AccountContext };
