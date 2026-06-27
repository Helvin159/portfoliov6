// Types
import type { CollectionConfig, GlobalConfig } from 'payload'

type CollectionAccess = NonNullable<CollectionConfig['access']>
type CollectionReadAccess = NonNullable<CollectionAccess['read']>

const authenticatedAccess: CollectionReadAccess = ({ req }) => Boolean(req.user)

const authenticatedOrPublishedReadAccess: CollectionReadAccess = ({ req }) => {
	if (req.user) {
		return true
	}

	return {
		_status: {
			equals: 'published',
		},
	}
}

export const authenticatedWriteCollectionAccess = {
	create: authenticatedAccess,
	delete: authenticatedAccess,
	read: authenticatedOrPublishedReadAccess,
	readVersions: authenticatedAccess,
	update: authenticatedAccess,
} satisfies NonNullable<CollectionConfig['access']>

export const authenticatedWriteGlobalAccess = {
	read: authenticatedOrPublishedReadAccess,
	readVersions: authenticatedAccess,
	update: authenticatedAccess,
} satisfies NonNullable<GlobalConfig['access']>
