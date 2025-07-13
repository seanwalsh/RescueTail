import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const webhookUrl = process.env.AMPLIFY_WEBHOOK_URL

		return NextResponse.json({
			webhookUrl: webhookUrl || '',
			hasWebhookUrl: !!webhookUrl,
		})
	} catch (error) {
		console.error('Config API error:', error)
		return NextResponse.json(
			{
				webhookUrl: '',
				hasWebhookUrl: false,
				error: 'Failed to get configuration',
			},
			{ status: 500 },
		)
	}
}
