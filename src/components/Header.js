import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ lastName }) => {
	const navigate = useNavigate();
	const handleOnClick = () => navigate('/contact');

	return (
		<div className='header'>
			<div className='header__content'>
				<div className='header__content__container'>
					<div className='header__content__container__title'>
						<Link to={'/'}> {lastName ? `Mr. ${lastName}` : 'Loading...'}</Link>
					</div>
				</div>
				<div className='header__content__container'>
					<div className='header__content__container__navs'>
						<nav className='header__content__container__navs__desktop'>
							<ul>
								<li>
									<Link to='/featured'>Projects</Link>
								</li>
								<li>
									<Link to='/about'>About</Link>
								</li>
								<li>
									<button onClick={handleOnClick}>Contact</button>
								</li>
							</ul>
						</nav>
						<nav className='header__content__container__navs__mobile'>
							<ul>
								<li>
									<Link to='/featured'>Projects</Link>
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
			</div>
		</div>
	);
};

export default Header;
