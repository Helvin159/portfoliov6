// React
import type { ReactNode } from 'react'

// Components
import { RootLayout as PayloadRootLayout, handleServerFunctions } from '@payloadcms/next/layouts'

// Constants
import config from '@payload-config'
import { importMap } from './admin/importMap.js'

// Types
import type { ServerFunctionClient } from 'payload'

// Utils
import '@payloadcms/next/css'

type PayloadLayoutProps = Readonly<{
	children: ReactNode
}>

const serverFunction: ServerFunctionClient = async (args) => {
	'use server'

	return handleServerFunctions({
		...args,
		config,
		importMap,
	})
}

export default function PayloadLayout({ children }: PayloadLayoutProps) {
	return PayloadRootLayout({
		children,
		config,
		importMap,
		serverFunction,
	})
}
