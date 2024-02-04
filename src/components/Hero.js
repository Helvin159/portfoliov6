import React from 'react';

const Hero = ({ text }) => {
	return (
		<div className='hero'>
			<h1>
				{text === (null || undefined)
					? "ARE YOU LOOKING TO COLLABORATE? LET'S GET IN TOUCH!"
					: text}
			</h1>
		</div>
	);
};

export default Hero;
