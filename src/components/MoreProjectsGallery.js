/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useNavigate } from 'react-router';

import { projects } from '../assets/data/data';

const MoreProjectsGallery = () => {
	const navigate = useNavigate();
	const detailsOnClick = (e) => {
		console.log(e.target.dataset.projectid);
		navigate(`/featured/${e.target.dataset.projectid}`);
	};

	console.log(projects);

	return (
		<div className='featured__gallery '>
			<div className='featured__gallery__border'>
				<div className='border' />
			</div>
			<div className='featured__gallery__items more-projects'>
				{projects.map((i, k) => (
					<div className='featured__gallery__items__item item'>
						<img src={i.screenshot} alt={i.projectName} />
						<div className='featured__gallery__items__item__details'>
							<div className='featured__gallery__items__item__details__title'>
								<p>{i.projectName}</p>
							</div>
							<div className='featured__gallery__items__item__details__services'>
								<span>UX Design</span>
								<span>UI Design</span>
								<span>UI Development</span>
							</div>
						</div>
						<div className='overlay'>
							<button data-projectid={i.projectId} onClick={detailsOnClick}>
								see details
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MoreProjectsGallery;
