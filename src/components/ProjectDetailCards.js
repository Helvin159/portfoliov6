import React from 'react';

import imgOne from '../assets/png/project-det-one.png';
import imgTwo from '../assets/png/project-det-two.png';
import imgThree from '../assets/png/project-det-three.png';
import imgFour from '../assets/png/project-det-four.png';
import imgFive from '../assets/png/project-det-five.png';

const ProjectDetailCards = ({
	name,
	respOne,
	respOneTitle,
	respTwo,
	respTwoTitle,
}) => {
	return (
		<div className='project__cards'>
			<div className='project__cards__container'>
				<div className='project__cards__container__card'>
					<div className='project__cards__container__card__img'>
						<img src={imgFour} alt={name} />
					</div>
					<div className='project__cards__container__card__summary'>
						<h3>{`About ${respOneTitle}`}</h3>
						<p>{respOne}</p>
					</div>
				</div>
				<div className='project__cards__container__card'>
					<div className='project__cards__container__card__img'>
						<img src={imgFive} alt={name} />
					</div>
					<div className='project__cards__container__card__summary'>
						<h3>{`About ${respTwoTitle}`}</h3>
						<p>{respTwo}</p>
					</div>
				</div>
			</div>
			<div className='project__cards__gallery'>
				<div className='project__cards__gallery__card'>
					<img src={imgOne} alt={name} />
				</div>
				<div className='project__cards__gallery__card'>
					<img src={imgTwo} alt={name} />
				</div>
				<div className='project__cards__gallery__card'>
					<img src={imgThree} alt={name} />
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailCards;
