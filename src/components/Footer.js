/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext, useRef } from 'react';
import linkedInImg from '../assets/svg/icon-linkedin.svg';
import instagramImg from '../assets/svg/icon-instagram.svg';
import githubImg from '../assets/svg/icon-github-square.svg';
import emailjs from 'emailjs-com';

import { emailRegex } from '../utils/utils';
import { signInWPopup, signoutUser } from '../utils/firebase';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const Footer = ({ name, email, linkedIn, instagram, github }) => {
	const loadingText = 'loading...';

	const user = useContext(UserContext);

	if (user !== null) {
		console.log(user);
	}

	const fName = useRef(),
		fEmail = useRef(),
		fMsg = useRef(),
		fPjType = useRef(),
		form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		const nameInput = document.getElementById('name'),
			emailInput = document.getElementById('email');

		let msg = `
		Message:
		${fMsg.current.value ? fMsg.current.value.toString() : 'No message.'}

		Project Type:
		${
			fPjType.current.value
				? fPjType.current.value.toString()
				: 'No project type details.'
		}
		`;

		let templateParams = {
			from_name: fName.current.value.toString(),
			from_email: fEmail.current.value.toString(),
			from_message: msg,
		};

		// Check if name is empty
		if (fName.current.value === '' || null) {
			nameInput.classList.add('error');
			setTimeout(() => nameInput.classList.remove('error'), 3000);
		}

		// Check if email input is empty or doesnt match email pattern
		if (
			fEmail.current.value === '' ||
			null ||
			!emailRegex.test(fEmail.current.value)
		) {
			emailInput.classList.add('error');

			setTimeout(() => emailInput.classList.remove('error'), 3000);
		}

		// If email and name checks, send email
		if (
			(((fName.current.value !== '' || null) && fEmail.current.value !== '') ||
				null) &&
			emailRegex.test(fEmail.current.value)
		) {
			emailjs
				.send(
					process.env.REACT_APP_SERVICE_ID,
					process.env.REACT_APP_TEMPLATE_ID,
					templateParams,
					process.env.REACT_APP_PUBLIC_KEY
				)
				.then(
					(response) => {
						console.log('SUCCESS!', response.status, response.text);
						alert('Message sent');
					},
					(err) => {
						console.log('FAILED...', err);
						alert('Message failed, please try again...');
					}
				);
		}
	};

	const signInWithPopup = async () => {
		await signInWPopup();
	};

	return (
		<div className='footer'>
			<div className='footer__content'>
				<div className='footer__content__contact__container'>
					<div className='footer__content__contact__container__form footer__content__contact__container__sizing'>
						<div className='footer__content__contact__container__form__header'>
							<p>// Drop Me A Line</p>
						</div>
						<form ref={form}>
							<input
								type='text'
								id='name'
								name='name'
								placeholder='YOUR NAME *'
								ref={fName}
								required
							/>
							<p>Please enter a name.</p>
							<input
								type='email'
								id='email'
								name='email'
								placeholder='YOUR EMAIL *'
								ref={fEmail}
								required
							/>
							<p>Please enter a valid email address.</p>
							<input
								type='text'
								id='pjType'
								name='pjType'
								placeholder='WHAT TYPE OF PROJECT ARE YOU LOOKING FOR?'
								ref={fPjType}
							/>
							<input
								type='text'
								id='msg'
								name='msg'
								placeholder='WRITE A MESSAGE...'
								ref={fMsg}
							/>
						</form>
						<button type='submit' onClick={sendEmail}>
							send
						</button>
					</div>
					<div className='footer__content__contact__container__contact footer__content__contact__container__sizing'>
						<div className='footer__content__contact__container__contact__header'>
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
							<p>Connect with me on social media!</p>
							<a href={linkedIn} target='_blank' rel='noreferrer'>
								<img src={linkedInImg} alt='LinkedIn' />
							</a>
							<a href={instagram} target='_blank' rel='noreferrer'>
								<img src={instagramImg} alt='Instagram' />
							</a>
							<a href={github} target='_blank' rel='noreferrer'>
								<img src={githubImg} alt='Github' />
							</a>
						</div>
					</div>
				</div>
				<div className='footer__content__copyright__container'>
					<p>Copyright</p>
					{!user.user && <button onClick={signInWithPopup}>Admin?</button>}
					{user.user && <button onClick={signoutUser}>Signout</button>}
					{user.isAdmin !== false && <Link to='/new-project'>Add Project</Link>}
				</div>
			</div>
		</div>
	);
};

export default Footer;
