// Types
import type {
	EducationHistory,
	EmploymentHistory,
	Project,
	SiteSetting,
} from '../../../../payload-types'

export type LegacyGeneralInfo = {
	award_count?: string
	client_count?: string
	cms?: readonly string[]
	email_addy?: string
	experience_years?: string
	headline_one?: string
	name?: string
	position?: string
	projects_completed?: string
	services?: unknown
	short_about_me?: string
	short_about_me_two?: string
	short_description?: string
	short_description_two?: string
	skills?: readonly string[]
	social_media?: readonly LegacySocialLink[]
	specialty?: string
	tools?: readonly string[]
}

export type LegacySocialLink = {
	acct_url?: string
	platform?: string
	user_name?: string
}

export type LegacyEducationRecord = {
	field_of_study?: string
	grad_date?: string
	school?: string
	school_location?: string
}

export type LegacyEmploymentRecord = {
	company?: string
	date_ended?: string
	date_stared?: string
	position?: string
	summary?: string
	total_time?: string
}

export type LegacyProject = {
	cms?: readonly string[]
	frameworks?: readonly { framework?: string }[]
	languages?: readonly { lang?: string }[]
	projectId?: string
	projectName?: string
	responsibilities?: Record<string, LegacyResponsibility | null | undefined>
	screenshots?: LegacyProjectScreenshots
	url?: string
	videos?: Record<string, string | null | undefined>
	workDone?: string
}

export type LegacyProjectScreenshots = {
	landscape?: Record<string, string | null | undefined>
	portrait?: Record<string, string | null | undefined>
}

export type LegacyResponsibility = {
	copy?: string | null
	title?: string | null
}

export type FirestoreExportDocument = {
	data: Record<string, unknown>
	id: string
}

export type FirestoreContentExport = {
	collections?: {
		portfolioDetails?: readonly FirestoreExportDocument[]
		projects?: readonly FirestoreExportDocument[]
	}
	exportedAt?: string
}

export type NormalizedProject = Omit<Project, 'createdAt' | 'id' | 'updatedAt'>
export type NormalizedEmploymentHistory = Omit<EmploymentHistory, 'createdAt' | 'id' | 'updatedAt'>
export type NormalizedEducationHistory = Omit<EducationHistory, 'createdAt' | 'id' | 'updatedAt'>
export type NormalizedSiteSettings = Omit<SiteSetting, 'createdAt' | 'id' | 'updatedAt'>

export type NormalizedMigrationData = {
	educationHistory: NormalizedEducationHistory[]
	employmentHistory: NormalizedEmploymentHistory[]
	projects: NormalizedProject[]
	siteSettings: NormalizedSiteSettings
	source: 'firestore-export' | 'local-js'
}

export type MigrationValidationResult = {
	errors: string[]
	warnings: string[]
}
