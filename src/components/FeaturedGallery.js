/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import img1 from '../assets/img/img1.jpeg';
import img2 from '../assets/img/img2.jpeg';
import img3 from '../assets/img/img3.jpeg';
import { useNavigate } from 'react-router';

const FeaturedGallery = () => {
	const navigate = useNavigate();
	const handleOnClick = () => navigate('/featured');

	return (
		<div className='featured__gallery'>
			<p className='featured__gallery__title'>// Previous work</p>
			<div className='featured__gallery__items'>
				<div className='featured__gallery__items__item'>
					<img src={img1} alt='imgs' />
				</div>
				<div className='featured__gallery__items__item'>
					<img src={img2} alt='imgs' />
				</div>
				<div className='featured__gallery__items__item'>
					<img src={img3} alt='imgs' />
				</div>
				<div className='featured__gallery__items__item'>
					<img src={img1} alt='imgs' />
				</div>
			</div>
			<div className='featured__gallery__btn'>
				<button onClick={handleOnClick}>See more projects</button>
			</div>
		</div>
	);
};

export default FeaturedGallery;
