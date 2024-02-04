import React from 'react';

import profileImg from '../assets/png/profile-img.png';

const AboutHero = ({ title, copy }) => {
	return (
		<div className='about__hero'>
			<div className='about__hero__profile'>
				<div className='about__hero__profile__bio'>
					<h1>
						I AM A FRONT-END DEVELOPER WITH A PASSION FOR HIP-HOP CULTURE.
					</h1>
					<p>
						I have always been fascinated by hip-hop culture and its influence
						on art and design. As a front-end developer, I combine my love for
						hip-hop with my coding skills to create visually stunning and
					</p>
				</div>
				<div className='about__hero__profile__skills'>
					<p>// Key Skills</p>
					<button>JavaScript</button>
					<button>CSS</button>
					<button>Html</button>
					<button>UI/UX</button>
				</div>
			</div>
			<div className='about__hero__profile__img'>
				<img src={profileImg} alt='Self portrait' />
			</div>
		</div>
	);
};

export default AboutHero;
