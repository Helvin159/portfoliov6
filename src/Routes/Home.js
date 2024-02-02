import React, { Fragment } from 'react';
import HomeHero from '../components/HomeHero/HomeHero';
import Testimonial from '../components/HomeTestimonial';
import Services from '../components/Services';
import FeaturedGallery from '../components/FeaturedGallery';

const Home = () => {
	return (
		<Fragment>
			<HomeHero />
			<Testimonial />
			<Services />
			<FeaturedGallery />
		</Fragment>
	);
};

export default Home;
