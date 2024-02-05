import React from 'react';
import { useParams } from 'react-router';

import { projects } from '../assets/data/data';

const ProjectDetail = () => {
	let params = useParams();

	return (
		<div>
			{projects.map((i, k) => {
				if (+params.projectId === +i.projectId) {
					console.log(i);
					return (
						<div>
							<h1>{i.projectName}</h1>
						</div>
					);
				}
			})}
		</div>
	);
};

export default ProjectDetail;
