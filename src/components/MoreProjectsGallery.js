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
		<div className='featured__gallery'>
			<p className='featured__gallery__title'>// Previous work</p>
			<div className='featured__gallery__items'>
				<div className='featured__gallery__items__item'>
					<img src={img1} alt='imgs' />
					<div className='overlay'>
						<button data-projectid='231383424' onClick={detailsOnClick}>
							see details
						</button>
					</div>
				</div>
				<div className='featured__gallery__items__item'>
					<img src={img2} alt='imgs' />
					<div className='overlay'>
						<button onClick={detailsOnClick}>see details</button>
					</div>
				</div>
				<div className='featured__gallery__items__item'>
					<img src={img3} alt='imgs' />
					<div className='overlay'>
						<button onClick={detailsOnClick}>see details</button>
					</div>
				</div>
				<div className='featured__gallery__items__item'>
					<img src={img1} alt='imgs' />
					<div className='overlay'>
						<button onClick={detailsOnClick}>see details</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoreProjectsGallery;
