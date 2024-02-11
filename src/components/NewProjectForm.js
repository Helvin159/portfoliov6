import React, { useRef } from 'react';
import { addDocToCollection } from '../utils/firebase';
import { capitalizeFirstLetter } from '../utils/utils';

const NewProjectForm = () => {
	const form = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const project = {
			projectId: `${form?.current[0].value}-${Math.floor(
				Math.random() * 1000
			)}`,
			projectName: `${capitalizeFirstLetter(form?.current[0].value)}`,
			workDone: `${form?.current[4].value}`,
			responsibilities: {
				respOne: {
					title: `${form?.current[5].value}`,
					copy: `${form?.current[6].value}`,
				},
				respTwo: {
					title: `${form?.current[7].value}`,
					copy: `${form?.current[8].value}`,
				},
			},
			screenshots: {
				landscape: {
					s1: `${form?.current[9].value}`,
					s2: `${form?.current[10].value}`,
					s3: `${form?.current[11].value}`,
				},
				portrait: {
					s1: `${form?.current[12].value}`,
					s2: `${form?.current[13].value}`,
					s3: `${form?.current[14].value}`,
				},
			},
			videos: {
				video_one: `${form?.current[15].value}`,
			},
			languages: [{ lang: `${form?.current[2].value}` }],
			frameworks: [{ framework: '' }],
			cms: `${form?.current[3].value}`,
			url: `${form?.current[1].value}`,
		};

		await addDocToCollection(process.env.REACT_APP_COLLECTION_ID, project);
	};

	return (
		<div className='new__project'>
			<div className='new__project__form-container'>
				<form ref={form} className='new__project__form-container__form'>
					<div className='new__project__form-container__form__input-group'>
						<h2>general info</h2>
						<label htmlFor='project-name'>Project Name</label>
						<input name='project-name' type='text' placeholder='Project name' />

						<label htmlFor='url'>Url</label>
						<input type='text' name='url' placeholder='Enter url' />

						<label htmlFor='languages'>Languages</label>
						<input type='text' placeholder='Enter language used in project' />

						<label htmlFor='cms'>CMS</label>
						<input name='cms' placeholder='Enter CMS used for this project.' />

						<label htmlFor='work-prformed'>Work performed</label>
						<textarea
							type='text'
							name='work-prformed'
							placeholder='Enter some information on work performed for this project.'
						/>
					</div>

					<div className='new__project__form-container__form__input-group'>
						<h2>Responsibilities</h2>
						<label htmlFor='resp-one-title'>Responsibility One Title</label>
						<input name='resp-one-title' type='text' />

						<label htmlFor='resp-one-copy'>Responsibility One Copy</label>
						<textarea name='resp-one-copy' type='text' />

						<label htmlFor='resp-two-title'>Responsibility Two Title</label>
						<input name='resp-two-title' type='text' />

						<label htmlFor='resp-two-copy'>Responsibility Two Copy</label>
						<textarea name='resp-two-copy' type='text' />
					</div>

					<div className='new__project__form-container__form__input-group'>
						<h2>Screenshots</h2>
						<div>
							<h3>Landscape</h3>
							<input
								type='text'
								name='screenshot-landscape-one'
								placeholder='Image url'
							/>
							<input
								type='text'
								name='screenshot-landscape-two'
								placeholder='Image url'
							/>
							<input
								type='text'
								name='screenshot-landscape-three'
								placeholder='Image url'
							/>
						</div>
						<div>
							<h3>Portrait</h3>
							<input
								type='text'
								name='screenshot-portrait-one'
								placeholder='Image url'
							/>
							<input
								type='text'
								name='screenshot-portrait-two'
								placeholder='Image url'
							/>
							<input
								type='text'
								name='screenshot-portrait-three'
								placeholder='Image url'
							/>
						</div>
					</div>

					<div className='new__project__form-container__form__input-group'>
						<h2>Videos</h2>
						<label htmlFor='video-one'>Video URL</label>
						<input type='text' name='video-one' placeholder='Enter video url' />
					</div>
					<div className='new__project__form-container__form__input-group'>
						<button type='submit' onClick={handleSubmit}>
							submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewProjectForm;
