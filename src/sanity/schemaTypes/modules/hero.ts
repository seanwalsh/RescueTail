import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { reputationBlock } from '../misc/reputation'
import { alignItems, textAlign } from 'sanitypress-utils'
import { getBlockText } from 'sanitypress-utils'

export default defineType({
	name: 'hero',
	title: 'Hero',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'asset' },
		{ name: 'options' },
	],
	fieldsets: [
		{ name: 'alignment', options: { columns: 2 } },
		{ name: 'image', options: { columns: 2 } },
	],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
			group: 'options',
		}),
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, { type: 'custom-html' }, reputationBlock],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		defineField({
			name: 'assets',
			title: 'Assets',
			type: 'array',
			of: [{ type: 'img' }],
			validation: (Rule) => Rule.max(1),
			group: 'asset',
		}),
		defineField({
			name: 'overlayOpacity',
			title: 'Overlay opacity',
			description: 'Black overlay opacity (0 = none, 1 = solid black)',
			type: 'number',
			group: 'options',
			validation: (Rule) => Rule.min(0).max(1),
			initialValue: 0.6,
		}),
		defineField({
			...alignItems,
			fieldset: 'alignment',
			group: 'options',
		}),
		defineField({
			...textAlign,
			fieldset: 'alignment',
			group: 'options',
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'assets.0.image',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Hero',
			media,
		}),
	},
})
