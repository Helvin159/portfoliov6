import React from 'react';
import Statistics from './components/Statistics';
import Header from './components/Header';

import heroImg from '../../assets/img/hero.jpeg';

const HomeHero = () => {
	return (
		<div className='hero__container'>
			<div className='hero__container__location'>
				<p>Methuen, MA USA</p>
			</div>
			<div>
				<Header />
				<div className='hero__container__img'>
					<img src={heroImg} alt='Hero Img' />
				</div>
			</div>
			<Statistics />
		</div>
	);
};

export default HomeHero;
