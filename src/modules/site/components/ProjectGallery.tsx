// Next
import Link from 'next/link'

// Components
import { getProjectTags, getScreenshotByOrientation } from '@/modules/site/components/projectMedia'

// Types
import type { SiteProject } from '@/modules/site/types/content'

type ProjectGalleryProps = {
	includeDetails?: boolean
	projects: SiteProject[]
	showMoreLink?: boolean
	title?: string
}

export function ProjectGallery({
	includeDetails = false,
	projects,
	showMoreLink = false,
	title,
}: ProjectGalleryProps) {
	if (projects.length === 0) {
		return (
			<section className="featured__gallery">
				<p className="featured__gallery__empty">Project content is not available yet.</p>
			</section>
		)
	}

	return (
		<section className="featured__gallery">
			{title ? <p className="featured__gallery__title">{title}</p> : null}
			{includeDetails ? (
				<div className="featured__gallery__border">
					<div className="border" />
				</div>
			) : null}
			<div className={`featured__gallery__items${includeDetails ? ' more-projects' : ''}`}>
				{projects.map((project) => {
					const image = getScreenshotByOrientation(project, 'landscape')
					const projectTags = getProjectTags(project).slice(0, 3)

					return (
						<article
							className={`featured__gallery__items__item${includeDetails ? ' item' : ''}`}
							key={project.id}
						>
							{image ? <img src={image.url} alt={image.alt} /> : null}
							{includeDetails ? (
								<div className="featured__gallery__items__item__details">
									<div className="featured__gallery__items__item__details__title">
										<Link href={`/featured/${project.slug}`}>{project.title}</Link>
									</div>
									<div className="featured__gallery__items__item__details__services">
										{projectTags.map((tag) => (
											<span key={tag.label}>{tag.label}</span>
										))}
									</div>
								</div>
							) : null}
							<div className={`overlay${includeDetails ? ' more-projects' : ''}`}>
								<Link href={`/featured/${project.slug}`}>see details</Link>
							</div>
						</article>
					)
				})}
			</div>
			{showMoreLink ? (
				<div className="featured__gallery__btn">
					<Link href="/featured">See more projects</Link>
				</div>
			) : null}
		</section>
	)
}
