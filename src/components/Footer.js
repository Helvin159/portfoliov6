/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import linkedIn from '../assets/svg/icon-linkedin.svg';
import instagram from '../assets/svg/icon-instagram.svg';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer__contact__container'>
				<div className='footer__contact__container__form footer__contact__container__sizing'>
					<div className='footer__contact__container__form__header'>
						<p>// Drop Me A Line</p>
					</div>
					<form>
						<input type='text' placeholder='YOUR NAME *' />
						<input type='email' placeholder='YOUR EMAIL *' />
						<input
							type='text'
							placeholder='WHAT TYPE OF PROJECT ARE YOU LOOKING FOR?'
						/>
						<input type='text' placeholder='WRITE A MESSAGE...' />
					</form>
					<button>send</button>
				</div>
				<div className='footer__contact__container__contact footer__contact__container__sizing'>
					<div className='footer__contact__container__contact__header'>
						<p>// Lets Colaborate</p>
					</div>
					<div className='contact-details'>
						<h2>Helvin Rymer</h2>
						<div className='links'>
							<a href='tel:9295236682'>(929) 523-6682</a>
							<a href='mailto:helvin159@gmail.com'>Helvin159@Gmail.com</a>
						</div>
					</div>
					<div className='social-media'>
						<p>Connect with me on socila media!</p>
						<img src={linkedIn} alt='LinkedIn' />
						<img src={instagram} alt='Instagram' />
					</div>
				</div>
			</div>
			<div className='footer__copyright__container'>
				<p>Copyright</p>
			</div>
		</div>
	);
};

export default Footer;
