// Actions
import { getSiteSettings } from '@/modules/site/actions/payloadContent'

// Components
import { ContactContent } from '@/modules/site/components/ContactContent'
import { PageHero } from '@/modules/site/components/PageHero'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
	const siteSettings = await getSiteSettings()

	return (
		<main>
			<PageHero text="ARE YOU LOOKING TO COLLABORATE? LET'S GET IN TOUCH!" />
			<ContactContent siteSettings={siteSettings} />
		</main>
	)
}
