import React from 'react';

const Statistics = ({
	projectsCompleted,
	experienceYrs,
	awardCount,
	clientCount,
}) => {
	return (
		<div className='hero__container__main__stats'>
			<div className='stat'>
				<div className='stat__copy'>
					<h3>{projectsCompleted}+</h3>
					<p>Projects completed</p>
				</div>
			</div>
			<div className='stat'>
				<div className='stat__copy'>
					<h3>{experienceYrs}+</h3>
					<p>Years of experience</p>
				</div>
			</div>
			<div className='stat'>
				<div className='stat__copy'>
					<h3>{awardCount}</h3>
					<p>Professional Awards</p>
				</div>
			</div>
			<div className='stat'>
				<div className='stat__copy'>
					<h3>{clientCount}</h3>
					<p>Satisfied Clients</p>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
