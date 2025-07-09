import { defineField, defineType } from 'sanity'
import { VscHeart } from 'react-icons/vsc'

export default defineType({
	name: 'bonding',
	title: 'Bonding',
	icon: VscHeart,
	type: 'document',
	groups: [
		{ name: 'content', default: true },
		{ name: 'metadata' },
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'A descriptive name for this bonding (e.g., "Sibling Pair", "Mother and Daughter")',
			validation: (Rule) => Rule.required(),
			group: 'content',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Optional description of the bonding relationship',
			group: 'content',
		}),
		defineField({
			name: 'cats',
			title: 'Cats',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'cat' }] }],
			description: 'Select 2 or more cats that are bonded together',
			validation: (Rule) => Rule.min(2).required(),
			group: 'content',
		}),
		defineField({
			name: 'isActive',
			title: 'Active Bonding',
			type: 'boolean',
			description: 'Whether this bonding is currently active (all cats still available)',
			initialValue: true,
			group: 'content',
		}),
		defineField({
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),
	],
	preview: {
		select: {
			title: 'title',
			cats: 'cats',
			isActive: 'isActive',
		},
		prepare: ({ title, cats, isActive }) => ({
			title: title || 'Untitled Bonding',
			subtitle: [
				cats && cats.length > 0 && `${cats.length} cat${cats.length === 1 ? '' : 's'}`,
				isActive === false && 'Inactive',
			].filter(Boolean).join(' • '),
		}),
	},
	orderings: [
		{
			title: 'Title',
			name: 'title',
			by: [{ field: 'title', direction: 'asc' }],
		},
		{
			title: 'Active First',
			name: 'activeFirst',
			by: [
				{ field: 'isActive', direction: 'desc' },
				{ field: 'title', direction: 'asc' },
			],
		},
	],
}) 