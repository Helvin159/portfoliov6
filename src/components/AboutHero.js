/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

const AboutHero = ({ title, copy, keySkills }) => {
	const profileImg =
		'https://firebasestorage.googleapis.com/v0/b/portfolio-db-b6a63.appspot.com/o/Screenshots%2Fimgs%2FIMG_0815.JPG?alt=media&token=ac5e94e6-140e-428d-8786-8af753c73c44';

	const defaultTitle = 'Loading...',
		defaultCopy = 'Loading...',
		defaultKeySkills = ['Loading...', 'Loading...'];

	return (
		<div className='about__hero'>
			<div className='about__hero__profile'>
				<div className='about__hero__profile__bio'>
					<h1>{title ? title : defaultTitle}</h1>
					<p>{copy ? copy : defaultCopy}</p>
				</div>
				<div className='about__hero__profile__skills'>
					<p>// Key Skills</p>
					{keySkills
						? keySkills?.map((i, k) => <button key={k}>{i}</button>)
						: defaultKeySkills.map((i, k) => <button key={k}>{i}</button>)}
				</div>
			</div>
			<div className='about__hero__profile__img'>
				<img src={profileImg} alt='Self portrait' />
			</div>
		</div>
	);
};

export default AboutHero;
