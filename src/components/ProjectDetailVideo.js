import React from 'react';

import blogVid from '../assets/video/blogbyrollbyadp.MP4';

const ProjectDetailVideo = () => {
	return (
		<div className='project__video'>
			<div className='project__video__header'>
				<h3>Video presentation</h3>
			</div>
			<div className='project__video__player'>
				<video poster='' autoplay controls='true'>
					<source src={blogVid} type='video/mp4' />
				</video>
			</div>
		</div>
	);
};

export default ProjectDetailVideo;
