import React, { Fragment, useContext, useEffect } from 'react';
import HomeHero from '../components/HomeHero/HomeHero';
import Testimonial from '../components/HomeTestimonial';
import Services from '../components/Services';
import FeaturedGallery from '../components/FeaturedGallery';
import { PortfolioContext } from '../contexts/PortfolioContext';
import { ProjectsContext } from '../contexts/ProjectsContext';
import Loading from '../components/Loading';

const Home = () => {
	const { portfolio } = useContext(PortfolioContext);
	const { projects } = useContext(ProjectsContext);

	useEffect(() => {}, [portfolio, projects]);

	if (portfolio && projects) {
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
	}

	return <Loading />;
};

export default Home;
