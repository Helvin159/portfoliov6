'use client';

// React
import { useState } from 'react';

// Constants
import githubImg from '@/assets/svg/icon-github-square.svg';
import instagramImg from '@/assets/svg/icon-instagram.svg';
import linkedInImg from '@/assets/svg/icon-linkedin.svg';

// Utils
import { send } from '@emailjs/browser';
import { emailRegex } from '@/utils/utils';

// Types
import type { SiteSocialLink } from '@/modules/site/types/content';

type FooterSocialLink = Pick<SiteSocialLink, 'id' | 'platform' | 'url'>;

type FooterProps = {
  email: string | null;
  name: string | null;
  socialLinks: FooterSocialLink[];
};

type FieldErrors = {
  email: boolean;
  name: boolean;
};

type FormStatus = 'error' | 'idle' | 'sending' | 'sent';

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

const SOCIAL_ICON_BY_PLATFORM: Record<string, { alt: string; src: string }> = {
  github: {
    alt: 'Github',
    src: githubImg.src
  },
  instagram: {
    alt: 'Instagram',
    src: instagramImg.src
  },
  linkedin: {
    alt: 'LinkedIn',
    src: linkedInImg.src
  }
};

const initialFieldErrors: FieldErrors = {
  email: false,
  name: false
};

const Footer = ({ email, name, socialLinks }: FooterProps) => {
  const loadingText = 'loading...';
  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors>(initialFieldErrors);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const sendEmail = async (event: any) => {
    event.preventDefault();

    if (formStatus === 'sending') {
      return;
    }

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const fromName = String(formData.get('name') ?? '').trim();
    const fromEmail = String(formData.get('email') ?? '').trim();
    const projectType = String(formData.get('pjType') ?? '').trim();
    const message = String(formData.get('msg') ?? '').trim();
    const nextFieldErrors = {
      email: !fromEmail || !emailRegex.test(fromEmail),
      name: !fromName
    };

    setFieldErrors(nextFieldErrors);

    if (nextFieldErrors.email || nextFieldErrors.name) {
      setFormStatus('idle');
      return;
    }

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      if (!email) {
        setFormStatus('error');
        alert('Message failed, please try again...');
        return;
      }

      const mailtoSubject = encodeURIComponent(
        projectType || 'Portfolio inquiry'
      );
      const mailtoBody = encodeURIComponent(
        `Name: ${fromName}
Email: ${fromEmail}

Message:
${message || 'No message.'}

Project Type:
${projectType || 'No project type details.'}`
      );

      window.location.href = `mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      formElement.reset();
      setFieldErrors(initialFieldErrors);
      setFormStatus('sent');
      return;
    }

    setFormStatus('sending');

    try {
      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_email: fromEmail,
          from_message: `Message:
${message || 'No message.'}

Project Type:
${projectType || 'No project type details.'}`,
          from_name: fromName
        },
        EMAILJS_PUBLIC_KEY
      );

      formElement.reset();
      setFieldErrors(initialFieldErrors);
      setFormStatus('sent');
      alert('Message sent');
    } catch {
      setFormStatus('error');
      alert('Message failed, please try again...');
    }
  };

  return (
    <div className='footer'>
      <div className='footer__content'>
        <div className='footer__content__contact__container'>
          <div className='footer__content__contact__container__form footer__content__contact__container__sizing'>
            <div className='footer__content__contact__container__form__header'>
              <p>// Drop Me A Line</p>
            </div>
            <form
              action={email ? `mailto:${email}` : undefined}
              encType='text/plain'
              method='post'
              onSubmit={sendEmail}
            >
              <input
                className={fieldErrors.name ? 'error' : undefined}
                id='name'
                name='name'
                placeholder='YOUR NAME *'
                required
                type='text'
              />
              <p>Please enter a name.</p>
              <input
                className={fieldErrors.email ? 'error' : undefined}
                id='email'
                name='email'
                placeholder='YOUR EMAIL *'
                required
                type='email'
              />
              <p>Please enter a valid email address.</p>
              <input
                id='pjType'
                name='pjType'
                placeholder='WHAT TYPE OF PROJECT ARE YOU LOOKING FOR?'
                type='text'
              />
              <input
                id='msg'
                name='msg'
                placeholder='WRITE A MESSAGE...'
                type='text'
              />
              <button disabled={formStatus === 'sending'} type='submit'>
                {formStatus === 'sending' ? 'sending' : 'send'}
              </button>
            </form>
          </div>
          <div className='footer__content__contact__container__contact footer__content__contact__container__sizing'>
            <div className='footer__content__contact__container__contact__header'>
              <p>// Lets Colaborate</p>
            </div>
            <div className='contact-details'>
              <h2>{name ?? loadingText}</h2>
              <div className='links'>
                {email ? <a href={`mailto:${email}`}>{email}</a> : null}
              </div>
            </div>
            {socialLinks.length > 0 ? (
              <div className='social-media'>
                <p>Connect with me on social media!</p>
                {socialLinks.map((link) => {
                  const socialIcon =
                    SOCIAL_ICON_BY_PLATFORM[link.platform.toLowerCase()];

                  return (
                    <a
                      aria-label={link.platform}
                      href={link.url}
                      key={link.id ?? link.url}
                      rel='noreferrer'
                      target='_blank'
                    >
                      {socialIcon ? (
                        <img src={socialIcon.src} alt={socialIcon.alt} />
                      ) : (
                        <span>{link.platform}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className='footer__content__copyright__container'>
          <p>
            Copyright {new Date().getFullYear()} {name ?? 'Helvin Rymer'}. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
