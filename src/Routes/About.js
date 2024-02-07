import React, { Fragment, useContext } from 'react';
import AboutHero from '../components/AboutHero';
import { PortfolioContext } from '../contexts/PortfolioContext';

const About = () => {
	const { portfolio } = useContext(PortfolioContext);

	console.log(portfolio, 'portfolio');

	return (
		<Fragment>
			<AboutHero
				title={'I AM A FRONT-END DEVELOPER WITH A PASSION FOR HIP-HOP CULTURE.'}
				copy={
					'I have always been fascinated by hip-hop culture and its influence on art and design. For this website, I combine my love for hip-hop with my coding skills to create visually stunning and engaging portfolio that resonate with the vibrant energy and creativity inherent in hip-hop culture.'
				}
			/>
		</Fragment>
	);
};

export default About;
