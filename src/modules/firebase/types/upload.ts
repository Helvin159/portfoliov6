export const firebaseMediaAssetTypes = ['screenshot', 'video', 'poster'] as const
export const firebaseScreenshotOrientations = ['landscape', 'portrait'] as const

export type FirebaseMediaAssetType = (typeof firebaseMediaAssetTypes)[number]
export type FirebaseScreenshotOrientation = (typeof firebaseScreenshotOrientations)[number]

export type FirebaseUploadTokenRequest = {
	assetType: FirebaseMediaAssetType
	orientation?: FirebaseScreenshotOrientation
	projectSlug: string
}

export type FirebaseUploadTokenResponse = {
	allowedPathPrefix: string
	customToken: string
	expiresInSeconds: number
	storageBucket: string
	uid: string
}

export type FirebaseUploadProgress = {
	bytesTransferred: number
	percent: number
	state: 'canceled' | 'error' | 'paused' | 'running' | 'success'
	totalBytes: number
}

export type FirebaseUploadedMediaMetadata = {
	contentType: string
	fileName: string
	size: number
	storagePath: string
	url: string
}
