// Constants
import { authenticatedWriteCollectionAccess } from '../constants/access'
import { createTagArrayField, sortOrderField } from '../constants/fields'
import { projectScreenshotFields, projectVideoFields } from '../constants/mediaFields'
import { populateSlugFromTitle } from '../constants/slug'
import { validateHttpUrl } from '../constants/validation'

// Types
import type { ArrayFieldValidation, CollectionConfig } from 'payload'

type DocumentStatusSource = {
	_status?: unknown
}

type ProjectScreenshotValue = {
	orientation?: unknown
}

const validatePublishedProjectScreenshots: ArrayFieldValidation = (value, { data, siblingData }) => {
	const isPublished = [siblingData, data].some((source) => {
		if (typeof source !== 'object' || source === null || Array.isArray(source)) {
			return false
		}

		return (source as DocumentStatusSource)._status === 'published'
	})

	if (!isPublished) {
		return true
	}

	const hasLandscapeScreenshot =
		Array.isArray(value) &&
		value.some((screenshot) => {
			if (typeof screenshot !== 'object' || screenshot === null || Array.isArray(screenshot)) {
				return false
			}

			return (screenshot as ProjectScreenshotValue).orientation === 'landscape'
		})

	if (hasLandscapeScreenshot) {
		return true
	}

	return 'Published projects require at least one landscape screenshot.'
}

export const Projects: CollectionConfig = {
	slug: 'projects',
	access: authenticatedWriteCollectionAccess,
	admin: {
		defaultColumns: ['title', 'featured', 'sortOrder', 'updatedAt'],
		group: 'Portfolio Content',
		useAsTitle: 'title',
	},
	defaultSort: 'sortOrder',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'slug',
			type: 'text',
			admin: {
				description: 'Generated from the project title unless edited manually.',
				position: 'sidebar',
			},
			hooks: {
				beforeValidate: [populateSlugFromTitle],
			},
			index: true,
			required: true,
			unique: true,
		},
		{
			name: 'legacyProjectId',
			type: 'text',
			admin: {
				description: 'Preserves legacy /featured/:projectId URLs during the Payload migration.',
				position: 'sidebar',
				readOnly: true,
			},
			index: true,
		},
		{
			name: 'featured',
			type: 'checkbox',
			admin: {
				position: 'sidebar',
			},
			defaultValue: false,
			index: true,
		},
		sortOrderField,
		{
			name: 'summary',
			type: 'textarea',
			admin: {
				rows: 5,
			},
			required: true,
		},
		{
			name: 'responsibilities',
			type: 'array',
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'copy',
					type: 'textarea',
					admin: {
						rows: 3,
					},
				},
			],
			labels: {
				plural: 'Responsibilities',
				singular: 'Responsibility',
			},
		},
		createTagArrayField({
			fieldName: 'language',
			label: 'Languages',
			name: 'languages',
			singularLabel: 'Language',
		}),
		createTagArrayField({
			fieldName: 'framework',
			label: 'Frameworks',
			name: 'frameworks',
			singularLabel: 'Framework',
		}),
		createTagArrayField({
			fieldName: 'platform',
			label: 'CMS / Platforms',
			name: 'cmsPlatforms',
			singularLabel: 'CMS / Platform',
		}),
		{
			name: 'externalUrl',
			type: 'text',
			label: 'External URL',
			validate: validateHttpUrl,
		},
		{
			name: 'projectMediaAdmin',
			type: 'ui',
			admin: {
				components: {
					Field: '@/modules/cms/components/ProjectMediaAdminField#ProjectMediaAdminField',
				},
			},
		},
		{
			name: 'screenshots',
			type: 'array',
			admin: {
				initCollapsed: true,
			},
			fields: projectScreenshotFields,
			labels: {
				plural: 'Screenshots',
				singular: 'Screenshot',
			},
			validate: validatePublishedProjectScreenshots,
		},
		{
			name: 'video',
			type: 'group',
			fields: projectVideoFields,
		},
	],
	timestamps: true,
	versions: {
		drafts: true,
	},
}
