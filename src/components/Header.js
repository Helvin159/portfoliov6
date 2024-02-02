import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();
	const handleOnClick = () => navigate('/contact');

	return (
		<div className='header'>
			<div className='header__container'>
				<div className='header__container__title'>
					<Link to={'/'}>Helvin Rymer</Link>
				</div>
			</div>
			<div className='header__container'>
				<nav className='header__container__nav'>
					<ul>
						<li>
							<Link to='/featured'>Featured</Link>
						</li>
						<li>
							<Link to='/about'>About</Link>
						</li>
						<li>
							<button onClick={handleOnClick}>Contact</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Header;
