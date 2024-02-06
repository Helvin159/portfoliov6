import React from 'react';
import Statistics from './components/Statistics';
import Header from './components/Header';

import minimap from '../../assets/svg/icon-map.svg';

const HomeHero = () => {
	const heroImg =
		'https://firebasestorage.googleapis.com/v0/b/portfolio-db-b6a63.appspot.com/o/Screenshots%2Fimgs%2FIMG_20160902_144507.JPG?alt=media&token=1c6a76ab-0bf2-482c-8a4b-70711504f6cb';
	return (
		<div className='hero__container'>
			<div className='hero__container__location'>
				<p>
					<span>
						<img src={minimap} alt='mini-map' />
					</span>
					Methuen, MA USA
				</p>
			</div>
			<div className='hero__container__main'>
				<Header />
				<div className='hero__container__main__img'>
					<img src={heroImg} alt='Hero Img' />
				</div>
			</div>
			<Statistics />
		</div>
	);
};

export default HomeHero;
