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
						responsibilities,
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
								responsibilities={responsibilities}
								respOne={responsibilityOne}
								respTwo={responsibilityTwo}
								respOneTitle={responsibilityOneTitle}
								respTwoTitle={responsibilityTwoTitle}
								landscapeS2={screenshots.landscape.s2}
								landscapeS3={screenshots.landscape.s3}
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
