import React, { useRef } from 'react';
import { addCollectionAndDocs } from '../utils/firebase';

const NewProjectForm = () => {
	const name = useRef();
	const workPerformed = useRef();
	const url = useRef();
	const languages = useRef();
	const cms = useRef();
	const respOneTitle = useRef();
	const respOneCopy = useRef();
	const respTwoTitle = useRef();
	const respTwoCopy = useRef();
	const sOne = useRef();
	const sTwo = useRef();
	const sThree = useRef();
	const sFour = useRef();
	const sFive = useRef();
	const sSix = useRef();

	let project = {
		projectId: Math.floor(Math.random() * 1000),
		projectName: `${name}`,
		workDone: `${workPerformed}`,
		responsibilities: {
			respOne: {
				title: `${respOneTitle}`,
				copy: `${respOneCopy}`,
			},
			respTwo: {
				title: `${respTwoTitle}`,
				copy: `${respTwoCopy}`,
			},
		},
		screenshots: {
			landscape: {
				s1: `${sOne}`,
				s2: `${sTwo}`,
				s3: `${sThree}`,
			},
			portrait: {
				s1: `${sFour}`,
				s2: `${sFive}`,
				s3: `${sSix}`,
			},
		},
		videos: {
			video_one: '',
		},
		languages: [{ lang: '' }],
		frameworks: [{ framework: '' }],
		cms: `${cms}`,
		url: `${url}`,
	};

	const handleSubmit = () => addCollectionAndDocs('projectsTest', project);

	return (
		<div className='new__project'>
			<div className='new__project__form-container'>
				<form
					className='new__project__form-container__form'
					onSubmit={handleSubmit}>
					<div className='new__project__form-container__form__input-group'>
						<h2>general info</h2>
						<label htmlFor='project-name'>Project Name</label>
						<input
							name='project-name'
							ref={name}
							type='text'
							placeholder='Project name'
						/>

						<label htmlFor='url'>Url</label>
						<input type='text' ref={url} name='url' placeholder='Enter url' />

						<label htmlFor='languages'>Languages</label>
						<input
							type='text'
							ref={languages}
							placeholder='Enter language used in project'
						/>

						<label htmlFor='cms'>CMS</label>
						<input
							name='cms'
							ref={cms}
							placeholder='Enter CMS used for this project.'
						/>

						<label htmlFor='work-prformed'>Work performed</label>
						<textarea
							type='text'
							ref={workPerformed}
							name='work-prformed'
							placeholder='Enter some information on work performed for this project.'
						/>
					</div>

					<div className='new__project__form-container__form__input-group'>
						<h2>Responsibilities</h2>
						<label htmlFor='resp-one-title'>Responsibility One Title</label>
						<input name='resp-one-title' ref={respOneTitle} type='text' />

						<label htmlFor='resp-one-copy'>Responsibility One Copy</label>
						<textarea name='resp-one-copy' type='text' ref={respOneCopy} />

						<label htmlFor='resp-two-title'>Responsibility Two Title</label>
						<input name='resp-two-title' ref={respTwoTitle} type='text' />

						<label htmlFor='resp-two-copy'>Responsibility Two Copy</label>
						<textarea name='resp-two-copy' ref={respTwoCopy} type='text' />
					</div>

					<div className='new__project__form-container__form__input-group'>
						<h2>Screenshots</h2>
						<div>
							<h3>Landscape</h3>
							<input
								type='text'
								name='screenshot-landscape-one'
								placeholder='Image url'
								ref={sOne}
							/>
							<input
								type='text'
								name='screenshot-landscape-two'
								placeholder='Image url'
								ref={sTwo}
							/>
							<input
								type='text'
								name='screenshot-landscape-three'
								placeholder='Image url'
								ref={sThree}
							/>
						</div>
						<div>
							<h3>Portrait</h3>
							<input
								type='text'
								name='screenshot-portrait-one'
								placeholder='Image url'
								ref={sFour}
							/>
							<input
								type='text'
								name='screenshot-portrait-two'
								placeholder='Image url'
								ref={sFive}
							/>
							<input
								type='text'
								name='screenshot-portrait-three'
								placeholder='Image url'
								ref={sSix}
							/>
						</div>
					</div>

					<div className='new__project__form-container__form__input-group'>
						<h2>Videos</h2>
						<label htmlFor='video-one'>Video URL</label>
						<input type='text' name='video-one' placeholder='Enter video url' />
					</div>
					<div className='new__project__form-container__form__input-group'>
						<button type='submit'>submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewProjectForm;
