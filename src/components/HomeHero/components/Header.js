import React from 'react';

const Header = ({ headline, description }) => {
	const defaultHeadline =
		'i am a hip-hop loving front-end developer with 2+ years of experience.';

	const defaultDescription =
		'Explore my hip-hop-inspired portfolio, where front-end projects seamlessly blend with art and design collaborations. As a developer, I fuse my love for hip-hop with coding expertise to create visually stunning experiences.';
	return (
		<div className='hero__container__main__header'>
			<h1>{headline ? headline : defaultHeadline}</h1>
			<p>{description ? description : defaultDescription}</p>
		</div>
	);
};

export default Header;
