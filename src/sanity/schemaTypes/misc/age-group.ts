import { defineField, defineType } from 'sanity'
import { VscCalendar } from 'react-icons/vsc'

export default defineType({
	name: 'age-group',
	title: 'Age Group',
	icon: VscCalendar,
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