import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const webhookUrl = process.env.AMPLIFY_WEBHOOK_URL

		console.log('Config API called')
		console.log('AMPLIFY_WEBHOOK_URL:', webhookUrl)
		console.log(
			'All env vars:',
			Object.keys(process.env).filter((key) => key.includes('AMPLIFY')),
		)

		return NextResponse.json({
			webhookUrl: webhookUrl || '',
			hasWebhookUrl: !!webhookUrl,
			debug: {
				envVarExists: !!process.env.AMPLIFY_WEBHOOK_URL,
				envVarLength: process.env.AMPLIFY_WEBHOOK_URL?.length || 0,
			},
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
