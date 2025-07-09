import { defineField, defineType } from 'sanity'
import { VscHeart } from 'react-icons/vsc'

export default defineType({
	name: 'cat',
	title: 'Cat',
	icon: VscHeart,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
			group: 'options',
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'intro',
			title: 'Introduction',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'cat',
			title: 'Cat',
			type: 'reference',
			to: [{ type: 'cat' }],
			group: 'content',
		}),
		defineField({
			name: 'showGallery',
			title: 'Show Image Gallery',
			type: 'boolean',
			initialValue: true,
			group: 'options',
		}),
		defineField({
			name: 'showDetails',
			title: 'Show Cat Details',
			type: 'boolean',
			initialValue: true,
			group: 'options',
		}),
		defineField({
			name: 'showDescription',
			title: 'Show Description',
			type: 'boolean',
			initialValue: true,
			group: 'options',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
	],
	preview: {
		select: {
			title: 'title',
			catName: 'cat.name',
			intro: 'intro',
		},
		prepare: ({ title, catName, intro }) => ({
			title: title || catName || 'Cat Module',
			subtitle: 'Cat',
		}),
	},
}) 