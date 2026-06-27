// Actions
import { deleteApp, type FirebaseApp } from 'firebase/app'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
	type UploadMetadata,
	type UploadTask,
} from 'firebase/storage'
import { createFirebaseClientUploadApp } from './client'

// Constants
import {
	FIREBASE_STORAGE_MAX_BYTES,
	FIREBASE_UPLOAD_CONTENT_TYPE_PREFIXES,
} from '../constants/storage'

// Types
import type {
	FirebaseMediaAssetType,
	FirebaseUploadedMediaMetadata,
	FirebaseUploadProgress,
	FirebaseUploadTokenResponse,
} from '../types/upload'

type UploadProjectMediaArgs = {
	assetType: FirebaseMediaAssetType
	file: File
	onProgress?: (progress: FirebaseUploadProgress) => void
	token: FirebaseUploadTokenResponse
}

type UploadProjectMediaController = {
	cancel: () => boolean
	completed: Promise<FirebaseUploadedMediaMetadata>
	storagePath: string
	task: UploadTask
}

export async function uploadFirebaseProjectMedia({
	assetType,
	file,
	onProgress,
	token,
}: UploadProjectMediaArgs): Promise<UploadProjectMediaController> {
	validateFirebaseProjectMediaFile({ assetType, file })

	const uploadId = createFirebaseStorageUploadId()
	const app = createFirebaseClientUploadApp(`project-media-upload-${uploadId}`)

	try {
		const auth = getAuth(app)

		await signInWithCustomToken(auth, token.customToken)

		const storagePath = `${token.allowedPathPrefix}${createFirebaseStorageUploadFileName({
			fileName: file.name,
			uploadId,
		})}`
		const uploadRef = ref(getStorage(app, `gs://${token.storageBucket}`), storagePath)
		const metadata: UploadMetadata = {
			contentType: file.type,
			customMetadata: {
				allowedPathPrefix: token.allowedPathPrefix,
				originalFileName: file.name,
				payloadUploadUid: token.uid,
			},
		}
		const task = uploadBytesResumable(uploadRef, file, metadata)

		return {
			cancel: () => task.cancel(),
			completed: createUploadCompletionPromise({
				file,
				onProgress,
				storagePath,
				task,
			}).finally(() => cleanupFirebaseUploadApp(app)),
			storagePath,
			task,
		}
	} catch (error) {
		await cleanupFirebaseUploadApp(app)
		throw error
	}
}

export function validateFirebaseProjectMediaFile({
	assetType,
	file,
}: {
	assetType: FirebaseMediaAssetType
	file: File
}): void {
	const contentTypePrefix = FIREBASE_UPLOAD_CONTENT_TYPE_PREFIXES[assetType]
	const maxSize = FIREBASE_STORAGE_MAX_BYTES[assetType]

	if (!file.type.startsWith(contentTypePrefix)) {
		throw new Error(`File type must start with ${contentTypePrefix}.`)
	}

	if (file.size > maxSize) {
		throw new Error(`File size must be ${maxSize} bytes or less.`)
	}
}

function createUploadCompletionPromise({
	file,
	onProgress,
	storagePath,
	task,
}: {
	file: File
	onProgress?: (progress: FirebaseUploadProgress) => void
	storagePath: string
	task: UploadTask
}): Promise<FirebaseUploadedMediaMetadata> {
	return new Promise((resolve, reject) => {
		task.on(
			'state_changed',
			(snapshot) => {
				onProgress?.({
					bytesTransferred: snapshot.bytesTransferred,
					percent:
						snapshot.totalBytes > 0
							? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
							: 0,
					state: snapshot.state,
					totalBytes: snapshot.totalBytes,
				})
			},
			(error) => reject(error),
			() => {
				void getDownloadURL(task.snapshot.ref)
					.then((url) => {
						onProgress?.({
							bytesTransferred: task.snapshot.totalBytes,
							percent: 100,
							state: 'success',
							totalBytes: task.snapshot.totalBytes,
						})

						resolve({
							contentType: file.type,
							fileName: file.name,
							size: file.size,
							storagePath,
							url,
						})
					})
					.catch((error: unknown) => reject(error))
			},
		)
	})
}

export function sanitizeFirebaseStorageFileName(fileName: string): string {
	const sanitizedName = fileName
		.trim()
		.replace(/[/\\]/g, '-')
		.replace(/[^a-zA-Z0-9._-]+/g, '-')
		.replace(/^-+|-+$/g, '')

	return sanitizedName.length > 0 ? sanitizedName : `upload-${Date.now()}`
}

export function createFirebaseStorageUploadFileName({
	fileName,
	uploadId,
}: {
	fileName: string
	uploadId?: string
}): string {
	return `${uploadId ?? createFirebaseStorageUploadId()}-${sanitizeFirebaseStorageFileName(fileName)}`
}

function createFirebaseStorageUploadId(): string {
	return typeof globalThis.crypto?.randomUUID === 'function'
		? globalThis.crypto.randomUUID()
		: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

async function cleanupFirebaseUploadApp(app: FirebaseApp): Promise<void> {
	try {
		await deleteApp(app)
	} catch (error) {
		console.error('Unable to clean up Firebase upload app.', error)
	}
}
