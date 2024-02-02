import React, { Fragment } from 'react';
import HomeHero from '../components/HomeHero/HomeHero';
import Testimonial from '../components/HomeTestimonial';

const Home = () => {
	return (
		<Fragment>
			<HomeHero />
			<Testimonial />
		</Fragment>
	);
};

export default Home;
