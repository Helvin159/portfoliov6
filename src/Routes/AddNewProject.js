import React, { Fragment, useContext } from 'react';
import NewProjectForm from '../components/NewProjectForm';
import Hero from '../components/Hero';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router';

const AddNewProject = () => {
	const { isAdmin } = useContext(UserContext);
	let navigate = useNavigate();

	if (!isAdmin) {
		setTimeout(() => navigate('/'), 5000);

		return <Hero text="Oops, you're not an admin." />;
	}

	return (
		<Fragment>
			<Hero title='Add a new project' />
			<NewProjectForm />
		</Fragment>
	);
};

export default AddNewProject;
