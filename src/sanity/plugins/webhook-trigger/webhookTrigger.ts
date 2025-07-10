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

	// For AWS Amplify webhooks, we'll use our local API route to avoid CORS
	const apiUrl = '/api/deploy'

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		console.log('Sending webhook request via API proxy:', {
			originalUrl: webhookUrl,
			apiUrl,
			method,
			headers,
			payload,
		})

		const response = await fetch(apiUrl, requestOptions)

		console.log('API response:', {
			status: response.status,
			statusText: response.statusText,
		})

		// Get response body
		const responseBody = await response.text()
		console.log('API response body:', responseBody)

		if (!response.ok) {
			throw new Error(
				`Webhook request failed: ${response.status} ${response.statusText} - ${responseBody}`,
			)
		}

		// Parse the API response
		try {
			const apiResponse = JSON.parse(responseBody)
			if (apiResponse.success) {
				console.log('✅ AWS Amplify webhook successful via API proxy')
				if (apiResponse.response) {
					// Try to parse the AWS response from our API
					try {
						const awsResponse = JSON.parse(apiResponse.response)
						if (awsResponse.SendMessageResponse?.SendMessageResult?.MessageId) {
							console.log(
								'✅ AWS Amplify webhook successful - Message ID:',
								awsResponse.SendMessageResponse.SendMessageResult.MessageId,
							)
						}
					} catch (parseError) {
						console.log('AWS response is not valid JSON')
					}
				}
			} else {
				throw new Error(apiResponse.message || 'Unknown API error')
			}
		} catch (parseError) {
			console.log('API response is not valid JSON')
		}

		console.log(`Webhook triggered successfully via API proxy`)
	} catch (error) {
		console.error('Webhook trigger error:', error)
		throw error
	}
}
