import React, { Fragment, useContext } from 'react';
import { Outlet as Layout } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PortfolioContext } from '../contexts/PortfolioContext';
import Loading from '../components/Loading';

const Outlet = () => {
	const { portfolio } = useContext(PortfolioContext);

	if (portfolio) {
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
	}

	return <Loading />;
};

export default Outlet;
