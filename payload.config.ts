import path from 'path'
import { fileURLToPath } from 'url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Admins } from '@/collections/Admins'
import { loadServerEnv } from '@/lib/env'
import { cmsCollections, cmsGlobals } from '@/modules/cms'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const skipEnvValidation = process.env.PAYLOAD_SKIP_ENV_VALIDATION === 'true'
const env = loadServerEnv({ skipValidation: skipEnvValidation })

export default buildConfig({
	admin: {
		user: Admins.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Admins, ...cmsCollections],
	db: mongooseAdapter({
		url: env.DATABASE_URI,
	}),
	editor: lexicalEditor(),
	globals: cmsGlobals,
	secret: env.PAYLOAD_SECRET,
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
})
