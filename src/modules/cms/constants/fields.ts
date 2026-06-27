// Types
import type { Field } from 'payload'

type TagArrayOptions = {
	fieldName?: string
	label: string
	name: string
	singularLabel: string
}

export const sortOrderField = {
	name: 'sortOrder',
	type: 'number',
	admin: {
		description: 'Lower numbers appear first on the public site.',
		position: 'sidebar',
		step: 1,
	},
	defaultValue: 0,
	index: true,
	min: 0,
	required: true,
} satisfies Field

export function createTagArrayField({
	fieldName = 'name',
	label,
	name,
	singularLabel,
}: TagArrayOptions): Field {
	return {
		name,
		type: 'array',
		admin: {
			initCollapsed: true,
		},
		fields: [
			{
				name: fieldName,
				type: 'text',
				label: singularLabel,
				required: true,
			},
		],
		label,
		labels: {
			plural: label,
			singular: singularLabel,
		},
	}
}
