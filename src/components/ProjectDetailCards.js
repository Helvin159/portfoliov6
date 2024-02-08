import React from 'react';

import imgOne from '../assets/png/project-det-one.png';
import imgTwo from '../assets/png/project-det-two.png';
import imgThree from '../assets/png/project-det-three.png';
import imgFour from '../assets/png/project-det-four.png';
import imgFive from '../assets/png/project-det-five.png';

const ProjectDetailCards = ({
	name,
	responsibilities,
	landscapeS2,
	landscapeS3,
	portraitS1,
	portraitS2,
	portraitS3,
}) => {
	const comingSoon = 'coming soon...';

	const { respOne, respTwo } = responsibilities;

	return (
		<div className='project__cards'>
			<div className='project__cards__container'>
				<div className='project__cards__container__card'>
					<div className='project__cards__container__card__img'>
						<img
							src={landscapeS2 ? landscapeS2 : imgFour}
							alt={name}
							loading='lazy'
						/>
					</div>
					<div className='project__cards__container__card__summary'>
						<h3>{`About ${respOne.title ? respOne.title : comingSoon}`}</h3>
						<p>{respOne.copy ? respOne.copy : comingSoon}</p>
					</div>
				</div>
				<div className='project__cards__container__card'>
					<div className='project__cards__container__card__img'>
						<img
							src={landscapeS3 ? landscapeS3 : imgFive}
							alt={name}
							loading='lazy'
						/>
					</div>
					<div className='project__cards__container__card__summary'>
						<h3>{`About ${respTwo.title ? respTwo.title : comingSoon}`}</h3>
						<p>{respTwo.copy ? respTwo.copy : comingSoon}</p>
					</div>
				</div>
			</div>
			<div className='project__cards__gallery'>
				<div className='project__cards__gallery__card'>
					<img
						src={portraitS1 ? portraitS1 : imgOne}
						alt={name}
						loading='lazy'
					/>
				</div>
				<div className='project__cards__gallery__card'>
					<img
						src={portraitS2 ? portraitS2 : imgTwo}
						alt={name}
						loading='lazy'
					/>
				</div>
				<div className='project__cards__gallery__card'>
					<img
						src={portraitS3 ? portraitS3 : imgThree}
						alt={name}
						loading='lazy'
					/>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailCards;
