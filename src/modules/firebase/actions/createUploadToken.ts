import 'server-only'

// Next
import { NextResponse } from 'next/server'

// Actions
import { createFirebaseAdminCustomToken, getFirebaseAdminEnv } from './admin'
import { getPayload } from 'payload'

// Constants
import { Admins } from '@/collections/Admins'
import {
	createFirebaseUploadPathPrefix,
	FIREBASE_UPLOAD_TOKEN_EXPIRES_IN_SECONDS,
	isFirebaseMediaAssetType,
	isFirebaseScreenshotOrientation,
} from '../constants/storage'

// Types
import type { FirebaseUploadTokenRequest, FirebaseUploadTokenResponse } from '../types/upload'

// Utils
import configPromise from '@payload-config'

type UploadTokenParseResult =
	| {
			request: FirebaseUploadTokenRequest
	  }
	| {
			error: string
	  }

const PROJECT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export async function createFirebaseUploadTokenResponse(request: Request): Promise<NextResponse> {
	const parsedRequest = await parseUploadTokenRequest(request)

	if ('error' in parsedRequest) {
		return createErrorResponse(parsedRequest.error, 400)
	}

	const payload = await getPayload({ config: configPromise })
	const { user } = await payload.auth({ headers: request.headers })

	if (!user || user.collection !== Admins.slug) {
		return createErrorResponse('A Payload admin session is required.', 401)
	}

	const allowedPathPrefix = createFirebaseUploadPathPrefix(parsedRequest.request)
	const uid = `payload-admin-${user.id}`
	const customToken = await createFirebaseAdminCustomToken({
		allowedPathPrefix,
		payloadAdminId: String(user.id),
		uid,
	})
	const { storageBucket } = getFirebaseAdminEnv()

	return NextResponse.json({
		allowedPathPrefix,
		customToken,
		expiresInSeconds: FIREBASE_UPLOAD_TOKEN_EXPIRES_IN_SECONDS,
		storageBucket,
		uid,
	} satisfies FirebaseUploadTokenResponse)
}

function createErrorResponse(message: string, status: number): NextResponse {
	return NextResponse.json({ message }, { status })
}

async function parseUploadTokenRequest(request: Request): Promise<UploadTokenParseResult> {
	let body: unknown

	try {
		body = await request.json()
	} catch {
		return { error: 'Request body must be valid JSON.' }
	}

	if (!isRecord(body)) {
		return { error: 'Request body must be an object.' }
	}

	const projectSlug = body.projectSlug
	const assetType = body.assetType
	const orientation = body.orientation

	if (typeof projectSlug !== 'string' || !PROJECT_SLUG_PATTERN.test(projectSlug)) {
		return { error: 'projectSlug must be a normalized project slug.' }
	}

	if (!isFirebaseMediaAssetType(assetType)) {
		return { error: 'assetType must be screenshot, video, or poster.' }
	}

	if (assetType === 'screenshot') {
		if (!isFirebaseScreenshotOrientation(orientation)) {
			return { error: 'orientation must be landscape or portrait for screenshots.' }
		}

		return {
			request: {
				assetType,
				orientation,
				projectSlug,
			},
		}
	}

	if (orientation !== undefined) {
		return { error: 'orientation is only allowed for screenshots.' }
	}

	return {
		request: {
			assetType,
			projectSlug,
		},
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}
