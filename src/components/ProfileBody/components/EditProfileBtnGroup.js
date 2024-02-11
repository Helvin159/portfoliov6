/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const EditProfileBtnGroup = () => {
	return (
		<Fragment>
			<div className='edit-profile'>
				<h2>// Edit</h2>
				<div className='edit-profile__btn-group'>
					<Link>update bio</Link>
					<Link>edit projects</Link>
					<Link to={'new-project'}>add project</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default EditProfileBtnGroup;
