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
					<span>Front-End</span>
				</div>
				<div className='service'>
					<img src={svg1} alt='Angle Up' />
					<span>ReactJs</span>
				</div>
				<div className='service'>
					<img src={svg1} alt='Angle Up' />
					<span>Javascript</span>
				</div>
				<div className='service'>
					<img src={svg1} alt='Angle Up' /> <span>SASS</span>
				</div>
			</div>
		</div>
	);
};

export default Services;
