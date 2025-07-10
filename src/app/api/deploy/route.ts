import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const webhookUrl = process.env.AMPLIFY_WEBHOOK_URL

		if (!webhookUrl) {
			return NextResponse.json(
				{ error: 'AMPLIFY_WEBHOOK_URL environment variable is not configured' },
				{ status: 500 },
			)
		}

		console.log('Proxying webhook request to:', webhookUrl)

		const response = await fetch(webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		})

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
