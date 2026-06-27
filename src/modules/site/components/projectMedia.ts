// Types
import type { ProjectScreenshot, ProjectTag, SiteProject } from '@/modules/site/types/content'

export function getSortedScreenshots(project: SiteProject): ProjectScreenshot[] {
	return [...(project.screenshots ?? [])].sort((firstScreenshot, secondScreenshot) => {
		return firstScreenshot.order - secondScreenshot.order
	})
}

export function getScreenshotByOrientation(
	project: SiteProject,
	orientation: ProjectScreenshot['orientation'],
	index = 0,
): ProjectScreenshot | null {
	return (
		getSortedScreenshots(project).filter((screenshot) => screenshot.orientation === orientation)[index] ??
		null
	)
}

export function getProjectTags(project: SiteProject): ProjectTag[] {
	return [
		...(project.languages ?? []).map((language) => ({ label: language.language })),
		...(project.frameworks ?? []).map((framework) => ({ label: framework.framework })),
		...(project.cmsPlatforms ?? []).map((platform) => ({ label: platform.platform })),
	]
}
