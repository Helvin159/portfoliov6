import React, { Fragment } from 'react';
import { useParams } from 'react-router';

import { projects } from '../assets/data/data';
import ProjectHero from '../components/ProjectHero';
import ProjectDetailCards from '../components/ProjectDetailCards';
import ProjectDetailVideo from '../components/ProjectDetailVideo';

const ProjectDetail = () => {
	let params = useParams();

	return (
		<div>
			{projects.map((i, k) => {
				const { projectId } = i;

				if (params.projectId === projectId) {
					const {
						projectName,
						screenshot,
						workDone,
						languages,
						responsibilityOne,
						responsibilityTwo,
						responsibilityOneTitle,
						responsibilityTwoTitle,
					} = i;
					return (
						<Fragment key={k}>
							<ProjectHero
								name={projectName}
								img={screenshot}
								about={workDone}
								langs={languages}
							/>
							<ProjectDetailCards
								name={projectName}
								respOne={responsibilityOne}
								respTwo={responsibilityTwo}
								respOneTitle={responsibilityOneTitle}
								respTwoTitle={responsibilityTwoTitle}
							/>
							<ProjectDetailVideo videoPoster={screenshot} />
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
