import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type PageProps = {
	params: Promise<{
		segments: string[]
	}>
	searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: PageProps) =>
	generatePageMetadata({ config, params, searchParams })

export default function AdminPage({ params, searchParams }: PageProps) {
	return RootPage({ config, params, searchParams, importMap })
}
