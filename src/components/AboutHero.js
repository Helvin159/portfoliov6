/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

const AboutHero = () => {
	const profileImg =
		'https://screenandvids.mrrymer.com/assets/Cool%20Shots/IMG_0815.JPG';
	return (
		<div className='about__hero'>
			<div className='about__hero__profile'>
				<div className='about__hero__profile__bio'>
					<h1>
						I AM A FRONT-END DEVELOPER WITH A PASSION FOR HIP-HOP CULTURE.
					</h1>
					<p>
						I have always been fascinated by hip-hop culture and its influence
						on art and design. For this website, I combine my love for hip-hop
						with my coding skills to create visually stunning and engaging
						portfolio that resonate with the vibrant energy and creativity
						inherent in hip-hop culture.
					</p>
				</div>
				<div className='about__hero__profile__skills'>
					<p>// Key Skills</p>
					<button>JavaScript</button>
					<button>CSS</button>
					<button>Html</button>
					<button>ReactJs</button>
					<button>SCSS</button>
				</div>
			</div>
			<div className='about__hero__profile__img'>
				<img src={profileImg} alt='Self portrait' />
			</div>
		</div>
	);
};

export default AboutHero;
