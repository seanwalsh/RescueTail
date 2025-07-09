import { defineField, defineType } from 'sanity'
import { VscHeart } from 'react-icons/vsc'

export default defineType({
	name: 'cat-list',
	title: 'Cat List',
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
			name: 'itemsPerPage',
			title: 'Items per Page',
			type: 'number',
			initialValue: 12,
			validation: (Rule) => Rule.min(1).max(50),
			group: 'options',
		}),
		defineField({
			name: 'showFilters',
			title: 'Show Filters',
			type: 'boolean',
			initialValue: true,
			group: 'options',
		}),
		defineField({
			name: 'showPagination',
			title: 'Show Pagination',
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
			intro: 'intro',
		},
		prepare: ({ title, intro }) => ({
			title: title || 'Cat List',
			subtitle: 'Cat List Module',
		}),
	},
}) 