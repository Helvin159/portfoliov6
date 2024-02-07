/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

import svg1 from '../assets/svg/icon-angle-up.svg';

const Services = ({ services }) => {
	return (
		<div className='services'>
			<p className='services__title'>// My Services</p>
			<div className='services__blocks'>
				{services?.map((i, k) => (
					<div className='service' key={k}>
						<img src={svg1} alt='Angle Up' />
						<p>{i}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Services;
