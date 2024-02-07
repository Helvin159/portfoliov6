import React, { Fragment, useContext } from 'react';
import AboutHero from '../components/AboutHero';
import { PortfolioContext } from '../contexts/PortfolioContext';

const About = () => {
	const { portfolio } = useContext(PortfolioContext);

	return (
		<Fragment>
			<AboutHero
				title={portfolio?.headline_two}
				copy={portfolio?.short_about_me_two}
				keySkills={portfolio?.keySkills}
			/>
		</Fragment>
	);
};

export default About;
