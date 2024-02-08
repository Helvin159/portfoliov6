import { SMTPClient } from 'emailjs';

export const emailViaGmail = (e) => {
	e.preventDefault();

	const name = document.getElementById('name');

	const msg = document.getElementById('msg');
	const from = document.getElementById('email');
	const to = 'helvin159@gmail.com';
	const cc = '';
	const subject = `New MrRymer.com email from ${name}`;

	const client = new SMTPClient({
		user: 'helvin159@gmail.com',
		password: 'DoRaRyMeR0411!?!',
		host: 'smtp.gmail.com',
		ssl: true,
	});

	client.send({
		text: msg,
		from: from,
		to: to,
		cc: cc,
		subject: subject,
	});
};
