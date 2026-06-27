// Utils
import assert from 'node:assert/strict'
import test from 'node:test'

// Actions
import {
	createFirebaseStorageUploadFileName,
	sanitizeFirebaseStorageFileName,
	validateFirebaseProjectMediaFile,
} from '@/modules/firebase/actions/uploadProjectMedia'

// Constants
import {
	createFirebaseUploadPathPrefix,
	FIREBASE_STORAGE_MAX_BYTES,
	isFirebaseMediaAssetType,
	isFirebaseScreenshotOrientation,
} from '@/modules/firebase/constants/storage'

// Types
import type { FirebaseMediaAssetType } from '@/modules/firebase/types/upload'

function createFileFixture({
	name = 'portfolio-upload.png',
	size = 1024,
	type = 'image/png',
}: {
	name?: string
	size?: number
	type?: string
} = {}): File {
	return { name, size, type } as File
}

test('Firebase upload path prefixes are scoped to the requested project and asset type', () => {
	assert.equal(
		createFirebaseUploadPathPrefix({
			assetType: 'screenshot',
			orientation: 'landscape',
			projectSlug: 'demo-project',
		}),
		'projects/demo-project/screenshots/landscape/',
	)
	assert.equal(
		createFirebaseUploadPathPrefix({
			assetType: 'poster',
			projectSlug: 'demo-project',
		}),
		'projects/demo-project/posters/',
	)
	assert.equal(
		createFirebaseUploadPathPrefix({
			assetType: 'video',
			projectSlug: 'demo-project',
		}),
		'projects/demo-project/videos/',
	)
})

test('Firebase upload request guards accept only known media values', () => {
	assert.equal(isFirebaseMediaAssetType('screenshot'), true)
	assert.equal(isFirebaseMediaAssetType('video'), true)
	assert.equal(isFirebaseMediaAssetType('poster'), true)
	assert.equal(isFirebaseMediaAssetType('document'), false)

	assert.equal(isFirebaseScreenshotOrientation('landscape'), true)
	assert.equal(isFirebaseScreenshotOrientation('portrait'), true)
	assert.equal(isFirebaseScreenshotOrientation('square'), false)
})

test('Firebase media validation accepts matching content types within size limits', () => {
	const validFiles: Array<{ assetType: FirebaseMediaAssetType; file: File }> = [
		{
			assetType: 'poster',
			file: createFileFixture({
				size: FIREBASE_STORAGE_MAX_BYTES.poster,
				type: 'image/jpeg',
			}),
		},
		{
			assetType: 'screenshot',
			file: createFileFixture({
				size: FIREBASE_STORAGE_MAX_BYTES.screenshot,
				type: 'image/png',
			}),
		},
		{
			assetType: 'video',
			file: createFileFixture({
				name: 'walkthrough.mp4',
				size: FIREBASE_STORAGE_MAX_BYTES.video,
				type: 'video/mp4',
			}),
		},
	]

	for (const { assetType, file } of validFiles) {
		assert.doesNotThrow(() => validateFirebaseProjectMediaFile({ assetType, file }))
	}
})

test('Firebase media validation rejects mismatched content types and oversized files', () => {
	assert.throws(
		() =>
			validateFirebaseProjectMediaFile({
				assetType: 'screenshot',
				file: createFileFixture({ type: 'video/mp4' }),
			}),
		/File type must start with image\/\./,
	)
	assert.throws(
		() =>
			validateFirebaseProjectMediaFile({
				assetType: 'video',
				file: createFileFixture({
					name: 'too-large.mp4',
					size: FIREBASE_STORAGE_MAX_BYTES.video + 1,
					type: 'video/mp4',
				}),
			}),
		/File size must be 262144000 bytes or less\./,
	)
})

test('Firebase storage filenames are sanitized before joining with the allowed prefix', () => {
	assert.equal(sanitizeFirebaseStorageFileName(' Project Shot 01.png '), 'Project-Shot-01.png')
	assert.equal(sanitizeFirebaseStorageFileName('nested/path\\clip.mov'), 'nested-path-clip.mov')
	assert.match(sanitizeFirebaseStorageFileName(' / '), /^upload-\d+$/)
})

test('Firebase storage upload filenames include a unique upload id', () => {
	assert.equal(
		createFirebaseStorageUploadFileName({
			fileName: ' Project Shot 01.png ',
			uploadId: 'upload-123',
		}),
		'upload-123-Project-Shot-01.png',
	)
	assert.notEqual(
		createFirebaseStorageUploadFileName({ fileName: 'home.png' }),
		createFirebaseStorageUploadFileName({ fileName: 'home.png' }),
	)
})
