import React, { createContext } from "react";
import UserPool from "../UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
const AccountContext = createContext();

const Account = (props) => {
	const getSession = async () => {
		return await new Promise((resolve, reject) => {
			const user = UserPool.getCurrentUser();
			if (user) {
				user.getSession((err, session) => {
					if (err) {
						reject();
					} else {
						resolve(session);
					}
				});
			} else {
				reject();
			}
		});
	};
	const authenticate = async (Username, Password) => {
		return await new Promise((resolve, reject) => {
			const user = new CognitoUser({
				Username,
				UserPool,
			});

			const authDetails = new AuthenticationDetails({
				Username,
				Password,
			});
			user.authenticateUser(authDetails, {
				onSuccess: (data) => {
					console.log("Success", data);
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
	const logout = () => {
		const user = UserPool.getCurrentUser();
		if (user) {
			user.signOut();
		}
	};
	return (
		<AccountContext.Provider value={{ authenticate, getSession, logout }}>
			{props.children}
		</AccountContext.Provider>
	);
};

export { Account, AccountContext };
