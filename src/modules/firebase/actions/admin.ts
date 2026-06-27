import 'server-only'

// Actions
import { getApps, initializeApp, cert, type App } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Constants
import { FIREBASE_ALLOWED_PATH_PREFIX_CLAIM, FIREBASE_ADMIN_CLAIM } from '../constants/storage'

type FirebaseAdminEnv = {
	clientEmail: string
	privateKey: string
	projectId: string
	storageBucket: string
}

type FirebaseAdminCustomTokenArgs = {
	allowedPathPrefix: string
	payloadAdminId: string
	uid: string
}

export function getFirebaseAdminEnv(): FirebaseAdminEnv {
	const env = {
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	}

	const missing = Object.entries(env)
		.filter(([, value]) => !value)
		.map(([key]) => key)

	if (missing.length > 0) {
		throw new Error(`Missing Firebase Admin environment value(s): ${missing.join(', ')}`)
	}

	return env as FirebaseAdminEnv
}

export function getFirebaseAdminApp(): App {
	const existingApp = getApps()[0]

	if (existingApp) {
		return existingApp
	}

	const env = getFirebaseAdminEnv()

	return initializeApp({
		credential: cert({
			clientEmail: env.clientEmail,
			privateKey: env.privateKey,
			projectId: env.projectId,
		}),
		projectId: env.projectId,
		storageBucket: env.storageBucket,
	})
}

export async function createFirebaseAdminCustomToken({
	allowedPathPrefix,
	payloadAdminId,
	uid,
}: FirebaseAdminCustomTokenArgs): Promise<string> {
	const app = getFirebaseAdminApp()

	return getAuth(app).createCustomToken(uid, {
		[FIREBASE_ADMIN_CLAIM]: true,
		[FIREBASE_ALLOWED_PATH_PREFIX_CLAIM]: allowedPathPrefix,
		payloadAdminId,
	})
}
