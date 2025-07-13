interface WebhookTriggerOptions {
	webhookUrl: string
	secret?: string
	method?: 'GET' | 'POST' | 'PUT'
	headers?: Record<string, string>
	payload?: any
}

export async function webhookTrigger(
	options: WebhookTriggerOptions,
): Promise<void> {
	const { webhookUrl, secret, method = 'POST', headers = {}, payload } = options

	// Check if we're in a browser environment (Sanity Studio)
	const isBrowser = typeof window !== 'undefined'

	// For AWS Amplify webhooks in the browser, we need to use our API proxy
	// to avoid CORS issues
	const shouldUseProxy =
		isBrowser && webhookUrl.includes('amplify.amazonaws.com')

	const requestOptions: RequestInit = {
		method: shouldUseProxy ? 'POST' : method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	}

	// Add payload if provided
	if (payload && !shouldUseProxy) {
		requestOptions.body = JSON.stringify(payload)
	}

	try {
		console.log('Sending webhook request:', {
			url: webhookUrl,
			method: shouldUseProxy ? 'POST (via proxy)' : method,
			headers: requestOptions.headers,
			payload,
			useProxy: shouldUseProxy,
		})

		let targetUrl = webhookUrl

		if (shouldUseProxy) {
			// Use our API proxy for AWS Amplify webhooks in browser
			targetUrl = '/api/deploy'
			requestOptions.body = JSON.stringify({ webhookUrl, payload })
		}

		const response = await fetch(targetUrl, requestOptions)

		console.log('Webhook response:', {
			status: response.status,
			statusText: response.statusText,
		})

		// Get response body
		const responseBody = await response.text()
		console.log('Webhook response body:', responseBody)

		if (!response.ok) {
			throw new Error(
				`Webhook request failed: ${response.status} ${response.statusText} - ${responseBody}`,
			)
		}

		// Try to parse the response
		try {
			const parsedResponse = JSON.parse(responseBody)
			if (parsedResponse.success) {
				console.log('✅ Webhook triggered successfully')
				if (parsedResponse.response) {
					console.log('Response details:', parsedResponse.response)
				}
			} else {
				throw new Error(parsedResponse.message || 'Unknown webhook error')
			}
		} catch (parseError) {
			// If response is not JSON, that's okay for some webhooks
			console.log(
				'Webhook response is not JSON (this is normal for some webhooks)',
			)
		}

		console.log(`Webhook triggered successfully`)
	} catch (error) {
		console.error('Webhook trigger error:', error)
		throw error
	}
}
