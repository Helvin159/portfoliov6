// Actions
import { getFeaturedProjects, getSiteSettings } from '@/modules/site/actions/payloadContent'

// Components
import { HomeHero } from '@/modules/site/components/HomeHero'
import { ProjectGallery } from '@/modules/site/components/ProjectGallery'
import { Services } from '@/modules/site/components/Services'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
	const [siteSettings, featuredProjects] = await Promise.all([
		getSiteSettings(),
		getFeaturedProjects(),
	])

	return (
		<main>
			<HomeHero siteSettings={siteSettings} />
			<Services services={siteSettings?.services} />
			<ProjectGallery projects={featuredProjects} showMoreLink title="// Previous work" />
		</main>
	)
}
