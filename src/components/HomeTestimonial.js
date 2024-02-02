import React from 'react';
import avatarImg from '../assets/img/hero.jpeg';

const HomeTestimonial = () => {
	return (
		<div className='home__testimonial'>
			<div className='home__testimonial__card'>
				<div className='home__testimonial__card__body'>
					<p className='home__testimonial__card__body__title'>
						// Client said...
					</p>
					<p className='home__testimonial__card__body__copy'>
						We loved working with Helvin Rymer. He has a great eye for detail.
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
