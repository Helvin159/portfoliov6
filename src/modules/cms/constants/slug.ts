// Types
import type { FieldHook } from 'payload'

export function formatSlug(value: string): string {
	return value
		.normalize('NFKD')
		.toLowerCase()
		.trim()
		.replace(/['"]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

export const populateSlugFromTitle: FieldHook = ({ siblingData, value }) => {
	if (typeof value === 'string' && value.trim().length > 0) {
		return formatSlug(value)
	}

	const title = siblingData.title

	if (typeof title === 'string') {
		return formatSlug(title)
	}

	return value
}
