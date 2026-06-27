// Utils
import assert from 'node:assert/strict'
import test from 'node:test'

// Actions
import {
	createMigrationSeedData,
	validateMigrationSeedData,
} from '@/modules/migration/actions/normalizeLegacyContent'

// Types
import type {
	FirestoreContentExport,
	NormalizedMigrationData,
} from '@/modules/migration/types/legacyContent'

const firebasePngUrl =
	'https://firebasestorage.googleapis.com/v0/b/portfolio.appspot.com/o/projects%2Fdemo-project%2Fscreenshots%2Flandscape%2Fhome.png?alt=media'
const firebaseVideoUrl =
	'https://firebasestorage.googleapis.com/v0/b/portfolio.appspot.com/o/projects%2Fdemo-project%2Fvideos%2Fwalkthrough.mp4?alt=media'

test('local migration seed normalizes checked-in portfolio content', () => {
	const seedData = createMigrationSeedData()
	const validation = validateMigrationSeedData(seedData)

	assert.equal(seedData.source, 'local-js')
	assert.ok(seedData.siteSettings.name)
	assert.ok(seedData.siteSettings.contactInfo.email)
	assert.ok(seedData.projects.length > 0)
	assert.deepEqual(validation.errors, [])

	for (const project of seedData.projects) {
		assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
		assert.equal(project._status, 'published')
		assert.equal(typeof project.sortOrder, 'number')

		const orders = project.screenshots?.map((screenshot) => screenshot.order) ?? []
		assert.deepEqual(
			orders,
			orders.map((_order, index) => index),
		)
	}
})

test('firestore export records override local project and site settings sources', () => {
	const firestoreExport: FirestoreContentExport = {
		collections: {
			portfolioDetails: [
				{
					data: {
						email_addy: 'cms@example.com',
						headline_one: 'Payload managed headline',
						name: 'CMS Helvin',
						position: 'Front-End Engineer',
						short_about_me: 'Migrated about copy',
					},
					id: 'site-settings',
				},
			],
			projects: [
				{
					data: {
						cms: ['Payload'],
						frameworks: [{ framework: 'Next.js' }],
						languages: [{ lang: 'TypeScript' }],
						projectId: '7',
						projectName: 'Demo Project',
						responsibilities: {
							one: {
								copy: 'Normalized from Firestore',
								title: 'Migration',
							},
						},
						screenshots: {
							landscape: {
								one: firebasePngUrl,
							},
						},
						url: 'https://example.com',
						videos: {
							walkthrough: firebaseVideoUrl,
						},
						workDone: 'Payload-compatible Firestore project',
					},
					id: 'demo-project',
				},
			],
		},
		exportedAt: '2026-06-27T00:00:00.000Z',
	}

	const seedData = createMigrationSeedData({ firestoreExport })
	const [project] = seedData.projects

	assert.equal(seedData.source, 'firestore-export')
	assert.equal(seedData.siteSettings.name, 'CMS Helvin')
	assert.equal(seedData.siteSettings.contactInfo.email, 'cms@example.com')
	assert.equal(project.title, 'Demo Project')
	assert.equal(project.slug, 'demo-project')
	assert.equal(project.legacyProjectId, '7')
	assert.equal(project.sortOrder, 6)
	assert.equal(project.screenshots?.[0]?.url, firebasePngUrl)
	assert.equal(
		project.screenshots?.[0]?.storagePath,
		'projects/demo-project/screenshots/landscape/home.png',
	)
	assert.equal(project.screenshots?.[0]?.contentType, 'image/png')
	assert.equal(project.video?.url, firebaseVideoUrl)
	assert.equal(project.video?.storagePath, 'projects/demo-project/videos/walkthrough.mp4')
	assert.equal(project.video?.contentType, 'video/mp4')
})

test('firestore migration preserves projects with blank project names', () => {
	const firestoreExport: FirestoreContentExport = {
		collections: {
			projects: [
				{
					data: {
						projectId: '3',
						projectName: '   ',
						screenshots: {
							landscape: {
								one: firebasePngUrl,
							},
						},
						workDone: 'Preserved from Firestore with a generated title',
					},
					id: 'blank-project-name',
				},
			],
		},
		exportedAt: '2026-06-27T00:00:00.000Z',
	}

	const seedData = createMigrationSeedData({ firestoreExport })
	const validation = validateMigrationSeedData(seedData)
	const [project] = seedData.projects

	assert.equal(seedData.projects.length, 1)
	assert.equal(project.title, 'Project 1')
	assert.equal(project.slug, 'project-1')
	assert.deepEqual(validation.errors, [])
})

test('firestore export with empty projects preserves the exported empty collection', () => {
	const firestoreExport: FirestoreContentExport = {
		collections: {
			portfolioDetails: [
				{
					data: {
						email_addy: 'cms@example.com',
						name: 'CMS Helvin',
						position: 'Front-End Engineer',
					},
					id: 'site-settings',
				},
			],
			projects: [],
		},
		exportedAt: '2026-06-27T00:00:00.000Z',
	}

	const seedData = createMigrationSeedData({ firestoreExport })

	assert.equal(seedData.source, 'firestore-export')
	assert.deepEqual(seedData.projects, [])
	assert.equal(seedData.siteSettings.name, 'CMS Helvin')
})

test('firestore migration falls back to source order for malformed project IDs', () => {
	const firestoreExport: FirestoreContentExport = {
		collections: {
			projects: [
				{
					data: {
						projectId: '',
						projectName: 'Blank Project ID',
						workDone: 'Uses source index fallback',
					},
					id: 'blank-project-id',
				},
				{
					data: {
						projectId: 'not-a-number',
						projectName: 'Text Project ID',
						workDone: 'Uses source index fallback',
					},
					id: 'text-project-id',
				},
				{
					data: {
						projectId: 12,
						projectName: 'Numeric Runtime Project ID',
						workDone: 'Uses source index fallback',
					},
					id: 'numeric-runtime-project-id',
				},
			],
		},
		exportedAt: '2026-06-27T00:00:00.000Z',
	}

	const seedData = createMigrationSeedData({ firestoreExport })

	assert.deepEqual(
		seedData.projects.map((project) => project.sortOrder),
		[0, 1, 2],
	)
})

test('migration validation rejects site settings without required array rows', () => {
	const seedData = structuredClone(createMigrationSeedData()) as NormalizedMigrationData

	seedData.siteSettings.headlines = []
	seedData.siteSettings.aboutCopy = []

	const validation = validateMigrationSeedData(seedData)

	assert.ok(
		validation.errors.some((error) => error.includes('require at least one headline')),
	)
	assert.ok(
		validation.errors.some((error) => error.includes('require at least one about copy entry')),
	)
})

test('migration validation rejects published projects without landscape screenshots', () => {
	const noScreenshotSeedData = structuredClone(createMigrationSeedData()) as NormalizedMigrationData
	const portraitOnlySeedData = structuredClone(createMigrationSeedData()) as NormalizedMigrationData

	noScreenshotSeedData.projects[0].screenshots = []
	portraitOnlySeedData.projects[0].screenshots = [
		{
			alt: 'Portrait-only screenshot',
			order: 0,
			orientation: 'portrait',
			url: firebasePngUrl,
		},
	]

	const noScreenshotValidation = validateMigrationSeedData(noScreenshotSeedData)
	const portraitOnlyValidation = validateMigrationSeedData(portraitOnlySeedData)

	assert.ok(
		noScreenshotValidation.errors.some((error) =>
			error.includes('requires at least one landscape screenshot'),
		),
	)
	assert.ok(
		portraitOnlyValidation.errors.some((error) =>
			error.includes('requires at least one landscape screenshot'),
		),
	)
})

test('migration validation reports duplicate slugs and invalid media URLs', () => {
	const seedData = structuredClone(createMigrationSeedData()) as NormalizedMigrationData

	seedData.projects[1].slug = seedData.projects[0].slug
	seedData.projects[0].screenshots = [
		{
			alt: 'Invalid screenshot',
			order: 0,
			orientation: 'landscape',
			url: 'ftp://example.com/image.png',
		},
	]
	seedData.projects[0].video = {
		url: 'not-a-url',
	}

	const validation = validateMigrationSeedData(seedData)

	assert.ok(
		validation.errors.some((error) =>
			error.includes(`Duplicate project slug found: ${seedData.projects[0].slug}`),
		),
	)
	assert.ok(
		validation.errors.some((error) =>
			error.includes('has an invalid screenshot URL: ftp://example.com/image.png'),
		),
	)
	assert.ok(
		validation.errors.some((error) => error.includes('has an invalid video URL: not-a-url')),
	)
})
