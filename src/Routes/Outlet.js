import React, { Fragment, useContext } from 'react';
import { Outlet as Layout } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PortfolioContext } from '../contexts/PortfolioContext';

const Outlet = () => {
	const { portfolio } = useContext(PortfolioContext);
	return (
		<Fragment>
			<Header lastName={portfolio?.last_name} />
			<main>
				<Layout />
			</main>
			<Footer
				name={portfolio?.name}
				email={portfolio?.email_addy}
				linkedIn={portfolio?.linkedinUrl}
				instagram={portfolio?.instagramUrl}
				github={portfolio?.githubUrl}
			/>
		</Fragment>
	);
};

export default Outlet;
