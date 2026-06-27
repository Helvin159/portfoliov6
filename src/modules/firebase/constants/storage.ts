// Types
import {
	firebaseMediaAssetTypes,
	firebaseScreenshotOrientations,
	type FirebaseMediaAssetType,
	type FirebaseScreenshotOrientation,
	type FirebaseUploadTokenRequest,
} from '../types/upload'

export const FIREBASE_ADMIN_CLAIM = 'payloadAdmin'
export const FIREBASE_ALLOWED_PATH_PREFIX_CLAIM = 'allowedPathPrefix'
export const FIREBASE_UPLOAD_TOKEN_EXPIRES_IN_SECONDS = 60 * 60

export const FIREBASE_STORAGE_MAX_BYTES = {
	poster: 20 * 1024 * 1024,
	screenshot: 20 * 1024 * 1024,
	video: 250 * 1024 * 1024,
} satisfies Record<FirebaseMediaAssetType, number>

export const FIREBASE_UPLOAD_CONTENT_TYPE_PREFIXES = {
	poster: 'image/',
	screenshot: 'image/',
	video: 'video/',
} satisfies Record<FirebaseMediaAssetType, string>

export function isFirebaseMediaAssetType(value: unknown): value is FirebaseMediaAssetType {
	return typeof value === 'string' && firebaseMediaAssetTypes.includes(value as FirebaseMediaAssetType)
}

export function isFirebaseScreenshotOrientation(
	value: unknown,
): value is FirebaseScreenshotOrientation {
	return (
		typeof value === 'string' &&
		firebaseScreenshotOrientations.includes(value as FirebaseScreenshotOrientation)
	)
}

export function createFirebaseUploadPathPrefix(request: FirebaseUploadTokenRequest): string {
	if (request.assetType === 'screenshot') {
		return `projects/${request.projectSlug}/screenshots/${request.orientation}/`
	}

	if (request.assetType === 'poster') {
		return `projects/${request.projectSlug}/posters/`
	}

	return `projects/${request.projectSlug}/videos/`
}
