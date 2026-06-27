// Actions
import { getProjects } from '@/modules/site/actions/payloadContent'

// Components
import { PageHero } from '@/modules/site/components/PageHero'
import { ProjectGallery } from '@/modules/site/components/ProjectGallery'

export const dynamic = 'force-dynamic'

export default async function FeaturedPage() {
	const projects = await getProjects()

	return (
		<main>
			<PageHero text="Check Out My Work for Other Clients" />
			<ProjectGallery includeDetails projects={projects} />
		</main>
	)
}
