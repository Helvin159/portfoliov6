import React from 'react';

const Header = ({ headline, description }) => {
	const defaultHeadline =
		'i am a hip-hop loving front-end developer with 2+ years of experience.';

	const defaultDescription =
		'Welcome to my hip-hop-inspired portfolio. I enjoy front-end projects and collaborating on art and design. As a developer, I merge my passion for hip-hop with coding to craft visually striking experiences.';
	return (
		<div className='hero__container__main__header'>
			<h1>{headline ? headline : defaultHeadline}</h1>
			<p>{description ? description : defaultDescription}</p>
		</div>
	);
};

export default Header;
