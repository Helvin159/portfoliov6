/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

import svg1 from '../assets/svg/icon-angle-up.svg';

const Services = () => {
	return (
		<div className='services'>
			<p className='services__title'>// My Services</p>
			<div className='services__blocks'>
				<div className='service'>
					<img src={svg1} alt='Angle Up' />
					<p>Front-End</p>
				</div>
				<div className='service'>
					<img src={svg1} alt='Angle Up' />
					<p>ReactJs</p>
				</div>
				<div className='service'>
					<img src={svg1} alt='Angle Up' />
					<p>Javascript</p>
				</div>
				<div className='service'>
					<img src={svg1} alt='Angle Up' />
					<p>SASS</p>
				</div>
			</div>
		</div>
	);
};

export default Services;
