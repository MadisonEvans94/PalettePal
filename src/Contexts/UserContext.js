// UserContext.js
import { createContext } from "react";

const UserContext = createContext({
	userID: null,
	setUserID: () => {},
});

export default UserContext;
