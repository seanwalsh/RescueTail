'use client'

import React from 'react'
import { DeployButton } from './DeployButton'

interface DeployToolProps {
	webhookUrl: string
	title: string
	text: string
	secret?: string
	method?: 'GET' | 'POST' | 'PUT'
	headers?: Record<string, string>
}

export function DeployTool(props: DeployToolProps) {
	return <DeployButton {...props} />
}
