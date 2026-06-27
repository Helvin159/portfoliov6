// Types
import type { Project, SiteSetting } from '../../../../payload-types'

export type SiteProject = Project

export type SiteSettings = SiteSetting

export type SiteSocialLink = NonNullable<SiteSettings['socialLinks']>[number]

export type ProjectScreenshot = NonNullable<SiteProject['screenshots']>[number]

export type ProjectTag = {
	label: string
}
