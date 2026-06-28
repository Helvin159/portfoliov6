// Types
import type { TextFieldSingleValidation } from 'payload'

export const validateHttpUrl: TextFieldSingleValidation = (value) => {
	if (!value) {
		return true
	}

	try {
		const parsedUrl = new URL(value)

		if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
			return true
		}
	} catch {
		return 'Enter a valid HTTP or HTTPS URL.'
	}

	return 'Enter a valid HTTP or HTTPS URL.'
}

export function validateOptionalContentTypePrefix(prefix: string): TextFieldSingleValidation {
	return (value) => {
		if (!value || value.startsWith(prefix)) {
			return true
		}

		return `Content type must start with ${prefix}.`
	}
}
