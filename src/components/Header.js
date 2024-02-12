import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MobileMenuContext } from '../contexts/MobileMenuContext';

import openBtn from '../assets/svg/icon-hamburger.svg';
import closeBtn from '../assets/svg/icon-close.svg';
import { UserContext } from '../contexts/UserContext';

const Header = ({ lastName }) => {
	const { isOpen, setIsOpen } = useContext(MobileMenuContext);
	const { avatarUrl } = useContext(UserContext);

	// avatarUrl && console.log(avatarUrl, 'header');

	const navigate = useNavigate();
	const handleOnClick = () => {
		navigate('/contact');
	};

	const handleMobileMenu = (e) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	const handleMobileLink = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='header'>
			<div className='header__content'>
				<div className='header__content__container'>
					<div className='header__content__container__title'>
						<div
							className={`header__content__container__title__avatar ${
								avatarUrl ? 'show' : ''
							}`}>
							<Link to={'/profile'}>
								<img src={avatarUrl} alt='User Profile' />
							</Link>
						</div>
						<div className='header__content__container__title__text'>
							<Link to={'/'}>
								{lastName ? `Mr. ${lastName}` : 'Loading...'}
							</Link>
						</div>
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

						<nav
							className={`header__content__container__navs__mobile ${
								isOpen ? 'show' : ''
							} `}>
							<button onClick={handleMobileMenu} className='close-btn'>
								<img src={closeBtn} alt='Close button' />
							</button>
							<ul>
								{window.location.pathname.toString() !== '/' && (
									<li>
										<Link to='/' onClick={handleMobileLink}>
											Home
										</Link>
									</li>
								)}
								<li>
									<Link to='/featured' onClick={handleMobileLink}>
										Projects
									</Link>
								</li>
								<li>
									<Link to='/about' onClick={handleMobileLink}>
										About
									</Link>
								</li>
								<li>
									<Link to={'/contact'} onClick={handleOnClick}>
										Contact
									</Link>
								</li>
							</ul>
						</nav>

						<button className='open-btn' onClick={handleMobileMenu}>
							<img src={openBtn} alt='Open menu' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
