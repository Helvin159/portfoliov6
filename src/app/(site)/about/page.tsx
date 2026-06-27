// Actions
import { getSiteSettings } from '@/modules/site/actions/payloadContent'

// Components
import { AboutContent } from '@/modules/site/components/AboutContent'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
	const siteSettings = await getSiteSettings()

	return (
		<main>
			<AboutContent siteSettings={siteSettings} />
		</main>
	)
}
