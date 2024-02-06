/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

const HomeTestimonial = () => {
	const avatarImg =
		'https://firebasestorage.googleapis.com/v0/b/portfolio-db-b6a63.appspot.com/o/Screenshots%2Fimgs%2FIMG_6403.JPG?alt=media&token=0d1b12be-8af9-4f40-bf6e-ccd51bcb9e18';
	return (
		<div className='home__testimonial'>
			<div className='home__testimonial__card'>
				<div className='home__testimonial__card__body'>
					<p className='home__testimonial__card__body__title'>
						// Client said...
					</p>
					<p className='home__testimonial__card__body__copy'>
						We loved every moment working with Helvin Rymer. He has a great eye
						for detail.
					</p>
					<p className='home__testimonial__card__body__customer'>
						- Jay Z, CEO of Roc Nation
					</p>
				</div>
				<div className='home__testimonial__card__avatar'>
					<img src={avatarImg} alt='custmer' />
				</div>
			</div>
		</div>
	);
};

export default HomeTestimonial;
