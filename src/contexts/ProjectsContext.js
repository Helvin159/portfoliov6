import { createContext, useEffect, useState } from 'react';
import { getProjectsData } from '../utils/firebase';

export const ProjectsContext = createContext({
	projects: null,
	setProjects: () => null,
});

export const ProjectsProvider = ({ children }) => {
	const [projects, setProjects] = useState(null);

	const fetchProjectData = async () => {
		const projectData = await getProjectsData();
		return setProjects(projectData);
	};

	useEffect(() => {
		fetchProjectData();
	}, []);

	const value = { projects, setProjects };

	return (
		<ProjectsContext.Provider value={value}>
			{children}
		</ProjectsContext.Provider>
	);
};
