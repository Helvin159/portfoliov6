/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import backBtn from '../assets/svg/icon-arrow-back.svg';
import { useNavigate } from 'react-router';

const ProjectHero = ({ name, img, about, langs }) => {
	const navigate = useNavigate();

	return (
		<div className='project__hero'>
			<div className='project__hero__back-btn'>
				<img src={backBtn} alt='Back button' onClick={() => navigate(-1)} />
			</div>
			<div className='project__hero__header'>
				<h1>{`Project: ${name}`}</h1>
				<div className='project__hero__header__languages'>
					{langs.map((i, k) => (
						<span key={k}>{i.lang}</span>
					))}
				</div>
			</div>
			<div className='project__hero__img'>
				<img src={img} alt={name} loading='lazy' />
			</div>
			<div className='project__hero__about'>
				<h2>// About the project</h2>
				<p>{about}</p>
			</div>
		</div>
	);
};

export default ProjectHero;
