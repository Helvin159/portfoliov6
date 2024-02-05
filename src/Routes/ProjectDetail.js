import React from 'react';
import { useParams } from 'react-router';

import { projects } from '../assets/data/data';

const ProjectDetail = () => {
	let params = useParams();

	return (
		<div>
			{projects.map((i, k) => {
				if (params.projectId === pjId) {
					console.log(i);
					return (
						<div key={k}>
							<h1>{i.projectName}</h1>
						</div>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
};

export default ProjectDetail;
