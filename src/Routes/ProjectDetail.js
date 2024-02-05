import React from 'react';
import { useParams } from 'react-router';

const ProjectDetail = () => {
	let params = useParams();
	console.log(params, 'component params');

	return (
		<div>
			<h1>Project Detail</h1>
		</div>
	);
};

export default ProjectDetail;
