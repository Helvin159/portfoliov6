// Types
import type { Access, CollectionConfig } from 'payload'

const adminCollectionSlug = 'admins'

const authenticatedAccess: Access = ({ req }) => Boolean(req.user)

const authenticatedOrFirstAdminCreateAccess: Access = async ({ req }) => {
	if (req.user) {
		return true
	}

	const { totalDocs } = await req.payload.db.count({
		collection: adminCollectionSlug,
		req,
	})

	return totalDocs === 0
}

export const Admins: CollectionConfig = {
	slug: adminCollectionSlug,
	auth: true,
	access: {
		create: authenticatedOrFirstAdminCreateAccess,
		delete: authenticatedAccess,
		read: authenticatedAccess,
		unlock: authenticatedAccess,
		update: authenticatedAccess,
	},
	admin: {
		useAsTitle: 'email',
	},
	fields: [],
}
