/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import linkedInImg from '../assets/svg/icon-linkedin.svg';
import instagramImg from '../assets/svg/icon-instagram.svg';

const Footer = ({ name, email, linkedIn, instagram, github }) => {
	const loadingText = 'Loading...';
	return (
		<div className='footer'>
			<div className='footer__contact__container'>
				<div className='footer__contact__container__form footer__contact__container__sizing'>
					<div className='footer__contact__container__form__header'>
						<p>// Drop Me A Line</p>
					</div>
					<form>
						<input
							type='text'
							id='name'
							name='name'
							placeholder='YOUR NAME *'
						/>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='YOUR EMAIL *'
						/>
						<input
							type='text'
							id='pjType'
							name='pjType'
							placeholder='WHAT TYPE OF PROJECT ARE YOU LOOKING FOR?'
						/>
						<input
							type='text'
							id='msg'
							name='msg'
							placeholder='WRITE A MESSAGE...'
						/>
					</form>
					<button onClick={(e) => e.preventDefault()}>send</button>
				</div>
				<div className='footer__contact__container__contact footer__contact__container__sizing'>
					<div className='footer__contact__container__contact__header'>
						<p>// Lets Colaborate</p>
					</div>
					<div className='contact-details'>
						<h2>{name ? name : loadingText}</h2>
						<div className='links'>
							<a href='tel:9295236682'>(929) 523-6682</a>
							<a href={`mailto:${email ? email : loadingText}`}>
								{email ? email : loadingText}
							</a>
						</div>
					</div>
					<div className='social-media'>
						<p>Connect with me on socila media!</p>
						<a href={linkedIn} target='_blank' rel='noreferrer'>
							<img src={linkedInImg} alt='LinkedIn' />
						</a>
						<a href={instagram} target='_blank' rel='noreferrer'>
							<img src={instagramImg} alt='Instagram' />
						</a>
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
