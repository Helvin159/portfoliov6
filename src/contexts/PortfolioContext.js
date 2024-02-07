import { createContext, useEffect, useState } from 'react';
import { getPortfolioData } from '../utils/firebase';

export const PortfolioContext = createContext({
	portfolio: null,
	setPortfolio: () => null,
});

export const PortfolioProvider = ({ children }) => {
	const [portfolio, setPortfolioData] = useState(null);

	const fetchPortfolioData = async () => {
		const portfolioData = await getPortfolioData();
		return setPortfolioData(portfolioData);
	};

	useEffect(() => {
		fetchPortfolioData();
	}, []);

	const value = {
		portfolio,
		setPortfolioData,
	};

	return (
		<PortfolioContext.Provider value={value}>
			{children}
		</PortfolioContext.Provider>
	);
};
