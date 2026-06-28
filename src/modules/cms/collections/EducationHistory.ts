// Constants
import { authenticatedWriteCollectionAccess } from '../constants/access'
import { sortOrderField } from '../constants/fields'

// Types
import type { CollectionConfig } from 'payload'

export const EducationHistory: CollectionConfig = {
	slug: 'educationHistory',
	access: authenticatedWriteCollectionAccess,
	admin: {
		defaultColumns: ['institution', 'field', 'type', 'sortOrder'],
		group: 'Portfolio Content',
		useAsTitle: 'institution',
	},
	defaultSort: 'sortOrder',
	fields: [
		{
			name: 'institution',
			type: 'text',
			required: true,
		},
		{
			name: 'location',
			type: 'text',
		},
		{
			name: 'field',
			type: 'text',
			required: true,
		},
		{
			name: 'type',
			type: 'select',
			defaultValue: 'education',
			options: [
				{ label: 'Education', value: 'education' },
				{ label: 'Continuing Education', value: 'continuingEducation' },
				{ label: 'Certification', value: 'certification' },
			],
			required: true,
		},
		{
			name: 'completionDate',
			type: 'date',
			admin: {
				date: {
					displayFormat: 'MMMM yyyy',
					pickerAppearance: 'monthOnly',
				},
			},
		},
		{
			name: 'completionLabel',
			type: 'text',
			admin: {
				description: 'Optional display value for non-date completions like "In Progress".',
			},
		},
		sortOrderField,
	],
	timestamps: true,
	versions: {
		drafts: true,
	},
}
