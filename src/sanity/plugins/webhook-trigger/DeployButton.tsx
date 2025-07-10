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
				</Box>

				<Stack space={2}>
					<Button
						mode="ghost"
						tone="primary"
						onClick={handleDeploy}
						disabled={isLoading}
						text={isLoading ? 'Deploying...' : 'Deploy'}
					/>
					<Button
						mode="ghost"
						tone="caution"
						onClick={() => {
							console.log('Webhook URL:', webhookUrl)
							console.log('Headers:', headers)
							console.log('Method:', method)
						}}
						text="Debug Info"
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
