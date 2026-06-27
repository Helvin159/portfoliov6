// React
import * as React from 'react'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Utils
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

// Components
import { AboutContent } from '@/modules/site/components/AboutContent'
import { HomeHero } from '@/modules/site/components/HomeHero'
import { ProjectDetail } from '@/modules/site/components/ProjectDetail'
import { ProjectGallery } from '@/modules/site/components/ProjectGallery'

// Constants
import { Admins } from '@/collections/Admins'
import { Projects } from '@/modules/cms/collections/Projects'
import { SiteSettings } from '@/modules/cms/globals/SiteSettings'

// Types
import type { SiteProject, SiteSettings as SiteSettingsType } from '@/modules/site/types/content'

const globalWithReact = globalThis as typeof globalThis & { React: typeof React }
globalWithReact.React = React

type FieldRecord = {
	defaultValue?: unknown
	fields?: unknown[]
	minRows?: number
	name: string
	options?: Array<{ label?: string; value?: string }>
	required?: boolean
	type?: string
	unique?: boolean
	validate?: (
		value: unknown,
		options: {
			data?: unknown
			siblingData?: unknown
		},
	) => unknown
}

type ProjectReadAccess = NonNullable<NonNullable<typeof Projects.access>['read']>
type ProjectAccessArgs = Parameters<ProjectReadAccess>[0]
type AdminCreateAccess = NonNullable<NonNullable<typeof Admins.access>['create']>
type AdminAccessArgs = Parameters<AdminCreateAccess>[0]

function createAccessArgs(hasUser: boolean): ProjectAccessArgs {
	return {
		req: {
			user: hasUser ? { id: 'admin' } : null,
		} as unknown as ProjectAccessArgs['req'],
	}
}

function createAdminAccessArgs({
	hasUser,
	totalAdmins,
}: {
	hasUser: boolean
	totalAdmins: number
}): AdminAccessArgs {
	return {
		req: {
			payload: {
				db: {
					count: async () => ({ totalDocs: totalAdmins }),
				},
			},
			user: hasUser ? { id: 'admin' } : null,
		} as unknown as AdminAccessArgs['req'],
	}
}

function getField(fields: readonly unknown[], fieldName: string): FieldRecord {
	const field = fields.find((item): item is FieldRecord => {
		return isFieldRecord(item) && item.name === fieldName
	})

	assert.ok(field, `Expected field "${fieldName}" to exist.`)

	return field
}

function isFieldRecord(value: unknown): value is FieldRecord {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		return false
	}

	const record = value as Record<string, unknown>

	return typeof record.name === 'string'
}

const sampleSiteSettings = {
	aboutCopy: [{ copy: 'I build resilient, content-managed web experiences.' }],
	contactInfo: {
		email: 'helvin@example.com',
		location: 'Methuen, MA USA',
	},
	headlines: [
		{ copy: 'Helvin Rymer' },
		{ copy: 'Front-end developer focused on polished interfaces.' },
	],
	id: 1,
	name: 'Helvin Rymer',
	role: 'Front-End Developer',
	services: [{ title: 'Web Development', summary: 'React and CMS implementation.' }],
	skills: [{ name: 'TypeScript' }, { name: 'Next.js' }],
	stats: [{ label: 'Projects completed', value: '5' }],
} as unknown as SiteSettingsType

const sampleProject = {
	cmsPlatforms: [{ platform: 'Payload' }],
	createdAt: '2026-06-27T00:00:00.000Z',
	externalUrl: 'https://example.com',
	featured: true,
	frameworks: [{ framework: 'Next.js' }],
	id: 1,
	languages: [{ language: 'TypeScript' }],
	responsibilities: [
		{
			copy: 'Built the content model and rendering workflow.',
			title: 'Implementation',
		},
		{
			copy: 'Kept deployment behavior stable during the migration.',
			title: 'Migration',
		},
		{
			copy: 'Verified public pages keep rendering every authored responsibility.',
			title: 'Quality',
		},
	],
	screenshots: [
		{
			alt: 'Legacy Media landscape screenshot',
			order: 1,
			orientation: 'landscape',
			url: 'https://legacy.example.com/second.png',
		},
		{
			alt: 'Legacy Media hero screenshot',
			order: 0,
			orientation: 'landscape',
			url: 'https://legacy.example.com/hero.png',
		},
		{
			alt: 'Legacy Media portrait screenshot',
			order: 2,
			orientation: 'portrait',
			url: 'https://legacy.example.com/mobile.png',
		},
	],
	slug: 'legacy-media',
	sortOrder: 0,
	summary: 'A project migrated from legacy media URLs.',
	title: 'Legacy Media',
	updatedAt: '2026-06-27T00:00:00.000Z',
} as unknown as SiteProject

test('projects schema keeps normalized ordered media fields and slug constraints', () => {
	const titleField = getField(Projects.fields, 'title')
	const slugField = getField(Projects.fields, 'slug')
	const legacyProjectIdField = getField(Projects.fields, 'legacyProjectId')
	const screenshotsField = getField(Projects.fields, 'screenshots')
	const videoField = getField(Projects.fields, 'video')
	const mediaAdminField = getField(Projects.fields, 'projectMediaAdmin')

	assert.equal(Projects.slug, 'projects')
	assert.equal(Projects.defaultSort, 'sortOrder')
	assert.equal(titleField.required, true)
	assert.equal(slugField.required, true)
	assert.equal(slugField.unique, true)
	assert.equal(legacyProjectIdField.type, 'text')
	assert.equal(mediaAdminField.type, 'ui')
	assert.equal(screenshotsField.type, 'array')
	assert.equal(videoField.type, 'group')

	const screenshotFields = screenshotsField.fields ?? []
	const screenshotUrlField = getField(screenshotFields, 'url')
	const orientationField = getField(screenshotFields, 'orientation')
	const orderField = getField(screenshotFields, 'order')

	assert.equal(screenshotUrlField.required, true)
	assert.equal(orientationField.type, 'select')
	assert.deepEqual(
		orientationField.options?.map((option) => option.value),
		['landscape', 'portrait'],
	)
	assert.equal(orderField.required, true)
	assert.equal(orderField.defaultValue, 0)
	assert.equal(
		screenshotsField.validate?.([], {
			data: { _status: 'published' },
			siblingData: {},
		}),
		'Published projects require at least one landscape screenshot.',
	)
	assert.equal(
		screenshotsField.validate?.([{ orientation: 'portrait' }], {
			data: { _status: 'published' },
			siblingData: {},
		}),
		'Published projects require at least one landscape screenshot.',
	)
	assert.equal(
		screenshotsField.validate?.([{ orientation: 'landscape' }], {
			data: { _status: 'published' },
			siblingData: {},
		}),
		true,
	)
	assert.equal(
		screenshotsField.validate?.([], {
			data: { _status: 'draft' },
			siblingData: {},
		}),
		true,
	)

	const videoFields = videoField.fields ?? []

	assert.equal(getField(videoFields, 'url').type, 'text')
	assert.equal(getField(videoFields, 'posterUrl').type, 'text')
	assert.equal(getField(videoFields, 'contentType').type, 'text')
})

test('admins collection prevents public auth self-signup after bootstrap', async () => {
	const existingAdminArgs = createAdminAccessArgs({ hasUser: false, totalAdmins: 1 })
	const emptyCollectionArgs = createAdminAccessArgs({ hasUser: false, totalAdmins: 0 })
	const authenticatedAdminArgs = createAdminAccessArgs({ hasUser: true, totalAdmins: 1 })

	assert.equal(await Admins.access?.create?.(existingAdminArgs), false)
	assert.equal(await Admins.access?.create?.(emptyCollectionArgs), true)
	assert.equal(await Admins.access?.create?.(authenticatedAdminArgs), true)
	assert.equal(await Admins.access?.read?.(existingAdminArgs), false)
	assert.equal(await Admins.access?.update?.(existingAdminArgs), false)
	assert.equal(await Admins.access?.delete?.(existingAdminArgs), false)
	assert.equal(await Admins.access?.unlock?.(existingAdminArgs), false)
	assert.equal(await Admins.access?.read?.(authenticatedAdminArgs), true)
	assert.equal(await Admins.access?.update?.(authenticatedAdminArgs), true)
	assert.equal(await Admins.access?.delete?.(authenticatedAdminArgs), true)
	assert.equal(await Admins.access?.unlock?.(authenticatedAdminArgs), true)
})

test('public Payload reads are limited to published content while version reads require auth', async () => {
	const publishedOnlyConstraint = {
		_status: {
			equals: 'published',
		},
	}

	assert.deepEqual(await Projects.access?.read?.(createAccessArgs(false)), publishedOnlyConstraint)
	assert.deepEqual(await SiteSettings.access?.read?.(createAccessArgs(false)), publishedOnlyConstraint)
	assert.equal(await Projects.access?.read?.(createAccessArgs(true)), true)
	assert.equal(await SiteSettings.access?.read?.(createAccessArgs(true)), true)
	assert.equal(await Projects.access?.readVersions?.(createAccessArgs(false)), false)
	assert.equal(await SiteSettings.access?.readVersions?.(createAccessArgs(false)), false)
	assert.equal(await Projects.access?.readVersions?.(createAccessArgs(true)), true)
	assert.equal(await SiteSettings.access?.readVersions?.(createAccessArgs(true)), true)
})

test('site settings schema requires the public content needed by the routes', () => {
	const nameField = getField(SiteSettings.fields, 'name')
	const roleField = getField(SiteSettings.fields, 'role')
	const headlinesField = getField(SiteSettings.fields, 'headlines')
	const aboutCopyField = getField(SiteSettings.fields, 'aboutCopy')
	const contactInfoField = getField(SiteSettings.fields, 'contactInfo')

	assert.equal(SiteSettings.slug, 'siteSettings')
	assert.equal(nameField.required, true)
	assert.equal(roleField.required, true)
	assert.equal(headlinesField.minRows, 1)
	assert.equal(aboutCopyField.minRows, 1)
	assert.equal(getField(contactInfoField.fields ?? [], 'email').required, true)
})

test('portrait fallbacks use checked-in public assets without Firebase download tokens', async () => {
	const mediaSource = await readFile('src/modules/site/constants/media.ts', 'utf8')

	assert.match(mediaSource, /FALLBACK_PROFILE_IMAGE_URL = '\/images\/profile-portrait\.png'/)
	assert.match(mediaSource, /NEXT_PUBLIC_HOME_HERO_IMAGE_URL\?\.trim\(\)/)
	assert.match(mediaSource, /NEXT_PUBLIC_ABOUT_PROFILE_IMAGE_URL\?\.trim\(\)/)
	assert.match(mediaSource, /HOME_HERO_IMAGE_URL = homeHeroImageUrl \|\| FALLBACK_PROFILE_IMAGE_URL/)
	assert.match(
		mediaSource,
		/ABOUT_PROFILE_IMAGE_URL = aboutProfileImageUrl \|\| FALLBACK_PROFILE_IMAGE_URL/,
	)
	assert.doesNotMatch(mediaSource, /token=/)
	await assert.doesNotReject(readFile('public/images/profile-portrait.png'))
})

test('public components render CMS content with legacy media URLs and optional video missing', () => {
	const homeMarkup = renderToStaticMarkup(
		createElement(HomeHero, { siteSettings: sampleSiteSettings }),
	)
	const aboutMarkup = renderToStaticMarkup(
		createElement(AboutContent, { siteSettings: sampleSiteSettings }),
	)
	const galleryMarkup = renderToStaticMarkup(
		createElement(ProjectGallery, {
			includeDetails: true,
			projects: [sampleProject],
		}),
	)
	const detailMarkup = renderToStaticMarkup(
		createElement(ProjectDetail, { project: sampleProject }),
	)

	assert.match(homeMarkup, /Helvin Rymer/)
	assert.match(homeMarkup, /Projects completed/)
	assert.match(aboutMarkup, /TypeScript/)
	assert.match(galleryMarkup, /href="\/featured\/legacy-media"/)
	assert.match(galleryMarkup, /https:\/\/legacy\.example\.com\/hero\.png/)
	assert.match(detailMarkup, /Project: Legacy Media/)
	assert.match(detailMarkup, /https:\/\/legacy\.example\.com\/hero\.png/)
	assert.match(detailMarkup, /About Implementation/)
	assert.match(detailMarkup, /About Migration/)
	assert.match(detailMarkup, /About Quality/)
	assert.doesNotMatch(detailMarkup, /project__video/)
})

test('project video rendering falls back when optional caption and poster values are absent', () => {
	const projectWithVideo = {
		...sampleProject,
		video: {
			url: 'https://legacy.example.com/walkthrough.mp4',
		},
	} as unknown as SiteProject

	const markup = renderToStaticMarkup(createElement(ProjectDetail, { project: projectWithVideo }))

	assert.match(markup, /Video presentation/)
	assert.match(markup, /https:\/\/legacy\.example\.com\/walkthrough\.mp4/)
	assert.match(markup, /type="video\/mp4"/)
})

test('site routes remain wired to Payload-backed rendering paths', async () => {
	const routeExpectations = [
		{
			filePath: 'src/app/(site)/page.tsx',
			tokens: ['getSiteSettings', 'getFeaturedProjects', 'HomeHero', 'ProjectGallery'],
		},
		{
			filePath: 'src/app/(site)/about/page.tsx',
			tokens: ['getSiteSettings', 'AboutContent'],
		},
		{
			filePath: 'src/app/(site)/featured/page.tsx',
			tokens: ['getProjects', 'ProjectGallery'],
		},
		{
			filePath: 'src/app/(site)/featured/[slug]/page.tsx',
			tokens: ['getProjectBySlug', 'ProjectDetail', 'notFound'],
		},
		{
			filePath: 'src/app/(site)/contact/page.tsx',
			tokens: ['getSiteSettings', 'ContactContent'],
		},
		{
			filePath: 'src/app/(site)/layout.tsx',
			tokens: ['getSiteSettings', 'Footer', 'footerSocialLinks'],
		},
	]

	for (const { filePath, tokens } of routeExpectations) {
		const source = await readFile(filePath, 'utf8')

		assert.match(source, /export const dynamic = 'force-dynamic'/, `${filePath} should be dynamic.`)

		for (const token of tokens) {
			assert.ok(source.includes(token), `${filePath} should include ${token}.`)
		}
	}
})

test('footer contact surface uses Payload data and keeps the form submit wired', async () => {
	const layoutSource = await readFile('src/app/(site)/layout.tsx', 'utf8')
	const footerSource = await readFile('src/modules/site/components/Footer.tsx', 'utf8')

	assert.doesNotMatch(layoutSource, /helvinrymer@gmail\.com/)
	assert.doesNotMatch(layoutSource, /linkedin\.com\/in\/helvinrymer/)
	assert.match(layoutSource, /getSiteSettings/)
	assert.match(layoutSource, /footerSocialLinks/)

	assert.match(footerSource, /onSubmit={sendEmail}/)
	assert.match(footerSource, /action={email \? `mailto:\${email}` : undefined}/)
	assert.match(footerSource, /type=['"]submit['"]/)
	assert.doesNotMatch(footerSource, /onClick={sendEmail}/)
})
