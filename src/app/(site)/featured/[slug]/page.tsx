// Next
import { notFound, permanentRedirect } from 'next/navigation'

// Actions
import {
	getProjectByLegacyProjectId,
	getProjectBySlug,
} from '@/modules/site/actions/payloadContent'

// Components
import { ProjectDetail } from '@/modules/site/components/ProjectDetail'

type ProjectDetailPageProps = {
	params: Promise<{
		slug: string
	}>
}

export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
	const { slug } = await params
	const project = await getProjectBySlug(slug)

	if (!project) {
		const legacyProject = await getProjectByLegacyProjectId(slug)

		if (legacyProject) {
			permanentRedirect(`/featured/${legacyProject.slug}`)
		}
	}

	if (!project) {
		notFound()
	}

	return (
		<main>
			<ProjectDetail project={project} />
		</main>
	)
}
