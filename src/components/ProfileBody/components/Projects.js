/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Fragment } from 'react';

const Projects = ({ projects }) => {
	return (
		<Fragment>
			<div className='profile-projects'>
				<h2>// Projects</h2>
				<div className='profile-projects__container'>
					{projects
						? projects.map((i, k) => (
								<div
									data-projectid={i.id}
									className='profile-projects__container__project'
									key={k}>
									<h3 data-projectid={i.id}>{i.projectName}</h3>
									<p data-projectid={i.id}>Project description</p>
									<div className='profile-projects__container__project__img-group'>
										<div className='profile-projects__container__project__img-group__portrait'>
											<img
												data-projectid={i.id}
												src={i.screenshots.portrait.s2}
												alt={i.projectName}
											/>
										</div>
										<div className='profile-projects__container__project__img-group__landscape'>
											<div className='profile-projects__container__project__img-group__landscape__img'>
												<img
													data-projectid={i.id}
													src={i.screenshots.landscape.s1}
													alt={i.projectName}
												/>
											</div>
											<div className='profile-projects__container__project__img-group__landscape__img'>
												<img
													data-projectid={i.id}
													src={i.screenshots.landscape.s2}
													alt={i.projectName}
												/>
											</div>
										</div>
									</div>
								</div>
						  ))
						: 'Loading'}
				</div>
			</div>
		</Fragment>
	);
};

export default Projects;
