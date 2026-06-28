// Constants
import {
	legacyContinuingEducation,
	legacyEducation,
	legacyEmployers,
	legacyGeneralInfo,
	legacyProjects,
} from '../constants/legacyContent'
import { formatSlug } from '@/modules/cms/constants/slug'

// Types
import type {
	FirestoreContentExport,
	LegacyEducationRecord,
	LegacyEmploymentRecord,
	LegacyGeneralInfo,
	LegacyProject,
	LegacyResponsibility,
	MigrationValidationResult,
	NormalizedEducationHistory,
	NormalizedEmploymentHistory,
	NormalizedMigrationData,
	NormalizedProject,
	NormalizedSiteSettings,
} from '../types/legacyContent'

type CreateMigrationDataOptions = {
	firestoreExport?: FirestoreContentExport
}

const MONTHS_BY_NAME: Record<string, number> = {
	april: 3,
	august: 7,
	december: 11,
	february: 1,
	january: 0,
	july: 6,
	june: 5,
	march: 2,
	may: 4,
	november: 10,
	october: 9,
	september: 8,
}

export function createMigrationSeedData(
	options: CreateMigrationDataOptions = {},
): NormalizedMigrationData {
	const firestoreProjectDocuments = options.firestoreExport?.collections?.projects
	const hasFirestoreProjectCollection = Array.isArray(firestoreProjectDocuments)
	const firestoreProjects = firestoreProjectDocuments
		?.map((document) => document.data)
		.filter(isLegacyProject)
	const firestoreSiteSettings = options.firestoreExport?.collections?.portfolioDetails
		?.map((document) => document.data)
		.find(isLegacyGeneralInfo)

	const projectSource = hasFirestoreProjectCollection ? (firestoreProjects ?? []) : legacyProjects
	const siteSettingsSource = firestoreSiteSettings ?? legacyGeneralInfo

	return {
		educationHistory: [
			...normalizeEducationRecords(legacyEducation, 'education', 0),
			...normalizeEducationRecords(legacyContinuingEducation, 'continuingEducation', legacyEducation.length),
		],
		employmentHistory: legacyEmployers.map(normalizeEmploymentRecord),
		projects: projectSource.map(normalizeProject),
		siteSettings: normalizeSiteSettings(siteSettingsSource),
		source: hasFirestoreProjectCollection || firestoreSiteSettings ? 'firestore-export' : 'local-js',
	}
}

export function validateMigrationSeedData(data: NormalizedMigrationData): MigrationValidationResult {
	const errors: string[] = []
	const warnings: string[] = []
	const projectSlugs = new Set<string>()

	if (!data.siteSettings.name) {
		errors.push('Site settings are missing a name.')
	}

	if (!data.siteSettings.contactInfo.email) {
		errors.push('Site settings are missing a contact email.')
	}

	if (!data.siteSettings.headlines?.length) {
		errors.push('Site settings require at least one headline.')
	}

	if (!data.siteSettings.aboutCopy?.length) {
		errors.push('Site settings require at least one about copy entry.')
	}

	for (const project of data.projects) {
		if (projectSlugs.has(project.slug)) {
			errors.push(`Duplicate project slug found: ${project.slug}.`)
		}

		projectSlugs.add(project.slug)

		if (!project.summary) {
			errors.push(`Project "${project.title}" is missing a summary.`)
		}

		const hasLandscapeScreenshot =
			project.screenshots?.some((screenshot) => screenshot.orientation === 'landscape') ?? false

		if (project._status === 'published' && !hasLandscapeScreenshot) {
			errors.push(
				`Project "${project.title}" is published and requires at least one landscape screenshot.`,
			)
		} else if (!project.screenshots?.length) {
			warnings.push(`Project "${project.title}" has no screenshots.`)
		}

		for (const screenshot of project.screenshots ?? []) {
			if (!isHttpUrl(screenshot.url)) {
				errors.push(`Project "${project.title}" has an invalid screenshot URL: ${screenshot.url}.`)
			}
		}

		if (project.video?.url && !isHttpUrl(project.video.url)) {
			errors.push(`Project "${project.title}" has an invalid video URL: ${project.video.url}.`)
		}
	}

	return { errors, warnings }
}

function normalizeSiteSettings(generalInfo: LegacyGeneralInfo): NormalizedSiteSettings {
	return {
		_status: 'published',
		aboutCopy: [
			generalInfo.short_about_me,
			generalInfo.short_about_me_two,
			generalInfo.short_description,
		]
			.filter(isNonEmptyString)
			.map((copy) => ({ copy })),
		cmsPlatforms: (generalInfo.cms ?? []).filter(isNonEmptyString).map((platform) => ({ platform })),
		contactInfo: {
			email: generalInfo.email_addy ?? 'helvin159@gmail.com',
			location: 'Methuen, MA USA',
		},
		headlines: [generalInfo.headline_one, generalInfo.short_description_two]
			.filter(isNonEmptyString)
			.map((copy) => ({ copy })),
		name: generalInfo.name ?? 'Helvin Rymer',
		role: generalInfo.position ?? 'Front-End Developer',
		services: normalizeServices(generalInfo.services),
		skills: (generalInfo.skills ?? []).filter(isNonEmptyString).map((name) => ({ name })),
		socialLinks: (generalInfo.social_media ?? [])
			.filter((link) => isNonEmptyString(link.platform) && isNonEmptyString(link.acct_url))
			.map((link) => ({
				platform: link.platform ?? '',
				url: link.acct_url ?? '',
				userName: link.user_name,
			})),
		specialty: generalInfo.specialty,
		stats: [
			{ label: 'Projects completed', value: generalInfo.projects_completed ?? '5' },
			{ label: 'Years of experience', value: generalInfo.experience_years ?? '3' },
			{ label: 'Professional awards', value: generalInfo.award_count ?? '0' },
			{ label: 'Satisfied clients', value: generalInfo.client_count ?? '0' },
		],
		tools: (generalInfo.tools ?? []).filter(isNonEmptyString).map((name) => ({ name })),
	}
}

function normalizeProject(project: LegacyProject, index: number): NormalizedProject {
	const title = isNonEmptyString(project.projectName)
		? project.projectName.trim()
		: `Project ${index + 1}`
	const screenshots = normalizeProjectScreenshots(project, title)
	const videoUrl = Object.values(project.videos ?? {}).find(isNonEmptyString)
	const videoMetadata = videoUrl ? getMediaMetadata(videoUrl) : null

	return {
		_status: 'published',
		cmsPlatforms: (project.cms ?? []).filter(isNonEmptyString).map((platform) => ({ platform })),
		externalUrl: project.url,
		featured: index < 4,
		frameworks: (project.frameworks ?? [])
			.map((item) => item.framework)
			.filter(isNonEmptyString)
			.map((framework) => ({ framework })),
		legacyProjectId: getLegacyProjectId(project.projectId),
		languages: (project.languages ?? [])
			.map((item) => item.lang)
			.filter(isNonEmptyString)
			.map((language) => ({ language })),
		responsibilities: Object.values(project.responsibilities ?? {})
			.filter(isResponsibility)
			.filter((responsibility) => isNonEmptyString(responsibility.title))
			.map((responsibility) => ({
				copy: responsibility.copy ?? undefined,
				title: responsibility.title ?? '',
			})),
		screenshots,
		slug: formatSlug(title),
		sortOrder: getProjectSortOrder(project.projectId, index),
		summary: project.workDone ?? '',
		title,
		video: videoUrl && videoMetadata
			? {
					caption: `${title} project walkthrough`,
					contentType: videoMetadata.contentType,
					fileName: videoMetadata.fileName,
					storagePath: videoMetadata.storagePath,
					url: videoUrl,
				}
			: undefined,
	}
}

function getLegacyProjectId(projectId: unknown): string | undefined {
	return typeof projectId === 'string' && projectId.trim().length > 0
		? projectId.trim()
		: undefined
}

function getProjectSortOrder(projectId: unknown, fallbackSortOrder: number): number {
	if (typeof projectId !== 'string') {
		return fallbackSortOrder
	}

	const normalizedProjectId = projectId.trim()

	if (!/^\d+$/.test(normalizedProjectId)) {
		return fallbackSortOrder
	}

	const sortOrder = Number(normalizedProjectId) - 1

	return Number.isSafeInteger(sortOrder) && sortOrder >= 0 ? sortOrder : fallbackSortOrder
}

function normalizeProjectScreenshots(project: LegacyProject, title: string): NormalizedProject['screenshots'] {
	const screenshots: NonNullable<NormalizedProject['screenshots']> = []
	const orientations = ['landscape', 'portrait'] as const

	for (const orientation of orientations) {
		const orientationScreenshots = project.screenshots?.[orientation] ?? {}

		Object.values(orientationScreenshots)
			.filter(isNonEmptyString)
			.forEach((url, orientationIndex) => {
				const metadata = getMediaMetadata(url)

				screenshots.push({
					alt: `${title} ${orientation} screenshot ${orientationIndex + 1}`,
					contentType: metadata.contentType,
					fileName: metadata.fileName,
					order: screenshots.length,
					orientation,
					storagePath: metadata.storagePath,
					url,
				})
			})
	}

	return screenshots
}

function normalizeEmploymentRecord(
	employmentRecord: LegacyEmploymentRecord,
	index: number,
): NormalizedEmploymentHistory {
	return {
		_status: 'published',
		company: employmentRecord.company ?? `Employer ${index + 1}`,
		durationLabel: employmentRecord.total_time,
		endDate: parseMonthDate(employmentRecord.date_ended),
		role: employmentRecord.position ?? 'Role',
		sortOrder: index,
		startDate: parseMonthDate(employmentRecord.date_stared) ?? new Date(Date.UTC(2020, 0, 1)).toISOString(),
		summary: stripMarkup(employmentRecord.summary ?? ''),
	}
}

function normalizeEducationRecords(
	educationRecords: readonly LegacyEducationRecord[],
	type: NormalizedEducationHistory['type'],
	sortOffset: number,
): NormalizedEducationHistory[] {
	return educationRecords.map((educationRecord, index) => {
		const completionDate = parseMonthDate(educationRecord.grad_date)

		return {
			_status: 'published',
			completionDate,
			completionLabel: completionDate ? undefined : educationRecord.grad_date || undefined,
			field: educationRecord.field_of_study ?? 'Program',
			institution: educationRecord.school ?? `Institution ${index + 1}`,
			location: educationRecord.school_location,
			sortOrder: sortOffset + index,
			type,
		}
	})
}

function normalizeServices(services: unknown): NormalizedSiteSettings['services'] {
	if (!Array.isArray(services)) {
		return []
	}

	return services
		.map((service) => {
			if (isNonEmptyString(service)) {
				return { title: service }
			}

			if (!isRecord(service)) {
				return undefined
			}

			const title = getString(service.title) ?? getString(service.name)

			if (!title) {
				return undefined
			}

			return {
				summary: getString(service.summary),
				title,
			}
		})
		.filter(isDefined)
}

function parseMonthDate(value: string | undefined): string | undefined {
	if (!value || value === 'N/A') {
		return undefined
	}

	const [monthName, yearValue] = value.replace(',', '').split(/\s+/)
	const monthIndex = MONTHS_BY_NAME[monthName.toLowerCase()]
	const year = Number(yearValue)

	if (monthIndex === undefined || !Number.isInteger(year)) {
		return undefined
	}

	return new Date(Date.UTC(year, monthIndex, 1)).toISOString()
}

function getMediaMetadata(url: string): {
	contentType: string | undefined
	fileName: string | undefined
	storagePath: string | undefined
} {
	const storagePath = getFirebaseStoragePath(url)
	const fileName = storagePath?.split('/').pop()

	return {
		contentType: fileName ? getContentType(fileName) : undefined,
		fileName,
		storagePath,
	}
}

function getFirebaseStoragePath(url: string): string | undefined {
	try {
		const parsedUrl = new URL(url)
		const encodedPath = parsedUrl.pathname.split('/o/')[1]

		return encodedPath ? decodeURIComponent(encodedPath) : undefined
	} catch {
		return undefined
	}
}

function getContentType(fileName: string): string | undefined {
	const extension = fileName.split('.').pop()?.toLowerCase()

	switch (extension) {
		case 'jpg':
		case 'jpeg':
			return 'image/jpeg'
		case 'png':
			return 'image/png'
		case 'mp4':
			return 'video/mp4'
		case 'mov':
			return 'video/quicktime'
		default:
			return undefined
	}
}

function stripMarkup(value: string): string {
	return value
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/?span>/gi, '')
		.replace(/\s+\n/g, '\n')
		.trim()
}

function isLegacyProject(value: Record<string, unknown>): value is LegacyProject {
	return (
		typeof value.projectName === 'string' ||
		isNonEmptyString(value.projectId) ||
		isNonEmptyString(value.workDone) ||
		isNonEmptyString(value.url) ||
		Array.isArray(value.cms) ||
		Array.isArray(value.frameworks) ||
		Array.isArray(value.languages) ||
		isRecord(value.responsibilities) ||
		isRecord(value.screenshots) ||
		isRecord(value.videos)
	)
}

function isLegacyGeneralInfo(value: Record<string, unknown>): value is LegacyGeneralInfo {
	return isNonEmptyString(value.name) || isNonEmptyString(value.email_addy)
}

function isResponsibility(value: LegacyResponsibility | null | undefined): value is LegacyResponsibility {
	return Boolean(value)
}

function isHttpUrl(value: string): boolean {
	try {
		const parsedUrl = new URL(value)

		return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
	} catch {
		return false
	}
}

function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getString(value: unknown): string | undefined {
	return isNonEmptyString(value) ? value : undefined
}

function isDefined<TValue>(value: TValue | undefined): value is TValue {
	return value !== undefined
}
