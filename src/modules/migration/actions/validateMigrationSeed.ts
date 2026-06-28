// Actions
import { createMigrationSeedData, validateMigrationSeedData } from './normalizeLegacyContent'
import {
	DEFAULT_FIRESTORE_EXPORT_PATH,
	getArgValue,
	readFirestoreExport,
} from './readFirestoreExport'

const firestoreExportPath = getArgValue('firestore-export') ?? DEFAULT_FIRESTORE_EXPORT_PATH
const firestoreExport = await readFirestoreExport(firestoreExportPath)
const seedData = createMigrationSeedData({ firestoreExport })
const validation = validateMigrationSeedData(seedData)

console.log(`Migration seed source: ${seedData.source}`)
console.log(`Projects: ${seedData.projects.length}`)
console.log(`Employment records: ${seedData.employmentHistory.length}`)
console.log(`Education records: ${seedData.educationHistory.length}`)
console.log(`Warnings: ${validation.warnings.length}`)
console.log(`Errors: ${validation.errors.length}`)

for (const warning of validation.warnings) {
	console.warn(`Warning: ${warning}`)
}

for (const error of validation.errors) {
	console.error(`Error: ${error}`)
}

if (validation.errors.length > 0) {
	process.exit(1)
}
