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
						workDone,
						languages,
						responsibilityOne,
						responsibilityTwo,
						responsibilityOneTitle,
						responsibilityTwoTitle,
						screenshots,
						videos,
					} = i;
					return (
						<Fragment key={k}>
							<ProjectHero
								name={projectName}
								img={screenshots.landscape.s1}
								about={workDone}
								langs={languages}
							/>
							<ProjectDetailCards
								name={projectName}
								respOne={responsibilityOne}
								respTwo={responsibilityTwo}
								respOneTitle={responsibilityOneTitle}
								respTwoTitle={responsibilityTwoTitle}
								landscapeS1={screenshots.landscape.s1}
								landscapeS2={screenshots.landscape.s2}
								portraitS1={screenshots.portrait.s1}
								portraitS2={screenshots.portrait.s2}
								portraitS3={screenshots.portrait.s3}
							/>
							<ProjectDetailVideo
								videoPoster={screenshots.landscape.s1}
								videoUrl={videos.video_one}
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
