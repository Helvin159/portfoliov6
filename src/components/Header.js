import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MobileMenuContext } from '../contexts/MobileMenuContext';

import openBtn from '../assets/svg/icon-hamburger.svg';
import closeBtn from '../assets/svg/icon-close.svg';

const Header = ({ lastName }) => {
	const navigate = useNavigate();
	const handleOnClick = () => navigate('/contact');

	const { isOpen, setIsOpen } = useContext(MobileMenuContext);

	const handleMobileMenu = (e) => {
		e.preventDefault();

		setIsOpen(!isOpen);
	};

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
						{isOpen && (
							<nav className='header__content__container__navs__mobile'>
								<button onClick={handleMobileMenu} className='close-btn'>
									<img src={closeBtn} alt='Close button' />
								</button>
								<ul>
									{window.location.pathname.toString() !== '/' && (
										<li>
											<Link to='/'>Home</Link>
										</li>
									)}
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
						)}

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
