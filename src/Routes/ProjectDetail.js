import React, { Fragment } from 'react';
import { useParams } from 'react-router';

import { projects } from '../assets/data/data';
import ProjectHero from '../components/ProjectHero';

const ProjectDetail = () => {
	let params = useParams();

	return (
		<div>
			{projects.map((i, k) => {
				const { projectId } = i;

				if (params.projectId === projectId) {
					console.log(i);
					return (
						<Fragment key={k}>
							<ProjectHero
								name={i.projectName}
								img={i.screenshot}
								about={i.workDone}
								langs={i.languages}
							/>
						</Fragment>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
};

export default ProjectDetail;
