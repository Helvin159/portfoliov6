import React, { Fragment } from 'react';
import NewProjectForm from '../components/NewProjectForm';
import Hero from '../components/Hero';

const AddNewProject = () => {
	return (
		<Fragment>
			<Hero title='Add a new project' />
			<NewProjectForm />
		</Fragment>
	);
};

export default AddNewProject;
