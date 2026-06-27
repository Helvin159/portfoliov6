// Constants
import { authenticatedWriteCollectionAccess } from '../constants/access'
import { sortOrderField } from '../constants/fields'

// Types
import type { CollectionConfig } from 'payload'

export const EmploymentHistory: CollectionConfig = {
	slug: 'employmentHistory',
	access: authenticatedWriteCollectionAccess,
	admin: {
		defaultColumns: ['company', 'role', 'startDate', 'endDate', 'sortOrder'],
		group: 'Portfolio Content',
		useAsTitle: 'company',
	},
	defaultSort: 'sortOrder',
	fields: [
		{
			name: 'company',
			type: 'text',
			required: true,
		},
		{
			name: 'role',
			type: 'text',
			required: true,
		},
		{
			name: 'summary',
			type: 'textarea',
			admin: {
				rows: 5,
			},
			required: true,
		},
		{
			name: 'startDate',
			type: 'date',
			admin: {
				date: {
					displayFormat: 'MMMM yyyy',
					pickerAppearance: 'monthOnly',
				},
			},
			required: true,
		},
		{
			name: 'endDate',
			type: 'date',
			admin: {
				date: {
					displayFormat: 'MMMM yyyy',
					pickerAppearance: 'monthOnly',
				},
			},
		},
		{
			name: 'durationLabel',
			type: 'text',
			admin: {
				description: 'Optional human-readable duration, preserved from legacy content when needed.',
			},
		},
		sortOrderField,
	],
	timestamps: true,
	versions: {
		drafts: true,
	},
}
