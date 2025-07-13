'use client'

import React, { useState } from 'react'
import { Button, Card, Stack, Text, Box } from '@sanity/ui'
import { webhookTrigger } from './webhookTrigger'

interface DeployButtonProps {
	webhookUrl: string
	title: string
	text: string
	secret?: string
	method?: 'GET' | 'POST' | 'PUT'
	headers?: Record<string, string>
}

export function DeployButton({
	webhookUrl,
	title,
	text,
	secret,
	method = 'POST',
	headers = {},
}: DeployButtonProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [lastResult, setLastResult] = useState<{
		success: boolean
		message: string
		timestamp: string
	} | null>(null)
	const [isConfigLoading, setIsConfigLoading] = useState(false)

	const handleDeploy = async () => {
		setIsLoading(true)
		setLastResult(null)

		try {
			await webhookTrigger({
				webhookUrl,
				secret,
				method,
				headers,
				payload: {}, // AWS Amplify expects empty JSON object
			})

			setLastResult({
				success: true,
				message:
					'AWS Amplify build queued successfully! Check your Amplify console for build status.',
				timestamp: new Date().toLocaleTimeString(),
			})
		} catch (error) {
			setLastResult({
				success: false,
				message: error instanceof Error ? error.message : 'Deployment failed',
				timestamp: new Date().toLocaleTimeString(),
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card padding={4}>
			<Stack space={4}>
				<Box>
					<Text size={2} weight="semibold">
						{title}
					</Text>
					<Text size={1} muted>
						{text}
					</Text>
					{!webhookUrl && (
						<Text size={1} style={{ marginTop: '8px', color: '#f59e0b' }}>
							⚠️ Webhook URL not configured. Check environment variables.
						</Text>
					)}
				</Box>

				<Stack space={2}>
					<Button
						mode="ghost"
						tone="primary"
						onClick={handleDeploy}
						disabled={isLoading || !webhookUrl}
						text={
							isLoading
								? 'Deploying...'
								: !webhookUrl
									? 'No Webhook URL'
									: 'Deploy'
						}
					/>
					<Button
						mode="ghost"
						tone="primary"
						onClick={async () => {
							setIsConfigLoading(true)
							try {
								const response = await fetch('/api/deploy/config')
								const data = await response.json()
								if (data.webhookUrl) {
									// Force a page reload to update the webhook URL
									window.location.reload()
								}
							} catch (error) {
								console.error('Failed to refresh config:', error)
							} finally {
								setIsConfigLoading(false)
							}
						}}
						disabled={isConfigLoading}
						text={isConfigLoading ? 'Refreshing...' : 'Refresh Config'}
					/>
					<Button
						mode="ghost"
						tone="caution"
						onClick={async () => {
							setIsConfigLoading(true)
							try {
								const response = await fetch('/api/deploy/config')
								const data = await response.json()
								console.log('=== Webhook Debug Info ===')
								console.log('Current webhook URL:', webhookUrl)
								console.log('Current webhook URL length:', webhookUrl.length)
								console.log('API Config:', data)
								console.log('API Debug Info:', data.debug)
								console.log(
									'Is valid URL:',
									webhookUrl.includes('amplify.amazonaws.com'),
								)
								console.log(
									'Has required params:',
									webhookUrl.includes('id=') &&
										webhookUrl.includes('token=') &&
										webhookUrl.includes('operation='),
								)
								console.log('Headers:', headers)
								console.log('Method:', method)
								console.log(
									'Environment:',
									typeof window !== 'undefined' ? 'Browser' : 'Server',
								)
								console.log('========================')
							} catch (error) {
								console.error('Failed to get config:', error)
							} finally {
								setIsConfigLoading(false)
							}
						}}
						disabled={isConfigLoading}
						text={isConfigLoading ? 'Loading...' : 'Debug Info'}
					/>
				</Stack>

				{lastResult && (
					<Card
						padding={3}
						tone={lastResult.success ? 'positive' : 'critical'}
						radius={2}
					>
						<Stack space={2}>
							<Text size={1} weight="semibold">
								{lastResult.success ? '✅ Success' : '❌ Error'}
							</Text>
							<Text size={1}>{lastResult.message}</Text>
							<Text size={0} muted>
								{lastResult.timestamp}
							</Text>
						</Stack>
					</Card>
				)}
			</Stack>
		</Card>
	)
}
