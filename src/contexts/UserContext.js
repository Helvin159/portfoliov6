import { createContext, useEffect, useState } from 'react';
import {
	createUserDocFromAuth,
	onAuthStateChangedListener,
} from '../utils/firebase';

export const UserContext = createContext({
	user: null,
	isAdmin: false,
	setUser: () => false,
	setIsAdmin: () => false,
});

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			// Check if user exist
			if (user) {
				createUserDocFromAuth(user);
				setUser(user);
			}

			// check if user is admin
			if (user) {
				user.uid === process.env.REACT_APP_ADMIN_ID && setIsAdmin(true);
			} else {
				setIsAdmin(false);
			}
		});

		return unsubscribe;
	}, []);

	const value = { user, setUser, isAdmin, setIsAdmin };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
