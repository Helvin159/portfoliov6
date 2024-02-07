import { createContext, useEffect, useState } from 'react';

export const MobileMenuContext = createContext({
	isOpen: false,
	setIsOpen: () => null,
});

export const MobileMenueProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const value = { isOpen, setIsOpen };

	return (
		<MobileMenuContext.Provider value={value}>
			{children}
		</MobileMenuContext.Provider>
	);
};
