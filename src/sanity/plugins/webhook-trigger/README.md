# Sanity Webhook Trigger Plugin

A custom Sanity plugin that adds a manual deploy button to the Sanity Studio interface, similar to `sanity-plugin-webhooks-trigger` but actually functional.

## Features

- Manual deploy button in Sanity Studio interface
- Triggers webhooks only when you click the button
- Supports custom HTTP methods (GET, POST, PUT)
- Optional authentication via Bearer token
- Custom headers support
- Comprehensive error handling and logging
- Success/error feedback in the UI
- **AWS Amplify integration with CORS handling**

## Configuration

Add the plugin to your `sanity.config.ts`:

```typescript
import { webhookTriggerPlugin } from './src/sanity/plugins/webhook-trigger'

export default defineConfig({
	// ... other config
	plugins: [
		webhookTriggerPlugin({
			webhookUrl: 'https://your-webhook-url.com/webhook',
			title: 'Deploy', // Button title
			text: 'Deploy to Production', // Button description
			method: 'POST', // HTTP method (GET, POST, PUT)
			headers: {
				'Content-Type': 'application/json',
			},
		}),
		// ... other plugins
	],
})
```

## Environment Variables

### Local Development

Add this to your `.env.local` file:

```bash
# AWS Amplify Webhook URL
# Get this from your AWS Amplify Console > App Settings > Build settings > Build notifications
AMPLIFY_WEBHOOK_URL=https://webhooks.amplify.us-east-1.amazonaws.com/prod/webhooks?id=YOUR_APP_ID&token=YOUR_TOKEN&operation=startbuild
```

### AWS Amplify Deployment

For production deployment, you need to configure the environment variable in the AWS Amplify Console:

1. Go to your AWS Amplify Console
2. Select your app
3. Go to **Environment variables**
4. Add a new environment variable:
   - **Key**: `AMPLIFY_WEBHOOK_URL`
   - **Value**: Your webhook URL (same as local)
5. Save and redeploy your app

**Important**: The webhook URL should be for a **different** Amplify app (the one you want to trigger builds for), not the same app that's running this code. If you're trying to trigger builds on the same app, consider using AWS Amplify's built-in webhook feature instead.

## AWS Amplify Deployment Issues

### Problem: Webhook not working when deployed on AWS Amplify

**Symptoms:**

- Webhook works locally but fails when deployed
- Error: "AMPLIFY_WEBHOOK_URL environment variable is not configured"
- CORS errors in browser console

**Solutions:**

#### Solution 1: Use Different Amplify App (Recommended)

1. Create a separate Amplify app for your frontend
2. Keep your Sanity Studio in the current app
3. Configure the webhook URL to point to the frontend app
4. This avoids circular dependencies

#### Solution 2: Use AWS Amplify's Built-in Webhook

1. Go to your Amplify app settings
2. Navigate to **Build settings** > **Build notifications**
3. Add a webhook notification
4. Use that webhook URL instead of the custom one

#### Solution 3: Environment Variable Configuration

1. Ensure `AMPLIFY_WEBHOOK_URL` is set in your Amplify app's environment variables
2. Redeploy your app after adding the environment variable
3. Check the build logs to verify the environment variable is available

### Debugging Steps

1. **Check Environment Variables:**

   ```bash
   # In your amplify.yml, add this to see what's available:
   - echo "AMPLIFY_WEBHOOK_URL: $AMPLIFY_WEBHOOK_URL"
   ```

2. **Check Browser Console:**
   - Open browser dev tools
   - Look for CORS errors or network failures
   - Check the "Debug Info" button in the Sanity Studio

3. **Check Server Logs:**
   - Look at your Amplify build logs
   - Check for any error messages in the API route

## Webhook Payload

The plugin sends a JSON payload with the following structure:

```json
{
	"event": "create|update|delete",
	"document": {
		"_id": "document-id",
		"_type": "document-type",
		"_rev": "revision-id"
		// ... all document fields
	},
	"timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Examples

### Basic Configuration

```typescript
webhookTriggerPlugin({
	webhookUrl: 'https://api.example.com/webhook',
	events: ['create', 'update'],
	documentTypes: ['page'],
})
```

### With Authentication

```typescript
webhookTriggerPlugin({
	webhookUrl: 'https://api.example.com/webhook',
	secret: 'your-bearer-token',
	events: ['create', 'update', 'delete'],
	documentTypes: ['blog.post'],
	method: 'POST',
	headers: {
		'X-API-Key': 'your-api-key',
	},
})
```

### GitHub Actions Webhook

```typescript
webhookTriggerPlugin({
	webhookUrl: 'https://api.github.com/repos/username/repo/dispatches',
	secret: 'your-github-token',
	events: ['create', 'update'],
	documentTypes: ['page', 'blog.post'],
	method: 'POST',
	headers: {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'Sanity-Webhook-Plugin',
	},
})
```

## Error Handling

The plugin logs errors to the console but doesn't stop the Sanity operation. Check your browser's developer console for error messages if webhooks aren't triggering.

## Security

- Use HTTPS URLs for your webhooks
- Implement proper authentication on your webhook endpoint
- Consider rate limiting on your webhook endpoint
- Validate the webhook payload on your server
