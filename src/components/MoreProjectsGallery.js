/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useNavigate } from 'react-router';

const MoreProjectsGallery = ({ projects }) => {
	const navigate = useNavigate();
	const detailsOnClick = (e) => {
		navigate(`/featured/${e.target.dataset.projectid}`);
	};

	return (
		<div className='featured__gallery '>
			<div className='featured__gallery__border'>
				<div className='border' />
			</div>
			<div className='featured__gallery__items more-projects'>
				{projects?.map((i, k) => (
					<div className='featured__gallery__items__item item' key={k}>
						<img
							src={i.screenshots.landscape.s1}
							alt={i.projectName}
							loading='lazy'
						/>
						<div className='featured__gallery__items__item__details'>
							<div className='featured__gallery__items__item__details__title'>
								<p data-projectid={i.projectId} onClick={detailsOnClick}>
									{i.projectName}
								</p>
							</div>
							<div className='featured__gallery__items__item__details__services'>
								<span>UX Design</span>
								<span>UI Design</span>
								<span>UI Development</span>
							</div>
						</div>
						<div className='overlay more-projects'>
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
