// Actions
import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app'

const firebaseClientOptions: FirebaseOptions = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}

export function getFirebaseClientApp(): FirebaseApp {
	if (getApps().length > 0) {
		return getApp()
	}

	return initializeApp(firebaseClientOptions)
}

export function createFirebaseClientUploadApp(appName: string): FirebaseApp {
	return initializeApp(firebaseClientOptions, appName)
}
