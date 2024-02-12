import React, { Fragment, useContext, useEffect } from 'react';
import AboutHero from '../components/AboutHero';
import { PortfolioContext } from '../contexts/PortfolioContext';
import Loading from '../components/Loading';

const About = () => {
	const { portfolio } = useContext(PortfolioContext);
	useEffect(() => {}, [portfolio]);

	if (portfolio) {
		return (
			<Fragment>
				<AboutHero
					title={portfolio?.headline_two}
					copy={portfolio?.short_about_me_two}
					keySkills={portfolio?.keySkills}
				/>
			</Fragment>
		);
	}
	return <Loading />;
};

export default About;
