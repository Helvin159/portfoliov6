/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

const HomeTestimonial = () => {
	const avatarImg =
		'https://screenandvids.mrrymer.com/assets/Headshot/IMG_6403.JPG';
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
