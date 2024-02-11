import React from 'react';
import EditProfileBtnGroup from './components/EditProfileBtnGroup';
import Projects from './components/Projects';

const ProfileBody = ({ projects }) => {
	return (
		<div className='profile-body'>
			<div className='profile-body__left-container'>
				<EditProfileBtnGroup />
			</div>
			<div className='profile-body__right-container'>
				{projects ? <Projects projects={projects} /> : 'loading...'}
			</div>
		</div>
	);
};

export default ProfileBody;
