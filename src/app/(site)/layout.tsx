// Next
import type { Metadata } from 'next';
import Link from 'next/link';
// Actions
import { getSiteSettings } from '@/modules/site/actions/payloadContent';
// Components
import Footer from '@/modules/site/components/Footer';
import SiteHeader from '@/modules/site/components/SiteHeader';
// Types
import type { ReactNode } from 'react';

// CSS
import '@/assets/styles/sass/main.scss';
import '@/assets/styles/css/globals.css';

export const metadata: Metadata = {
  title: 'Helvin Rymer | Portfolio',
  description:
    'Front-end development portfolio powered by Next.js and Payload CMS.'
};

export const dynamic = 'force-dynamic';

type SiteLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const siteSettings = await getSiteSettings();
  const footerSocialLinks = (siteSettings?.socialLinks ?? []).map((link) => ({
    id: link.id,
    platform: link.platform,
    url: link.url
  }));

  return (
    <html lang='en'>
      <body>
        <div className='site-shell'>
          <SiteHeader />
          {children}
        </div>
        <Footer
          email={siteSettings?.contactInfo.email ?? null}
          name={siteSettings?.name ?? null}
          socialLinks={footerSocialLinks}
        />
      </body>
    </html>
  );
}
