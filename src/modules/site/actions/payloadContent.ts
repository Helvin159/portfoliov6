// React
import { cache } from 'react'

// Types
import type { Payload } from 'payload'
import type { SiteProject, SiteSettings } from '@/modules/site/types/content'

let payloadClientPromise: Promise<Payload> | null = null

async function getPayloadClient(): Promise<Payload> {
	if (!payloadClientPromise) {
		payloadClientPromise = Promise.all([import('payload'), import('@payload-config')])
			.then(([{ getPayload }, configModule]) => getPayload({ config: configModule.default }))
			.catch((error: unknown) => {
				payloadClientPromise = null
				throw error
			})
	}

	return payloadClientPromise
}

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
	try {
		const payload = await getPayloadClient()

		return (await payload.findGlobal({
			draft: false,
			slug: 'siteSettings',
		})) as SiteSettings
	} catch (error) {
		console.error('Unable to load site settings from Payload.', error)

		return null
	}
})

export const getProjects = cache(async (): Promise<SiteProject[]> => {
	try {
		const payload = await getPayloadClient()
		const projects = await payload.find({
			collection: 'projects',
			draft: false,
			limit: 100,
			sort: 'sortOrder',
		})

		return projects.docs as SiteProject[]
	} catch (error) {
		console.error('Unable to load projects from Payload.', error)

		return []
	}
})

export const getFeaturedProjects = cache(async (): Promise<SiteProject[]> => {
	try {
		const payload = await getPayloadClient()
		const projects = await payload.find({
			collection: 'projects',
			draft: false,
			limit: 4,
			sort: 'sortOrder',
			where: {
				featured: {
					equals: true,
				},
			},
		})

		return projects.docs as SiteProject[]
	} catch (error) {
		console.error('Unable to load featured projects from Payload.', error)

		return []
	}
})

export const getProjectBySlug = cache(async (slug: string): Promise<SiteProject | null> => {
	try {
		const payload = await getPayloadClient()
		const projects = await payload.find({
			collection: 'projects',
			draft: false,
			limit: 1,
			where: {
				slug: {
					equals: slug,
				},
			},
		})

		return (projects.docs[0] as SiteProject | undefined) ?? null
	} catch (error) {
		console.error(`Unable to load project "${slug}" from Payload.`, error)

		throw error
	}
})

export const getProjectByLegacyProjectId = cache(
	async (projectId: string): Promise<SiteProject | null> => {
		const normalizedProjectId = projectId.trim()

		if (!/^\d+$/.test(normalizedProjectId)) {
			return null
		}

		const sortOrder = Number(normalizedProjectId) - 1

		if (!Number.isSafeInteger(sortOrder) || sortOrder < 0) {
			return null
		}

		try {
			const payload = await getPayloadClient()
			const legacyProjectIdProjects = await payload.find({
				collection: 'projects',
				draft: false,
				limit: 1,
				where: {
					legacyProjectId: {
						equals: normalizedProjectId,
					},
				},
			})

			const legacyProjectIdProject = legacyProjectIdProjects.docs[0] as SiteProject | undefined

			if (legacyProjectIdProject) {
				return legacyProjectIdProject
			}

			const sortOrderProjects = await payload.find({
				collection: 'projects',
				draft: false,
				limit: 1,
				where: {
					sortOrder: {
						equals: sortOrder,
					},
				},
			})

			return (sortOrderProjects.docs[0] as SiteProject | undefined) ?? null
		} catch (error) {
			console.error(`Unable to load legacy project "${projectId}" from Payload.`, error)

			throw error
		}
	},
)
