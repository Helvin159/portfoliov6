import React, { Fragment } from 'react';
import Hero from '../components/Hero';
import MoreProjectsGallery from '../components/MoreProjectsGallery';

const Featured = () => {
	return (
		<Fragment>
			<Hero text='Check Out My Work for Other Clients' />
			<MoreProjectsGallery />
		</Fragment>
	);
};

export default Featured;
