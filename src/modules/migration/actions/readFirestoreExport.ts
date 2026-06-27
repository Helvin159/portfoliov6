// Node
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

// Types
import type { FirestoreContentExport } from '../types/legacyContent'

export const DEFAULT_FIRESTORE_EXPORT_PATH = 'src/modules/migration/data/firestore-export.json'

export async function readFirestoreExport(path: string): Promise<FirestoreContentExport | undefined> {
	if (!existsSync(path)) {
		return undefined
	}

	const contents = await readFile(path, 'utf8')

	return JSON.parse(contents) as FirestoreContentExport
}

export function getArgValue(name: string): string | undefined {
	const prefix = `--${name}=`
	const arg = process.argv.find((item) => item.startsWith(prefix))

	return arg?.slice(prefix.length)
}
