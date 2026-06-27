// Constants
import { validateHttpUrl, validateOptionalContentTypePrefix } from './validation'

// Types
import type { Field } from 'payload'

export const projectScreenshotFields: Field[] = [
	{
		name: 'url',
		type: 'text',
		admin: {
			description: 'Public Firebase Storage download URL or preserved legacy media URL.',
		},
		required: true,
		validate: validateHttpUrl,
	},
	{
		name: 'storagePath',
		type: 'text',
		admin: {
			description: 'Firebase Storage object path, when known.',
		},
	},
	{
		name: 'orientation',
		type: 'select',
		defaultValue: 'landscape',
		options: [
			{ label: 'Landscape', value: 'landscape' },
			{ label: 'Portrait', value: 'portrait' },
		],
		required: true,
	},
	{
		name: 'alt',
		type: 'text',
		required: true,
	},
	{
		name: 'caption',
		type: 'textarea',
		admin: {
			rows: 2,
		},
	},
	{
		name: 'order',
		type: 'number',
		admin: {
			step: 1,
		},
		defaultValue: 0,
		min: 0,
		required: true,
	},
	{
		name: 'fileName',
		type: 'text',
	},
	{
		name: 'contentType',
		type: 'text',
		admin: {
			placeholder: 'image/png',
		},
		validate: validateOptionalContentTypePrefix('image/'),
	},
	{
		name: 'size',
		type: 'number',
		admin: {
			description: 'File size in bytes.',
		},
		min: 0,
	},
	{
		name: 'width',
		type: 'number',
		min: 1,
	},
	{
		name: 'height',
		type: 'number',
		min: 1,
	},
]

export const projectVideoFields: Field[] = [
	{
		name: 'url',
		type: 'text',
		admin: {
			description: 'Public Firebase Storage download URL or preserved legacy media URL.',
		},
		validate: validateHttpUrl,
	},
	{
		name: 'storagePath',
		type: 'text',
		admin: {
			description: 'Firebase Storage object path, when known.',
		},
	},
	{
		name: 'posterUrl',
		type: 'text',
		validate: validateHttpUrl,
	},
	{
		name: 'caption',
		type: 'textarea',
		admin: {
			rows: 2,
		},
	},
	{
		name: 'fileName',
		type: 'text',
	},
	{
		name: 'contentType',
		type: 'text',
		admin: {
			placeholder: 'video/mp4',
		},
		validate: validateOptionalContentTypePrefix('video/'),
	},
	{
		name: 'size',
		type: 'number',
		admin: {
			description: 'File size in bytes.',
		},
		min: 0,
	},
]
