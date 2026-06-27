// Node
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Actions
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

// Types
import type { FirestoreContentExport, FirestoreExportDocument } from '../types/legacyContent'

const DEFAULT_OUTPUT_PATH = 'src/modules/migration/data/firestore-export.json'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}

const outputPath = getArgValue('output') ?? DEFAULT_OUTPUT_PATH
const missingConfigKeys = Object.entries(firebaseConfig)
	.filter(([, value]) => !value)
	.map(([key]) => key)

if (missingConfigKeys.length > 0) {
	throw new Error(`Missing Firebase config value(s): ${missingConfigKeys.join(', ')}`)
}

const firebaseApp = initializeApp(firebaseConfig)
const firestore = getFirestore(firebaseApp)

const firestoreExport: FirestoreContentExport = {
	collections: {
		portfolioDetails: await readFirestoreCollection('portfolioDetails'),
		projects: await readFirestoreCollection('projects'),
	},
	exportedAt: new Date().toISOString(),
}

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(firestoreExport, null, 2)}\n`)

console.log(`Exported Firestore content to ${outputPath}`)
console.log(`Projects: ${firestoreExport.collections?.projects?.length ?? 0}`)
console.log(`Portfolio details: ${firestoreExport.collections?.portfolioDetails?.length ?? 0}`)

async function readFirestoreCollection(collectionName: string): Promise<FirestoreExportDocument[]> {
	const snapshot = await getDocs(collection(firestore, collectionName))

	return snapshot.docs.map((documentSnapshot) => ({
		data: documentSnapshot.data(),
		id: documentSnapshot.id,
	}))
}

function getArgValue(name: string): string | undefined {
	const prefix = `--${name}=`
	const arg = process.argv.find((item) => item.startsWith(prefix))

	return arg?.slice(prefix.length)
}
