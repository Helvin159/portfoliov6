import React, { Fragment } from 'react';
import HomeHero from '../components/HomeHero/HomeHero';
import Testimonial from '../components/HomeTestimonial';
import Services from '../components/Services';

const Home = () => {
	return (
		<Fragment>
			<HomeHero />
			<Testimonial />
			<Services />
		</Fragment>
	);
};

export default Home;
