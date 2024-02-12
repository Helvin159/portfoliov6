import React, { Fragment, useContext, useEffect } from 'react';
import Hero from '../components/Hero';
import MoreProjectsGallery from '../components/MoreProjectsGallery';
import { ProjectsContext } from '../contexts/ProjectsContext';
import Loading from '../components/Loading';

const Featured = () => {
	const { projects } = useContext(ProjectsContext);

	useEffect(() => {}, [projects]);

	if (projects) {
		return (
			<Fragment>
				<Hero text='Check Out My Work for Other Clients' />
				<MoreProjectsGallery projects={projects} />
			</Fragment>
		);
	}

	return <Loading />;
};

export default Featured;
