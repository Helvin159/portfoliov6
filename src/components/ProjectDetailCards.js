import React from 'react';

const ProjectDetailCards = ({ name, respOne, respTwo }) => {
	return (
		<div className='project__cards'>
			<div>
				<div>
					<div>
						<img src='' alt={name} />
					</div>
					<p>{respOne}</p>
				</div>
				<div>
					<div>
						<img src='' alt={name} />
					</div>
					<p>{respTwo}</p>
				</div>
			</div>
			<div>
				<div>
					<img src='' alt='' />
				</div>
				<div>
					<img src='' alt='' />
				</div>
				<div>
					<img src='' alt='' />
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailCards;
