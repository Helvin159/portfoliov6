type EnvField = {
	required: boolean
	serverOnly: boolean
}

export const serverEnvSchema = {
	DATABASE_URI: { required: true, serverOnly: true },
	PAYLOAD_SECRET: { required: true, serverOnly: true },
	FIREBASE_CLIENT_EMAIL: { required: false, serverOnly: true },
	FIREBASE_PRIVATE_KEY: { required: false, serverOnly: true },
	FIREBASE_PROJECT_ID: { required: false, serverOnly: true },
	FIREBASE_STORAGE_BUCKET: { required: false, serverOnly: true },
	NEXT_PUBLIC_SERVER_URL: { required: false, serverOnly: false },
} satisfies Record<string, EnvField>

type ServerEnv = {
	DATABASE_URI?: string
	FIREBASE_CLIENT_EMAIL?: string
	FIREBASE_PRIVATE_KEY?: string
	FIREBASE_PROJECT_ID?: string
	FIREBASE_STORAGE_BUCKET?: string
	PAYLOAD_SECRET?: string
	NEXT_PUBLIC_SERVER_URL?: string
}

type LoadedServerEnv = Required<Pick<ServerEnv, 'DATABASE_URI' | 'PAYLOAD_SECRET' | 'NEXT_PUBLIC_SERVER_URL'>> &
	Omit<ServerEnv, 'DATABASE_URI' | 'PAYLOAD_SECRET' | 'NEXT_PUBLIC_SERVER_URL'>

type LoadEnvOptions = {
	skipValidation?: boolean
}

const FALLBACK_DATABASE_URI = 'mongodb://127.0.0.1:27017/portfoliov6'
const FALLBACK_PAYLOAD_SECRET = 'payload-local-type-generation-secret'

export function loadServerEnv(options: LoadEnvOptions = {}): LoadedServerEnv {
	const env: ServerEnv = {
		DATABASE_URI: process.env.DATABASE_URI,
		FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
		FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
	}

	if (!options.skipValidation) {
		const missing = Object.entries(serverEnvSchema)
			.filter(([key, field]) => field.required && !env[key as keyof ServerEnv])
			.map(([key]) => key)

		if (missing.length > 0) {
			throw new Error(`Missing required environment variable(s): ${missing.join(', ')}`)
		}
	}

	return {
		DATABASE_URI: env.DATABASE_URI ?? FALLBACK_DATABASE_URI,
		FIREBASE_CLIENT_EMAIL: env.FIREBASE_CLIENT_EMAIL,
		FIREBASE_PRIVATE_KEY: env.FIREBASE_PRIVATE_KEY,
		FIREBASE_PROJECT_ID: env.FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET: env.FIREBASE_STORAGE_BUCKET,
		PAYLOAD_SECRET: env.PAYLOAD_SECRET ?? FALLBACK_PAYLOAD_SECRET,
		NEXT_PUBLIC_SERVER_URL: env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
	}
}
