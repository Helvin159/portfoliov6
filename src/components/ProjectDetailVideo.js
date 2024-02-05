import React, { useRef } from 'react';

import playImg from '../assets/svg/icon-play-arrow.svg';
import pauseImg from '../assets/svg/icon-pause-presentation.svg';
import blogVid from '../assets/video/blogbyrollbyadp.MP4';

const ProjectDetailVideo = ({ videoPoster }) => {
	const player = useRef(null);

	const playVideo = () => player.current.play();
	const pauseVideo = () => player.current.pause();

	const onPlayAction = () => {
		const playBtn = document.getElementById('playBtn');
		const pauseBtn = document.getElementById('pauseBtn');

		playBtn.style.display = 'none';
		pauseBtn.style.display = 'block';
	};

	const onPauseAction = () => {
		const playBtn = document.getElementById('playBtn');
		const pauseBtn = document.getElementById('pauseBtn');

		pauseBtn.style.display = 'none';
		playBtn.style.display = 'block';
	};

	const onEndedAction = () => {
		const playBtn = document.getElementById('playBtn');
		const pauseBtn = document.getElementById('pauseBtn');

		pauseBtn.style.display = 'none';
		playBtn.style.display = 'block';
	};

	return (
		<div className='project__video'>
			<div className='project__video__header'>
				<h3>Video presentation</h3>
			</div>
			<div className='project__video__player'>
				<video
					ref={player}
					id='projectVideoPlayer'
					poster={videoPoster}
					loop
					onPlay={onPlayAction}
					onEnded={onEndedAction}
					onPause={onPauseAction}>
					<source src={blogVid} type='video/mp4' />
				</video>
				<div className='project__video__play__pause__container'>
					<button
						id='playBtn'
						className='project__video__play__pause__container__playBtn'
						onClick={playVideo}>
						<img src={playImg} alt='play button' />
					</button>

					<button
						id='pauseBtn'
						className='project__video__play__pause__container__pauseBtn'
						onClick={pauseVideo}>
						<img src={pauseImg} alt='Pause button' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailVideo;
