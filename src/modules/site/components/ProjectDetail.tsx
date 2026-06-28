// Next
import Link from 'next/link'

// Components
import { getProjectTags, getSortedScreenshots } from '@/modules/site/components/projectMedia'
import { ProjectVideo } from '@/modules/site/components/ProjectVideo'

// Types
import type { SiteProject } from '@/modules/site/types/content'

type ProjectDetailProps = {
	project: SiteProject
}

export function ProjectDetail({ project }: ProjectDetailProps) {
	const sortedScreenshots = getSortedScreenshots(project)
	const landscapeScreenshots = sortedScreenshots.filter(
		(screenshot) => screenshot.orientation === 'landscape',
	)
	const heroImage = landscapeScreenshots[0] ?? null
	const responsibilityScreenshots = landscapeScreenshots.slice(1)
	const portraitScreenshots = sortedScreenshots
		.filter((screenshot) => screenshot.orientation === 'portrait')
		.slice(0, 3)
	const responsibilities = project.responsibilities ?? []
	const tags = getProjectTags(project)

	return (
		<>
			<section className="project__hero">
				<div className="project__hero__back-btn">
					<Link href="/featured" aria-label="Back to featured projects">
						Back
					</Link>
				</div>
				<div className="project__hero__header">
					<h1>{`Project: ${project.title}`}</h1>
					{tags.length > 0 ? (
						<div className="project__hero__header__languages">
							{tags.map((tag) => (
								<span key={tag.label}>{tag.label}</span>
							))}
						</div>
					) : null}
				</div>
				{heroImage ? (
					<div className="project__hero__img">
						<img src={heroImage.url} alt={heroImage.alt} />
					</div>
				) : null}
				<div className="project__hero__about">
					<h2>// About the project</h2>
					<p>{project.summary}</p>
					{project.externalUrl ? (
						<Link className="project__hero__external" href={project.externalUrl}>
							Visit project
						</Link>
					) : null}
				</div>
			</section>
			{responsibilities.length > 0 || portraitScreenshots.length > 0 ? (
				<section className="project__cards">
					<div className="project__cards__container">
						{responsibilities.map((responsibility, index) => {
							const screenshot = responsibilityScreenshots[index]

							return (
								<article className="project__cards__container__card" key={responsibility.id ?? index}>
									{screenshot ? (
										<div className="project__cards__container__card__img">
											<img src={screenshot.url} alt={screenshot.alt} />
										</div>
									) : null}
									<div className="project__cards__container__card__summary">
										<h3>{`About ${responsibility.title}`}</h3>
										{responsibility.copy ? <p>{responsibility.copy}</p> : null}
									</div>
								</article>
							)
						})}
					</div>
					{portraitScreenshots.length > 0 ? (
						<div className="project__cards__gallery">
							{portraitScreenshots.map((screenshot) => (
								<div className="project__cards__gallery__card" key={screenshot.id ?? screenshot.url}>
									<img src={screenshot.url} alt={screenshot.alt} />
								</div>
							))}
						</div>
					) : null}
				</section>
			) : null}
			<ProjectVideo project={project} posterUrl={project.video?.posterUrl ?? heroImage?.url} />
		</>
	)
}
