import pkg from './package.json'
import { defineConfig } from 'sanity'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'
import { structure } from './src/sanity/structure'
import { presentation } from './src/sanity/presentation'
import { icon, infoWidget } from 'sanitypress-utils'
import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { media } from 'sanity-plugin-media'
import { supportedLanguages } from '@/lib/i18n'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './src/sanity/schemaTypes'
import resolveUrl from '@/lib/resolveUrl'
import { webhookTriggerPlugin } from './src/sanity/plugins/webhook-trigger'

const singletonTypes = ['site']

export default defineConfig({
	title: 'SanityPress',
	icon,
	projectId,
	dataset,
	basePath: '/admin',

	plugins: [
		structure,
		webhookTriggerPlugin({
			webhookUrl: process.env.AMPLIFY_WEBHOOK_URL || '',
			title: 'Deploy',
			text: 'Deploy to AWS Amplify',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}),
		presentation,
		// dashboardTool({
		// 	name: 'deployment',
		// 	title: 'Deployment',
		// }),
		dashboardTool({
			name: 'info',
			title: 'Info',
			widgets: [
				projectInfoWidget(),
				projectUsersWidget(),
				infoWidget({ version: pkg.version }),
			],
		}),
		visionTool({ defaultApiVersion: apiVersion }),
		codeInput(),
		media(),
		documentInternationalization({
			supportedLanguages,
			schemaTypes: ['page', 'blog.post'],
		}),
	],

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.includes(schemaType),
			),
	},
	document: {
		productionUrl: async (prev, { document }) => {
			if (['page', 'blog.post'].includes(document?._type)) {
				return resolveUrl(document as Sanity.PageBase, { base: true })
			}
			return prev
		},

		actions: (input, { schemaType }) => {
			if (singletonTypes.includes(schemaType)) {
				return input.filter(
					({ action }) =>
						action && ['publish', 'discardChanges', 'restore'].includes(action),
				)
			}

			return input
		},
	},
})
