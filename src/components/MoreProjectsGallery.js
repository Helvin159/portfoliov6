/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import img1 from '../assets/img/img1.jpeg';
import img2 from '../assets/img/img2.jpeg';
import img3 from '../assets/img/img3.jpeg';
import { useNavigate } from 'react-router';

const MoreProjectsGallery = () => {
	const navigate = useNavigate();
	const detailsOnClick = (e) => {
		console.log(e.target.dataset.projectid);
		navigate(`/featured/${e.target.dataset.projectid}`);
	};

	return (
		<div className='featured__gallery '>
			<div className='featured__gallery__border'>
				<div className='border' />
			</div>
			<div className='featured__gallery__items more-projects'>
				<div className='featured__gallery__items__item item'>
					<img src={img1} alt='imgs' />
					<div className='featured__gallery__items__item__details'>
						<div className='featured__gallery__items__item__details__title'>
							<p>hello</p>
						</div>
						<div className='featured__gallery__items__item__details__services'>
							<span>UX Design</span>
							<span>UI Design</span>
							<span>Branding</span>
						</div>
					</div>
					<div className='overlay'>
						<button data-projectid='231383424' onClick={detailsOnClick}>
							see details
						</button>
					</div>
				</div>
				<div className='featured__gallery__items__item item'>
					<img src={img2} alt='imgs' />
					<div className='featured__gallery__items__item__details'>
						<div className='featured__gallery__items__item__details__title'>
							<p>hello</p>
						</div>
						<div className='featured__gallery__items__item__details__services'>
							<span>UX Design</span>
							<span>UI Design</span>
							<span>UI Development</span>
						</div>
					</div>
					<div className='overlay'>
						<button onClick={detailsOnClick}>see details</button>
					</div>
				</div>
				<div className='featured__gallery__items__item item'>
					<img src={img3} alt='imgs' />
					<div className='featured__gallery__items__item__details'>
						<div className='featured__gallery__items__item__details__title'>
							<p>hello</p>
						</div>
						<div className='featured__gallery__items__item__details__services'>
							<span>UX Design</span>
							<span>UI Design</span>
							<span>UI Development</span>
						</div>
					</div>
					<div className='overlay'>
						<button onClick={detailsOnClick}>see details</button>
					</div>
				</div>
				<div className='featured__gallery__items__item item'>
					<img src={img1} alt='imgs' />
					<div className='featured__gallery__items__item__details'>
						<div className='featured__gallery__items__item__details__title'>
							<p>hello</p>
						</div>
						<div className='featured__gallery__items__item__details__services'>
							<span>UX Design</span>
							<span>UI Design</span>
							<span>UI Development</span>
						</div>
					</div>
					<div className='overlay'>
						<button onClick={detailsOnClick}>see details</button>
					</div>
				</div>
				<div className='featured__gallery__items__item item'>
					<img src={img2} alt='imgs' />
					<div className='featured__gallery__items__item__details'>
						<div className='featured__gallery__items__item__details__title'>
							<p>hello</p>
						</div>
						<div className='featured__gallery__items__item__details__services'>
							<span>UX Design</span>
							<span>UI Design</span>
							<span>UI Development</span>
						</div>
					</div>
					<div className='overlay'>
						<button onClick={detailsOnClick}>see details</button>
					</div>
				</div>
				<div className='featured__gallery__items__item item'>
					<img src={img3} alt='imgs' />
					<div className='featured__gallery__items__item__details'>
						<div className='featured__gallery__items__item__details__title'>
							<p>hello</p>
						</div>
						<div className='featured__gallery__items__item__details__services'>
							<span>UX Design</span>
							<span>UI Design</span>
							<span>UI Development</span>
						</div>
					</div>
					<div className='overlay'>
						<button onClick={detailsOnClick}>see details</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoreProjectsGallery;
