// Actions
import { getPayload } from 'payload'
import config from '@payload-config'
import { createMigrationSeedData, validateMigrationSeedData } from './normalizeLegacyContent'
import {
	DEFAULT_FIRESTORE_EXPORT_PATH,
	getArgValue,
	readFirestoreExport,
} from './readFirestoreExport'

// Types
import type {
	NormalizedEducationHistory,
	NormalizedEmploymentHistory,
	NormalizedMigrationData,
	NormalizedProject,
} from '../types/legacyContent'
import type { Payload, Where } from 'payload'

const firestoreExportPath = getArgValue('firestore-export') ?? DEFAULT_FIRESTORE_EXPORT_PATH
const firestoreExport = await readFirestoreExport(firestoreExportPath)
const seedData = createMigrationSeedData({ firestoreExport })
const validation = validateMigrationSeedData(seedData)

if (validation.errors.length > 0) {
	for (const error of validation.errors) {
		console.error(`Error: ${error}`)
	}

	throw new Error('Migration seed data failed validation.')
}

for (const warning of validation.warnings) {
	console.warn(`Warning: ${warning}`)
}

if (hasFlag('dry-run')) {
	logSummary(seedData, 'Dry run complete. No Payload records were written.')
	process.exit(0)
}

const payload = await getPayload({ config })

await payload.updateGlobal({
	data: seedData.siteSettings,
	overrideAccess: true,
	slug: 'siteSettings',
})

for (const project of seedData.projects) {
	await upsertProject(payload, project)
}

for (const employmentRecord of seedData.employmentHistory) {
	await upsertEmploymentRecord(payload, employmentRecord)
}

for (const educationRecord of seedData.educationHistory) {
	await upsertEducationRecord(payload, educationRecord)
}

logSummary(seedData, 'Payload migration import complete.')

async function upsertProject(payload: Payload, project: NormalizedProject): Promise<void> {
	const existingRecords = await payload.find({
		collection: 'projects',
		depth: 0,
		limit: 1,
		overrideAccess: true,
		where: { slug: { equals: project.slug } },
	})
	const existingRecord = existingRecords.docs[0]

	if (existingRecord) {
		await payload.update({
			collection: 'projects',
			data: project,
			depth: 0,
			draft: false,
			id: existingRecord.id,
			overrideAccess: true,
		})

		return
	}

	await payload.create({
		collection: 'projects',
		data: project,
		depth: 0,
		draft: false,
		overrideAccess: true,
	})
}

async function upsertEmploymentRecord(
	payload: Payload,
	employmentRecord: NormalizedEmploymentHistory,
): Promise<void> {
	const where: Where = {
		and: [
			{ company: { equals: employmentRecord.company } },
			{ role: { equals: employmentRecord.role } },
		],
	}
	const existingRecords = await payload.find({
		collection: 'employmentHistory',
		depth: 0,
		limit: 1,
		overrideAccess: true,
		where,
	})
	const existingRecord = existingRecords.docs[0]

	if (existingRecord) {
		await payload.update({
			collection: 'employmentHistory',
			data: employmentRecord,
			depth: 0,
			draft: false,
			id: existingRecord.id,
			overrideAccess: true,
		})

		return
	}

	await payload.create({
		collection: 'employmentHistory',
		data: employmentRecord,
		depth: 0,
		draft: false,
		overrideAccess: true,
	})
}

async function upsertEducationRecord(
	payload: Payload,
	educationRecord: NormalizedEducationHistory,
): Promise<void> {
	const where: Where = {
		and: [
			{ institution: { equals: educationRecord.institution } },
			{ field: { equals: educationRecord.field } },
			{ type: { equals: educationRecord.type } },
		],
	}
	const existingRecords = await payload.find({
		collection: 'educationHistory',
		depth: 0,
		limit: 1,
		overrideAccess: true,
		where,
	})
	const existingRecord = existingRecords.docs[0]

	if (existingRecord) {
		await payload.update({
			collection: 'educationHistory',
			data: educationRecord,
			depth: 0,
			draft: false,
			id: existingRecord.id,
			overrideAccess: true,
		})

		return
	}

	await payload.create({
		collection: 'educationHistory',
		data: educationRecord,
		depth: 0,
		draft: false,
		overrideAccess: true,
	})
}

function logSummary(seedData: NormalizedMigrationData, message: string): void {
	console.log(message)
	console.log(`Source: ${seedData.source}`)
	console.log(`Projects: ${seedData.projects.length}`)
	console.log(`Employment records: ${seedData.employmentHistory.length}`)
	console.log(`Education records: ${seedData.educationHistory.length}`)
}

function hasFlag(name: string): boolean {
	return process.argv.includes(`--${name}`)
}
