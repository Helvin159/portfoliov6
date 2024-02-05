/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import img1 from '../assets/img/img1.jpeg';
import img2 from '../assets/img/img2.jpeg';
import img3 from '../assets/img/img3.jpeg';
import { useNavigate } from 'react-router';

import { projects } from '../assets/data/data';

const FeaturedGallery = () => {
	const navigate = useNavigate();
	const handleOnClick = () => navigate('/featured');
	const detailsOnClick = (e) =>
		navigate(`/featured/${e.target.dataset.projectid}`);

	return (
		<div className='featured__gallery'>
			<p className='featured__gallery__title'>// Previous work</p>
			<div className='featured__gallery__items'>
				{projects.slice(0, 4).map((i, k) => (
					<div className='featured__gallery__items__item' key={k}>
						<img src={i.screenshot} alt={i.projectName} />
						<div className='overlay'>
							<button data-projectid={i.projectId} onClick={detailsOnClick}>
								see details
							</button>
						</div>
					</div>
				))}
			</div>
			<div className='featured__gallery__btn'>
				<button onClick={handleOnClick}>See more projects</button>
			</div>
		</div>
	);
};

export default FeaturedGallery;
