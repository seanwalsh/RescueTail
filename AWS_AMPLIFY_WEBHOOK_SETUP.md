# AWS Amplify Webhook Setup Guide

## The Problem

You're getting a CORS error because the webhook URL is not properly configured. The error shows:

```
Access to fetch at 'https://webhooks.amplify.us-east-1.amazonaws.com/prod/webhooks' from origin 'https://main.dub3vom6v10bv.amplifyapp.com' has been blocked by CORS policy
```

This happens because:

1. The `AMPLIFY_WEBHOOK_URL` environment variable is not set or is incomplete
2. The webhook URL is missing required parameters (`id`, `token`, `operation`)

## Solution Steps

### Step 1: Get Your AWS Amplify Webhook URL

1. Go to your **AWS Amplify Console**
2. Select your app
3. Go to **App settings** → **Build settings** → **Build notifications**
4. Click **Add notification**
5. Select **Webhook** as the notification type
6. Copy the webhook URL (it should look like this):
   ```
   https://webhooks.amplify.us-east-1.amazonaws.com/prod/webhooks?id=YOUR_APP_ID&token=YOUR_TOKEN&operation=startbuild
   ```

### Step 2: Set Environment Variable in AWS Amplify

1. In your AWS Amplify Console, go to **App settings** → **Environment variables**
2. Add a new environment variable:
   - **Key**: `AMPLIFY_WEBHOOK_URL`
   - **Value**: Paste the webhook URL from Step 1
3. Click **Save**
4. **Redeploy your app** (this is crucial!)

### Step 3: Verify the Setup

1. After redeployment, go to your Sanity Studio
2. Click the **Debug Info** button in the Deploy tool
3. Check the browser console for:
   - Webhook URL length (should be > 100 characters)
   - "Is valid URL" should be `true`
   - "Has required params" should be `true`

### Step 4: Test the Webhook

1. Click the **Deploy** button
2. Check the browser console for any errors
3. If successful, you should see "✅ Webhook triggered successfully"

## Troubleshooting

### If you still get CORS errors:

1. **Check the webhook URL format**: It must include `id=`, `token=`, and `operation=` parameters
2. **Verify environment variable**: The build logs should show the webhook URL
3. **Redeploy after changes**: Environment variable changes require a redeploy

### If the webhook URL is empty or incomplete:

1. **Check build logs**: Look for the debug output showing the webhook URL
2. **Verify environment variable name**: Must be exactly `AMPLIFY_WEBHOOK_URL`
3. **Check for typos**: Ensure no extra spaces or characters

### Alternative: Use a Different Amplify App

If you're trying to trigger builds on the same app, consider:

1. **Create a separate Amplify app** for your frontend
2. **Keep Sanity Studio** in the current app
3. **Configure the webhook** to trigger the frontend app

## Example Webhook URL Format

```
https://webhooks.amplify.us-east-1.amazonaws.com/prod/webhooks?id=abc123def456&token=xyz789&operation=startbuild
```

## Debug Information

The updated code now provides detailed debug information. Click the "Debug Info" button to see:

- Webhook URL and its length
- Whether it's a valid Amplify URL
- Whether it has required parameters
- Current environment (Browser/Server)

## Next Steps

1. Follow the steps above to configure your webhook URL
2. Redeploy your app
3. Test the webhook functionality
4. Check the debug information if issues persist

The webhook should now work correctly without CORS errors!
