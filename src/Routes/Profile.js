import React, { Fragment, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

import ProfileHero from '../components/ProfileHero';
import ProfileBody from '../components/ProfileBody/ProfileBody';
import { ProjectsContext } from '../contexts/ProjectsContext';
import { PortfolioContext } from '../contexts/PortfolioContext';
import Loading from '../components/Loading';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router';

const Profile = () => {
	const { user, isAdmin, avatarUrl } = useContext(UserContext);
	const { projects } = useContext(ProjectsContext);
	const { portfolio } = useContext(PortfolioContext);
	const navigate = useNavigate();

	useEffect(() => {}, [user, avatarUrl, projects, portfolio]);

	if (!user) {
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

	if (!isAdmin) {
		setTimeout(() => navigate('/'), 5000);
		return <Hero text="Oops, you're not an admin." />;
	}
	return (
		<Fragment>
			<ProfileHero
				avatarUrl={avatarUrl}
				user={user}
				headline={portfolio.headline_two}
			/>
			<ProfileBody projects={projects} />
		</Fragment>
	);
};

export default Profile;
