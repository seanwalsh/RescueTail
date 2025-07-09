import { defineField, defineType } from 'sanity'
import { VscTag } from 'react-icons/vsc'

export default defineType({
	name: 'cat-type',
	title: 'Cat Type',
	icon: VscTag,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
		}),
	],
	preview: {
		select: {
			title: 'title',
			description: 'description',
		},
		prepare: ({ title, description }) => ({
			title,
			subtitle: description,
		}),
	},
}) 