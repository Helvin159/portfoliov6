import React, { Fragment, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import ProfileHero from '../components/ProfileHero';
import ProfileBody from '../components/ProfileBody/ProfileBody';
import { ProjectsContext } from '../contexts/ProjectsContext';

const Profile = () => {
	const { user, avatarUrl } = useContext(UserContext);
	const { projects } = useContext(ProjectsContext);
	return (
		<Fragment>
			<ProfileHero avatarUrl={avatarUrl} user={user} />
			<ProfileBody projects={projects} />
		</Fragment>
	);
};

export default Profile;
