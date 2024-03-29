import React, { Fragment } from 'react';

import headerImg from '../assets/img/IMG_8273.JPG';

const ProfileHero = ({ avatarUrl, user, headline }) => {
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
							<p>{headline ? headline : 'loading'}</p>
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
