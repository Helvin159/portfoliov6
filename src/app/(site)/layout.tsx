// Next
import type { Metadata } from 'next'
import Link from 'next/link'

// Actions
import { getSiteSettings } from '@/modules/site/actions/payloadContent'

// Components
import Footer from '@/modules/site/components/Footer'

// Types
import type { ReactNode } from 'react'

// Utils
import '@/assets/styles/sass/main.scss'
import '@/assets/styles/css/globals.css'

export const metadata: Metadata = {
	title: 'Helvin Rymer | Portfolio',
	description: 'Front-end development portfolio powered by Next.js and Payload CMS.',
}

export const dynamic = 'force-dynamic'

type SiteLayoutProps = Readonly<{
	children: ReactNode
}>

export default async function SiteLayout({ children }: SiteLayoutProps) {
	const siteSettings = await getSiteSettings()
	const footerSocialLinks = (siteSettings?.socialLinks ?? []).map((link) => ({
		id: link.id,
		platform: link.platform,
		url: link.url,
	}))

	return (
		<html lang="en">
			<body>
				<div className="site-shell">
					<header className="site-nav">
						<Link href="/">Helvin Rymer</Link>
						<nav className="site-nav__links" aria-label="Primary navigation">
							<Link href="/about">About</Link>
							<Link href="/featured">Projects</Link>
							<Link href="/contact">Contact</Link>
							<Link href="/admin">Admin</Link>
						</nav>
					</header>
					{children}
				</div>
				<Footer
					email={siteSettings?.contactInfo.email ?? null}
					name={siteSettings?.name ?? null}
					socialLinks={footerSocialLinks}
				/>
			</body>
		</html>
	)
}
