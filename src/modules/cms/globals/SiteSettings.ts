// Constants
import { authenticatedWriteGlobalAccess } from '../constants/access'
import { createTagArrayField } from '../constants/fields'
import { validateHttpUrl } from '../constants/validation'

// Types
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
	slug: 'siteSettings',
	access: authenticatedWriteGlobalAccess,
	admin: {
		group: 'Portfolio Content',
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'role',
			type: 'text',
			required: true,
		},
		{
			name: 'specialty',
			type: 'text',
		},
		{
			name: 'headlines',
			type: 'array',
			fields: [
				{
					name: 'copy',
					type: 'textarea',
					admin: {
						rows: 2,
					},
					required: true,
				},
			],
			labels: {
				plural: 'Headlines',
				singular: 'Headline',
			},
			minRows: 1,
		},
		{
			name: 'aboutCopy',
			type: 'array',
			fields: [
				{
					name: 'copy',
					type: 'textarea',
					admin: {
						rows: 4,
					},
					required: true,
				},
			],
			labels: {
				plural: 'About Copy',
				singular: 'About Copy',
			},
			minRows: 1,
		},
		{
			name: 'stats',
			type: 'array',
			fields: [
				{
					name: 'label',
					type: 'text',
					required: true,
				},
				{
					name: 'value',
					type: 'text',
					required: true,
				},
			],
			labels: {
				plural: 'Stats',
				singular: 'Stat',
			},
		},
		{
			name: 'services',
			type: 'array',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'summary',
					type: 'textarea',
					admin: {
						rows: 3,
					},
				},
			],
			labels: {
				plural: 'Services',
				singular: 'Service',
			},
		},
		{
			name: 'contactInfo',
			type: 'group',
			fields: [
				{
					name: 'email',
					type: 'email',
					required: true,
				},
				{
					name: 'location',
					type: 'text',
				},
			],
		},
		{
			name: 'socialLinks',
			type: 'array',
			fields: [
				{
					name: 'platform',
					type: 'text',
					required: true,
				},
				{
					name: 'userName',
					type: 'text',
				},
				{
					name: 'url',
					type: 'text',
					required: true,
					validate: validateHttpUrl,
				},
			],
			labels: {
				plural: 'Social Links',
				singular: 'Social Link',
			},
		},
		createTagArrayField({
			label: 'Skills',
			name: 'skills',
			singularLabel: 'Skill',
		}),
		createTagArrayField({
			label: 'Tools',
			name: 'tools',
			singularLabel: 'Tool',
		}),
		createTagArrayField({
			fieldName: 'platform',
			label: 'CMS / Platforms',
			name: 'cmsPlatforms',
			singularLabel: 'CMS / Platform',
		}),
	],
	label: 'Site Settings',
	versions: {
		drafts: true,
	},
}
