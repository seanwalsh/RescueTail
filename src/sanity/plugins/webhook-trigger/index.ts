import { definePlugin } from 'sanity'
import { DeployButton } from './DeployButton'
import React from 'react'

export interface WebhookTriggerConfig {
	webhookUrl: string
	title?: string
	text?: string
	secret?: string
	method?: 'GET' | 'POST' | 'PUT'
	headers?: Record<string, string>
}

export const webhookTriggerPlugin = definePlugin<WebhookTriggerConfig>(
	(config) => {
		return {
			name: 'webhook-trigger',
			tools: [
				{
					name: 'deploy',
					title: config.title || 'Deploy',
					component: () =>
						React.createElement(DeployButton, {
							webhookUrl: config.webhookUrl,
							title: config.title || 'Deploy',
							text: config.text || 'Deploy to AWS',
							secret: config.secret,
							method: config.method || 'POST',
							headers: config.headers || {},
						}),
				},
			],
		}
	},
)
