// Types
import type { SiteSettings } from '@/modules/site/types/content'

type ContactContentProps = {
	siteSettings: SiteSettings | null
}

export function ContactContent({ siteSettings }: ContactContentProps) {
	const email = siteSettings?.contactInfo?.email
	const socialLinks = siteSettings?.socialLinks ?? []

	return (
		<section className="contact__content">
			{email ? (
				<a className="contact__content__email" href={`mailto:${email}`}>
					{email}
				</a>
			) : null}
			{socialLinks.length > 0 ? (
				<div className="contact__content__links">
					{socialLinks.map((link) => (
						<a href={link.url} key={link.id ?? link.url}>
							{link.platform}
						</a>
					))}
				</div>
			) : null}
		</section>
	)
}
