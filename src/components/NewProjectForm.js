import React, { useEffect, useRef, useState } from 'react';
import { addDocToCollection } from '../utils/firebase';
import { capitalizeFirstLetter } from '../utils/utils';

import plusOne from '../assets/svg/icon-plus-one.svg';

const NewProjectForm = () => {
	const genInfo = useRef();
	const responsibilities = useRef();
	const screenshots = useRef();
	const videos = useRef();
	const cmsWork = useRef();
	const langGroup = useRef();

	const inputArrPlaceholder = 'Enter language used in this project.';
	const [arr, setArr] = useState([
		{ type: 'text', placeholder: inputArrPlaceholder },
	]);

	useEffect(() => {
		setArr([{ type: 'text', placeholder: inputArrPlaceholder }]);
	}, []);

	const addExtraInput = (e) => {
		e.preventDefault();

		setArr((s) => {
			return [
				...s,
				{
					type: 'text',
					placeholder: inputArrPlaceholder,
				},
			];
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let arrToSubmit = [];
		for (let i = 0; i < langGroup.current.length; i++) {
			let o = { lang: langGroup.current[i].value };
			arrToSubmit.push(o);
		}

		if (genInfo?.current[0].value === '') {
			return alert('must enter name');
		}

		const project = {
			projectId: `${genInfo?.current[0].value.trim()}-${Math.floor(
				Math.random() * 1000
			)}-Yerr-${Math.floor(Math.random() * 100)}`,
			projectName: `${capitalizeFirstLetter(genInfo?.current[0].value)}`,
			workDone: `${cmsWork?.current[1].value}`,
			responsibilities: {
				respOne: {
					title: `${responsibilities?.current[0].value}`,
					copy: `${responsibilities?.current[1].value}`,
				},
				respTwo: {
					title: `${responsibilities?.current[2].value}`,
					copy: `${responsibilities?.current[3].value}`,
				},
			},
			screenshots: {
				landscape: {
					s1: `${screenshots?.current[0].value}`,
					s2: `${screenshots?.current[1].value}`,
					s3: `${screenshots?.current[2].value}`,
				},
				portrait: {
					s1: `${screenshots?.current[3].value}`,
					s2: `${screenshots?.current[4].value}`,
					s3: `${screenshots?.current[5].value}`,
				},
			},
			videos: {
				video_one: `${videos?.current[0].value}`,
			},
			languages: [...arrToSubmit],
			frameworks: [{ framework: '' }],
			cms: `${cmsWork?.current[0].value}`,
			url: `${genInfo?.current[1].value}`,
		};

		try {
			await addDocToCollection(process.env.REACT_APP_COLLECTION_ID, project);

			console.log('success');
			setTimeout(() => {
				window.scrollTo(0, 0);
				window.location.reload();
			}, 1000);
		} catch (e) {
			console.log(e, 'error');
		}
	};

	return (
		<div className='new__project'>
			<div className='new__project__form-container'>
				<div className='new__project__form-container__form'>
					<div className='new__project__form-container__form__input-group'>
						<h2>general info</h2>

						{/* General Information */}
						<form
							ref={genInfo}
							className='new__project__form-container__form__input-group__gen-info'>
							<label htmlFor='project-name'>Project Name</label>
							<input
								name='project-name'
								type='text'
								placeholder='Project name'
							/>
							<label htmlFor='url'>Url</label>
							<input type='text' name='url' placeholder='Enter url' />
						</form>

						{/* Languages */}
						<form
							ref={langGroup}
							className='new__project__form-container__form__input-group__languages'>
							<label className='languages' htmlFor='languages'>
								Language(s)
								<span onClick={addExtraInput}>
									<img
										style={{ width: '25px', margin: '0', padding: '0' }}
										src={plusOne}
										alt='Add 1 more input'
									/>
								</span>
							</label>
							{arr &&
								arr.map((i, k) => (
									<input
										type={i.type}
										id={`lang_${k}`}
										placeholder={i.placeholder}
										key={k}
									/>
								))}
						</form>

						{/* Cms & Work performed */}
						<form
							ref={cmsWork}
							className='new__project__form-container__form__input-group__gen-info'>
							<label htmlFor='cms'>CMS</label>
							<input
								name='cms'
								placeholder='Enter CMS used for this project.'
							/>

							<label htmlFor='work-prformed'>Work performed</label>
							<textarea
								type='text'
								name='work-prformed'
								placeholder='Enter some information on work performed for this project.'
							/>
						</form>
					</div>

					<div className='new__project__form-container__form__input-group'>
						<form ref={responsibilities}>
							<h2>Responsibilities</h2>
							<label htmlFor='resp-one-title'>Responsibility One Title</label>
							<input name='resp-one-title' type='text' />

							<label htmlFor='resp-one-copy'>Responsibility One Copy</label>
							<textarea name='resp-one-copy' type='text' />

							<label htmlFor='resp-two-title'>Responsibility Two Title</label>
							<input name='resp-two-title' type='text' />

							<label htmlFor='resp-two-copy'>Responsibility Two Copy</label>
							<textarea name='resp-two-copy' type='text' />
						</form>
					</div>

					<div className='new__project__form-container__form__input-group'>
						<form ref={screenshots}>
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
						</form>
					</div>
					<div className='new__project__form-container__form__input-group'>
						<form ref={videos}>
							<h2>Videos</h2>
							<h3 htmlFor='video-one'>URL</h3>
							<input
								type='text'
								name='video-one'
								placeholder='Enter video url'
							/>
						</form>
					</div>

					<div className='new__project__form-container__form__input-group'>
						<button type='submit' onClick={handleSubmit}>
							submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewProjectForm;
