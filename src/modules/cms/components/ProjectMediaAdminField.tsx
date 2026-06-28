'use client'

// React
import { useCallback, useMemo, useRef, useState, type ChangeEvent } from 'react'

// Actions
import { uploadFirebaseProjectMedia } from '@/modules/firebase/actions/uploadProjectMedia'

// Utils
import { useForm, useFormFields } from '@payloadcms/ui'

// Types
import type {
	FirebaseMediaAssetType,
	FirebaseScreenshotOrientation,
	FirebaseUploadedMediaMetadata,
	FirebaseUploadProgress,
	FirebaseUploadTokenResponse,
} from '@/modules/firebase/types/upload'

// Styles
import styles from './ProjectMediaAdminField.module.css'

type ProjectScreenshotFormValue = {
	alt: string
	caption?: string
	contentType?: string
	fileName?: string
	height?: number
	id?: string
	order: number
	orientation: FirebaseScreenshotOrientation
	size?: number
	storagePath?: string
	url: string
	width?: number
}

type ProjectVideoFormValue = {
	caption?: string
	contentType?: string
	fileName?: string
	posterUrl?: string
	size?: number
	storagePath?: string
	url?: string
}

type UploadKey = 'poster' | 'screenshot' | 'video'

type UploadState = {
	canCancel: boolean
	file?: File
	message: string
	orientation?: FirebaseScreenshotOrientation
	percent: number
	status: 'canceled' | 'error' | 'idle' | 'success' | 'uploading'
}

type UploadTokenErrorResponse = {
	message?: string
}

type FormFieldState<TValue> = {
	value?: TValue
}

const initialUploadState: UploadState = {
	canCancel: false,
	message: '',
	percent: 0,
	status: 'idle',
}

const videoContentTypesByExtension: Partial<Record<string, string>> = {
	m4v: 'video/mp4',
	mov: 'video/quicktime',
	mp4: 'video/mp4',
	ogg: 'video/ogg',
	ogv: 'video/ogg',
	qt: 'video/quicktime',
	webm: 'video/webm',
}

export function ProjectMediaAdminField() {
	const titleField = useFormFields(
		([fields]) => fields?.title as FormFieldState<string> | undefined,
	)
	const slugField = useFormFields(([fields]) => fields?.slug as FormFieldState<string> | undefined)
	const screenshotsField = useFormFields(
		([fields]) =>
			fields?.screenshots as FormFieldState<ProjectScreenshotFormValue[] | undefined> | undefined,
	)
	const videoField = useFormFields(
		([fields]) => fields?.video as FormFieldState<ProjectVideoFormValue | undefined> | undefined,
	)
	const dispatchField = useFormFields(([, dispatch]) => dispatch)
	const { setModified } = useForm()

	const cancelUploadsRef = useRef<Partial<Record<UploadKey, () => boolean>>>({})
	const [uploadStates, setUploadStates] = useState<Record<UploadKey, UploadState>>({
		poster: initialUploadState,
		screenshot: initialUploadState,
		video: initialUploadState,
	})
	const [legacyScreenshot, setLegacyScreenshot] = useState({
		alt: '',
		caption: '',
		orientation: 'landscape' as FirebaseScreenshotOrientation,
		url: '',
	})
	const [legacyVideoUrl, setLegacyVideoUrl] = useState('')
	const [legacyPosterUrl, setLegacyPosterUrl] = useState('')

	const screenshots = useMemo(
		() => (Array.isArray(screenshotsField?.value) ? screenshotsField.value : []),
		[screenshotsField?.value],
	)
	const video = useMemo(() => videoField?.value ?? {}, [videoField?.value])
	const screenshotsRef = useRef<ProjectScreenshotFormValue[]>(screenshots)
	const videoRef = useRef<ProjectVideoFormValue>(video)
	const projectSlug = typeof slugField?.value === 'string' ? slugField.value.trim() : ''
	const projectTitle = typeof titleField?.value === 'string' ? titleField.value.trim() : ''
	const canUpload = projectSlug.length > 0

	screenshotsRef.current = screenshots
	videoRef.current = video

	const setScreenshotsValue = useCallback(
		(nextScreenshots: ProjectScreenshotFormValue[]) => {
			dispatchField({
				path: 'screenshots',
				type: 'UPDATE',
				value: nextScreenshots,
			})
			setModified(true)
		},
		[dispatchField, setModified],
	)

	const setVideoValue = useCallback(
		(nextVideo: ProjectVideoFormValue) => {
			dispatchField({
				path: 'video',
				type: 'UPDATE',
				value: nextVideo,
			})
			setModified(true)
		},
		[dispatchField, setModified],
	)

	const updateUploadState = useCallback((key: UploadKey, nextState: Partial<UploadState>) => {
		setUploadStates((currentStates) => ({
			...currentStates,
			[key]: {
				...currentStates[key],
				...nextState,
			},
		}))
	}, [])

	const requestUploadToken = useCallback(
		async ({
			assetType,
			orientation,
		}: {
			assetType: FirebaseMediaAssetType
			orientation?: FirebaseScreenshotOrientation
		}) => {
			if (!canUpload) {
				throw new Error('Save or enter a valid project slug before uploading media.')
			}

			const response = await fetch('/api/firebase/upload-token', {
				body: JSON.stringify({
					assetType,
					orientation,
					projectSlug,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			})

			if (!response.ok) {
				const body = (await response.json().catch(() => null)) as UploadTokenErrorResponse | null

				throw new Error(body?.message ?? 'Unable to create a Firebase upload token.')
			}

			return (await response.json()) as FirebaseUploadTokenResponse
		},
		[canUpload, projectSlug],
	)

	const uploadMedia = useCallback(
		async ({
			assetType,
			file,
			key,
			onComplete,
			orientation,
		}: {
			assetType: FirebaseMediaAssetType
			file: File
			key: UploadKey
			onComplete: (metadata: FirebaseUploadedMediaMetadata) => Promise<void> | void
			orientation?: FirebaseScreenshotOrientation
		}) => {
			updateUploadState(key, {
				canCancel: false,
				file,
				message: 'Preparing upload...',
				orientation,
				percent: 0,
				status: 'uploading',
			})

			try {
				const token = await requestUploadToken({ assetType, orientation })
				const controller = await uploadFirebaseProjectMedia({
					assetType,
					file,
					onProgress: (progress: FirebaseUploadProgress) => {
						updateUploadState(key, {
							message: formatUploadProgress(progress),
							percent: progress.percent,
							status: progress.state === 'success' ? 'success' : 'uploading',
						})
					},
					token,
				})

				cancelUploadsRef.current[key] = controller.cancel
				updateUploadState(key, { canCancel: true })

				const metadata = await controller.completed
				delete cancelUploadsRef.current[key]
				await onComplete(metadata)
				updateUploadState(key, {
					canCancel: false,
					message: 'Upload complete. Save the project to persist these media changes.',
					percent: 100,
					status: 'success',
				})
			} catch (error) {
				delete cancelUploadsRef.current[key]
				const message = getErrorMessage(error)
				const wasCanceled = message.toLowerCase().includes('cancel')

				updateUploadState(key, {
					canCancel: false,
					message,
					percent: 0,
					status: wasCanceled ? 'canceled' : 'error',
				})
			}
		},
		[requestUploadToken, updateUploadState],
	)

	const uploadScreenshot = useCallback(
		async (file: File, orientation: FirebaseScreenshotOrientation) => {
			const dimensions = await getImageDimensions(file)

			await uploadMedia({
				assetType: 'screenshot',
				file,
				key: 'screenshot',
				onComplete: (metadata) => {
					const currentScreenshots = screenshotsRef.current
					const nextOrder =
						currentScreenshots.reduce(
							(highestOrder, screenshot) => Math.max(highestOrder, screenshot.order ?? 0),
							-1,
						) + 1
					const nextScreenshots = [
						...currentScreenshots,
						{
							alt: createDefaultAltText({
								orientation,
								projectSlug,
								projectTitle,
							}),
							caption: '',
							contentType: metadata.contentType,
							fileName: metadata.fileName,
							height: dimensions?.height,
							order: nextOrder,
							orientation,
							size: metadata.size,
							storagePath: metadata.storagePath,
							url: metadata.url,
							width: dimensions?.width,
						} satisfies ProjectScreenshotFormValue,
					]

					screenshotsRef.current = nextScreenshots
					setScreenshotsValue(nextScreenshots)
				},
				orientation,
			})
		},
		[projectSlug, projectTitle, setScreenshotsValue, uploadMedia],
	)

	const uploadVideo = useCallback(
		async (file: File) => {
			await uploadMedia({
				assetType: 'video',
				file,
				key: 'video',
				onComplete: (metadata) => {
					const nextVideo = {
						...videoRef.current,
						contentType: metadata.contentType,
						fileName: metadata.fileName,
						size: metadata.size,
						storagePath: metadata.storagePath,
						url: metadata.url,
					} satisfies ProjectVideoFormValue

					videoRef.current = nextVideo
					setVideoValue(nextVideo)
				},
			})
		},
		[setVideoValue, uploadMedia],
	)

	const uploadPoster = useCallback(
		async (file: File) => {
			await uploadMedia({
				assetType: 'poster',
				file,
				key: 'poster',
				onComplete: (metadata) => {
					const nextVideo = {
						...videoRef.current,
						posterUrl: metadata.url,
					} satisfies ProjectVideoFormValue

					videoRef.current = nextVideo
					setVideoValue(nextVideo)
				},
			})
		},
		[setVideoValue, uploadMedia],
	)

	const handleScreenshotFileChange = useCallback(
		(orientation: FirebaseScreenshotOrientation) => (event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			event.target.value = ''

			if (file) {
				void uploadScreenshot(file, orientation)
			}
		},
		[uploadScreenshot],
	)

	const handleVideoFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			event.target.value = ''

			if (file) {
				void uploadVideo(file)
			}
		},
		[uploadVideo],
	)

	const handlePosterFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			event.target.value = ''

			if (file) {
				void uploadPoster(file)
			}
		},
		[uploadPoster],
	)

	const cancelUpload = useCallback((key: UploadKey) => {
		cancelUploadsRef.current[key]?.()
	}, [])

	const retryUpload = useCallback(
		(key: UploadKey) => {
			const state = uploadStates[key]

			if (!state.file) {
				return
			}

			if (key === 'screenshot') {
				void uploadScreenshot(state.file, state.orientation ?? 'landscape')
				return
			}

			if (key === 'poster') {
				void uploadPoster(state.file)
				return
			}

			void uploadVideo(state.file)
		},
		[uploadPoster, uploadScreenshot, uploadStates, uploadVideo],
	)

	const addLegacyScreenshot = useCallback(() => {
		const url = legacyScreenshot.url.trim()

		if (!isHttpUrl(url)) {
			updateUploadState('screenshot', {
				message: 'Legacy screenshot URL must start with http:// or https://.',
				status: 'error',
			})
			return
		}

		const currentScreenshots = screenshotsRef.current
		const nextOrder =
			currentScreenshots.reduce(
				(highestOrder, screenshot) => Math.max(highestOrder, screenshot.order ?? 0),
				-1,
			) + 1
		const nextScreenshots = [
			...currentScreenshots,
			{
				alt:
					legacyScreenshot.alt.trim() ||
					createDefaultAltText({
						orientation: legacyScreenshot.orientation,
						projectSlug,
						projectTitle,
					}),
				caption: legacyScreenshot.caption.trim(),
				fileName: getFileNameFromUrl(url),
				order: nextOrder,
				orientation: legacyScreenshot.orientation,
				url,
			} satisfies ProjectScreenshotFormValue,
		]

		screenshotsRef.current = nextScreenshots
		setScreenshotsValue(nextScreenshots)
		setLegacyScreenshot({
			alt: '',
			caption: '',
			orientation: legacyScreenshot.orientation,
			url: '',
		})
		updateUploadState('screenshot', {
			message: 'Legacy screenshot added. Save the project to persist this media change.',
			percent: 0,
			status: 'success',
		})
	}, [
		legacyScreenshot,
		projectSlug,
		projectTitle,
		setScreenshotsValue,
		updateUploadState,
	])

	const applyLegacyVideo = useCallback(() => {
		const nextVideo: ProjectVideoFormValue = { ...videoRef.current }
		const url = legacyVideoUrl.trim()

		if (url.length > 0) {
			if (!isHttpUrl(url)) {
				updateUploadState('video', {
					message: 'Legacy video URL must start with http:// or https://.',
					status: 'error',
				})
				return
			}

			const fileName = getFileNameFromUrl(url)
			const extension = fileName?.split('.').pop()?.toLowerCase()

			nextVideo.contentType = extension ? videoContentTypesByExtension[extension] : undefined
			nextVideo.fileName = fileName
			nextVideo.size = undefined
			nextVideo.storagePath = undefined
			nextVideo.url = url
		}

		videoRef.current = nextVideo
		setVideoValue(nextVideo)
		setLegacyVideoUrl('')
		updateUploadState('video', {
			message: 'Legacy video value applied. Save the project to persist this media change.',
			percent: 0,
			status: 'success',
		})
	}, [legacyVideoUrl, setVideoValue, updateUploadState])

	const applyLegacyPoster = useCallback(() => {
		const nextVideo: ProjectVideoFormValue = { ...videoRef.current }
		const posterUrl = legacyPosterUrl.trim()

		if (posterUrl.length > 0) {
			if (!isHttpUrl(posterUrl)) {
				updateUploadState('poster', {
					message: 'Legacy poster URL must start with http:// or https://.',
					status: 'error',
				})
				return
			}

			nextVideo.posterUrl = posterUrl
		}

		videoRef.current = nextVideo
		setVideoValue(nextVideo)
		setLegacyPosterUrl('')
		updateUploadState('poster', {
			message: 'Legacy poster value applied. Save the project to persist this media change.',
			percent: 0,
			status: 'success',
		})
	}, [legacyPosterUrl, setVideoValue, updateUploadState])

	return (
		<div className={styles.field}>
			<div className={styles.header}>
				<h3 className={styles.title}>Project media uploads</h3>
				<p className={styles.description}>
					Upload screenshots, videos, and posters directly to Firebase Storage. Existing Firebase
					URLs can still be entered as legacy media values.
				</p>
			</div>

			<div className={styles.grid}>
				<section className={styles.panel}>
					<h4 className={styles.panelTitle}>Screenshots</h4>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="project-screenshot-landscape">
							Landscape image
						</label>
						<input
							accept="image/*"
							className={styles.fileInput}
							disabled={!canUpload || uploadStates.screenshot.status === 'uploading'}
							id="project-screenshot-landscape"
							onChange={handleScreenshotFileChange('landscape')}
							type="file"
						/>
					</div>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="project-screenshot-portrait">
							Portrait image
						</label>
						<input
							accept="image/*"
							className={styles.fileInput}
							disabled={!canUpload || uploadStates.screenshot.status === 'uploading'}
							id="project-screenshot-portrait"
							onChange={handleScreenshotFileChange('portrait')}
							type="file"
						/>
					</div>
					<UploadStatus
						onCancel={() => cancelUpload('screenshot')}
						onRetry={() => retryUpload('screenshot')}
						state={uploadStates.screenshot}
					/>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="legacy-screenshot-url">
							Legacy screenshot URL
						</label>
						<input
							className={styles.input}
							id="legacy-screenshot-url"
							onChange={(event) =>
								setLegacyScreenshot((currentValue) => ({
									...currentValue,
									url: event.target.value,
								}))
							}
							placeholder="https://firebasestorage.googleapis.com/..."
							type="url"
							value={legacyScreenshot.url}
						/>
					</div>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="legacy-screenshot-orientation">
							Orientation
						</label>
						<select
							className={styles.select}
							id="legacy-screenshot-orientation"
							onChange={(event) =>
								setLegacyScreenshot((currentValue) => ({
									...currentValue,
									orientation: event.target.value as FirebaseScreenshotOrientation,
								}))
							}
							value={legacyScreenshot.orientation}
						>
							<option value="landscape">Landscape</option>
							<option value="portrait">Portrait</option>
						</select>
					</div>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="legacy-screenshot-alt">
							Alt text
						</label>
						<input
							className={styles.input}
							id="legacy-screenshot-alt"
							onChange={(event) =>
								setLegacyScreenshot((currentValue) => ({
									...currentValue,
									alt: event.target.value,
								}))
							}
							type="text"
							value={legacyScreenshot.alt}
						/>
					</div>
					<div className={styles.actions}>
						<button
							className={`${styles.button} ${styles.primaryButton}`}
							onClick={addLegacyScreenshot}
							type="button"
						>
							Add legacy screenshot
						</button>
					</div>
				</section>

				<section className={styles.panel}>
					<h4 className={styles.panelTitle}>Video</h4>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="project-video-file">
							Video file
						</label>
						<input
							accept="video/*"
							className={styles.fileInput}
							disabled={!canUpload || uploadStates.video.status === 'uploading'}
							id="project-video-file"
							onChange={handleVideoFileChange}
							type="file"
						/>
					</div>
					<UploadStatus
						onCancel={() => cancelUpload('video')}
						onRetry={() => retryUpload('video')}
						state={uploadStates.video}
					/>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="legacy-video-url">
							Legacy video URL
						</label>
						<input
							className={styles.input}
							id="legacy-video-url"
							onChange={(event) => setLegacyVideoUrl(event.target.value)}
							placeholder="https://firebasestorage.googleapis.com/..."
							type="url"
							value={legacyVideoUrl}
						/>
					</div>
					<div className={styles.actions}>
						<button
							className={`${styles.button} ${styles.primaryButton}`}
							onClick={applyLegacyVideo}
							type="button"
						>
							Apply legacy video
						</button>
					</div>
				</section>

				<section className={styles.panel}>
					<h4 className={styles.panelTitle}>Poster</h4>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="project-poster-file">
							Poster image
						</label>
						<input
							accept="image/*"
							className={styles.fileInput}
							disabled={!canUpload || uploadStates.poster.status === 'uploading'}
							id="project-poster-file"
							onChange={handlePosterFileChange}
							type="file"
						/>
					</div>
					<UploadStatus
						onCancel={() => cancelUpload('poster')}
						onRetry={() => retryUpload('poster')}
						state={uploadStates.poster}
					/>
					<div className={styles.controlGroup}>
						<label className={styles.label} htmlFor="legacy-poster-url">
							Legacy poster URL
						</label>
						<input
							className={styles.input}
							id="legacy-poster-url"
							onChange={(event) => setLegacyPosterUrl(event.target.value)}
							placeholder="https://firebasestorage.googleapis.com/..."
							type="url"
							value={legacyPosterUrl}
						/>
					</div>
					<div className={styles.actions}>
						<button
							className={`${styles.button} ${styles.primaryButton}`}
							onClick={applyLegacyPoster}
							type="button"
						>
							Apply legacy poster
						</button>
					</div>
				</section>
			</div>

			{screenshots.length > 0 && (
				<ul className={styles.previewList}>
					{screenshots.slice(0, 4).map((screenshot) => (
						<li className={styles.previewItem} key={`${screenshot.url}-${screenshot.order}`}>
							<img alt={screenshot.alt} className={styles.thumbnail} src={screenshot.url} />
							<span className={styles.previewText}>
								{screenshot.orientation} screenshot {(screenshot.order ?? 0) + 1}:{' '}
								{screenshot.fileName ?? screenshot.url}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

function UploadStatus({
	onCancel,
	onRetry,
	state,
}: {
	onCancel: () => void
	onRetry: () => void
	state: UploadState
}) {
	const showCancel = state.status === 'uploading' && state.canCancel
	const showRetry = state.status === 'error' || state.status === 'canceled'
	const showActions = showCancel || showRetry

	return (
		<div className={styles.controlGroup}>
			<div className={styles.progressTrack} aria-hidden="true">
				<div className={styles.progressFill} style={{ width: `${state.percent}%` }} />
			</div>
			<p className={`${styles.status} ${state.status === 'error' ? styles.statusError : ''}`}>
				{state.message}
			</p>
			{showActions && (
				<div className={styles.actions}>
					{showCancel && (
						<button
							className={`${styles.button} ${styles.dangerButton}`}
							onClick={onCancel}
							type="button"
						>
							Cancel
						</button>
					)}
					{showRetry && (
						<button
							className={styles.button}
							disabled={!state.file}
							onClick={onRetry}
							type="button"
						>
							Retry
						</button>
					)}
				</div>
			)}
		</div>
	)
}

function formatUploadProgress(progress: FirebaseUploadProgress): string {
	return `${progress.percent}% uploaded (${formatBytes(progress.bytesTransferred)} of ${formatBytes(
		progress.totalBytes,
	)})`
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) {
		return `${bytes} B`
	}

	if (bytes < 1024 * 1024) {
		return `${(bytes / 1024).toFixed(1)} KB`
	}

	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message
	}

	return 'Upload failed.'
}

function createDefaultAltText({
	orientation,
	projectSlug,
	projectTitle,
}: {
	orientation: FirebaseScreenshotOrientation
	projectSlug: string
	projectTitle: string
}): string {
	const projectName = projectTitle || projectSlug || 'Project'

	return `${projectName} ${orientation} screenshot`
}

function isHttpUrl(value: string): boolean {
	try {
		const url = new URL(value)

		return url.protocol === 'http:' || url.protocol === 'https:'
	} catch {
		return false
	}
}

function getFileNameFromUrl(value: string): string | undefined {
	try {
		const url = new URL(value)
		const pathName = decodeURIComponent(url.pathname)
		const fileName = pathName.split('/').filter(Boolean).at(-1)

		return fileName || undefined
	} catch {
		return undefined
	}
}

function getImageDimensions(file: File): Promise<{ height: number; width: number } | undefined> {
	return new Promise((resolve) => {
		const objectUrl = URL.createObjectURL(file)
		const image = new Image()

		image.onload = () => {
			URL.revokeObjectURL(objectUrl)
			resolve({
				height: image.naturalHeight,
				width: image.naturalWidth,
			})
		}

		image.onerror = () => {
			URL.revokeObjectURL(objectUrl)
			resolve(undefined)
		}

		image.src = objectUrl
	})
}
