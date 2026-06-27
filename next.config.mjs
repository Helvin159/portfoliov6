import { withPayload } from '@payloadcms/next/withPayload'

const projectRoot = process.cwd()

/** @type {import('next').NextConfig} */
const nextConfig = {
	outputFileTracingRoot: projectRoot,
	reactStrictMode: true,
}

export default withPayload(nextConfig)
