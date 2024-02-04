import React from 'react';
import Statistics from './components/Statistics';
import Header from './components/Header';

import heroImg from '../../assets/img/hero.jpeg';

import minimap from '../../assets/svg/icon-map.svg';

const HomeHero = () => {
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
