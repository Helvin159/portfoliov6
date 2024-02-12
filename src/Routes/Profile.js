import React, { Fragment, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

import ProfileHero from '../components/ProfileHero';
import ProfileBody from '../components/ProfileBody/ProfileBody';
import { ProjectsContext } from '../contexts/ProjectsContext';
import { PortfolioContext } from '../contexts/PortfolioContext';
import Loading from '../components/Loading';

const Profile = () => {
	const { user, avatarUrl } = useContext(UserContext);
	const { projects } = useContext(ProjectsContext);
	const { portfolio } = useContext(PortfolioContext);

	useEffect(() => {}, [user, avatarUrl, projects, portfolio]);

	if (!user || !avatarUrl) {
		return (
			<Fragment>
				<Loading />
			</Fragment>
		);
	}

	if (!projects) {
		return (
			<Fragment>
				<Loading />
			</Fragment>
		);
	}

	if (!portfolio) {
		return (
			<Fragment>
				<Loading />
			</Fragment>
		);
	}

	return (
		<Fragment>
			<ProfileHero
				avatarUrl={avatarUrl}
				user={user}
				headline={portfolio.headline_one}
			/>
			<ProfileBody projects={projects} />
		</Fragment>
	);
};

export default Profile;
