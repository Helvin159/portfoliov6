import React, { Fragment, useContext } from 'react';
import Hero from '../components/Hero';
import MoreProjectsGallery from '../components/MoreProjectsGallery';
import { ProjectsContext } from '../contexts/ProjectsContext';

const Featured = () => {
	const { projects } = useContext(ProjectsContext);
	return (
		<Fragment>
			<Hero text='Check Out My Work for Other Clients' />
			<MoreProjectsGallery projects={projects} />
		</Fragment>
	);
};

export default Featured;
