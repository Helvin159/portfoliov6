import React, { Fragment } from 'react';

import headerImg from '../assets/png/Image.png';

const ProfileHero = ({ avatarUrl, user }) => {
	// console.log(user);
	return (
		<Fragment>
			<div className='profile__header'>
				<div className='profile__header__img'>
					<img src={headerImg} alt='Profile pic' />
				</div>
				<div className='profile__header__details'>
					<div className='profile__header__details__user'>
						<div className='profile__header__details__user__avatar'>
							<img src={avatarUrl ? avatarUrl : 'loading'} alt='Avatar' />
						</div>
						<div className='profile__header__details__user__name'>
							<h2>{user ? user.displayName : 'loading'}</h2>
							<p>Passionate front-end developer</p>
						</div>
					</div>
					<div className='profile__header__details__btn-group'>
						<button>follow</button>
						<button>message</button>
					</div>
				</div>
				<div className='profile__header__links'>
					<ul>
						<li>Featured</li>
						<li>Skills</li>
						<li>Experience</li>
						<li>Education</li>
						<li>Contact</li>
					</ul>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileHero;
