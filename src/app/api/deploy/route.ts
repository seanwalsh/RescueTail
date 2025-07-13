import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		// Check if this is a proxy request from the browser
		const body = await request.json().catch(() => ({}))
		const isProxyRequest = body.webhookUrl && body.payload !== undefined

		let webhookUrl: string
		let payload: any

		if (isProxyRequest) {
			// This is a proxy request from the browser
			webhookUrl = body.webhookUrl
			payload = body.payload
		} else {
			// This is a direct webhook call
			webhookUrl = process.env.AMPLIFY_WEBHOOK_URL || ''
			payload = {}
		}

		if (!webhookUrl) {
			return NextResponse.json(
				{ error: 'AMPLIFY_WEBHOOK_URL environment variable is not configured' },
				{ status: 500 },
			)
		}

		console.log('Proxying webhook request to:', webhookUrl)
		console.log('Payload:', payload)

		// For AWS Amplify webhooks, we need to handle the request differently
		const isAmplifyWebhook = webhookUrl.includes('amplify.amazonaws.com')

		const requestOptions: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// AWS Amplify webhooks expect an empty JSON object
		if (isAmplifyWebhook) {
			requestOptions.body = JSON.stringify({})
		} else {
			requestOptions.body = JSON.stringify(payload)
		}

		const response = await fetch(webhookUrl, requestOptions)

		const responseBody = await response.text()

		console.log('AWS Response status:', response.status)
		console.log('AWS Response body:', responseBody)

		if (!response.ok) {
			return NextResponse.json(
				{
					error: 'Webhook failed',
					status: response.status,
					message: responseBody,
				},
				{ status: response.status },
			)
		}

		return NextResponse.json({
			success: true,
			message: 'AWS Amplify build queued successfully',
			response: responseBody,
		})
	} catch (error) {
		console.error('Webhook proxy error:', error)
		return NextResponse.json(
			{
				error: 'Internal server error',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 },
		)
	}
}
