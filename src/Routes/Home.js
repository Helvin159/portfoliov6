import React, { Fragment, useContext } from 'react';
import HomeHero from '../components/HomeHero/HomeHero';
import Testimonial from '../components/HomeTestimonial';
import Services from '../components/Services';
import FeaturedGallery from '../components/FeaturedGallery';
import { PortfolioContext } from '../contexts/PortfolioContext';
import { ProjectsContext } from '../contexts/ProjectsContext';

const Home = () => {
	const { portfolio } = useContext(PortfolioContext);
	const { projects } = useContext(ProjectsContext);

	return (
		<Fragment>
			<HomeHero
				headline={portfolio?.headline_one}
				description={portfolio?.short_description_two}
				projectsCompleted={portfolio?.projects_completed}
				experienceYrs={portfolio?.experience_years}
				awardCount={portfolio?.award_count}
				clientCount={portfolio?.client_count}
			/>
			<Testimonial />
			<Services services={portfolio?.services} />
			<FeaturedGallery projects={projects} />
		</Fragment>
	);
};

export default Home;
