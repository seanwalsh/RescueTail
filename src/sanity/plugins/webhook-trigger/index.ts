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
					component: () => {
						// In the browser, we'll get the webhook URL from the API
						const [webhookUrl, setWebhookUrl] = React.useState<string>(
							config.webhookUrl,
						)

						React.useEffect(() => {
							// If we're in the browser and don't have a webhook URL, try to get it from the API
							if (
								typeof window !== 'undefined' &&
								(!webhookUrl || webhookUrl === '')
							) {
								fetch('/api/deploy/config')
									.then((res) => res.json())
									.then((data) => {
										if (data.webhookUrl) {
											setWebhookUrl(data.webhookUrl)
										}
									})
									.catch((err) => {
										console.error('Failed to get webhook URL from API:', err)
									})
							}
						}, [webhookUrl])

						return React.createElement(DeployButton, {
							webhookUrl,
							title: config.title || 'Deploy',
							text: config.text || 'Deploy to AWS',
							secret: config.secret,
							method: config.method || 'POST',
							headers: config.headers || {},
						})
					},
				},
			],
		}
	},
)
