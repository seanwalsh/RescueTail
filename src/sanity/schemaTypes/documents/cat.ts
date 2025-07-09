import { defineField, defineType } from 'sanity'
import { VscHeart } from 'react-icons/vsc'

export default defineType({
	name: 'cat',
	title: 'Cat',
	icon: VscHeart,
	type: 'document',
	groups: [
		{ name: 'content', default: true },
		{ name: 'details' },
		{ name: 'metadata' },
	],
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
			group: 'content',
		}),
		defineField({
			name: 'isAvailable',
			title: 'Available for Adoption',
			type: 'boolean',
			initialValue: true,
			group: 'content',
		}),
		defineField({
			name: 'gender',
			title: 'Gender',
			type: 'string',
			options: {
				list: [
					{ title: 'Male', value: 'male' },
					{ title: 'Female', value: 'female' },
				],
			},
			group: 'details',
		}),
		defineField({
			name: 'estimatedAge',
			title: 'Estimated Age',
			type: 'string',
			group: 'details',
		}),
		defineField({
			name: 'ageGroup',
			title: 'Age Group',
			type: 'reference',
			to: [{ type: 'age-group' }],
			group: 'details',
		}),
		defineField({
			name: 'weight',
			title: 'Weight',
			type: 'string',
			group: 'details',
		}),
		defineField({
			name: 'declawed',
			title: 'Declawed',
			type: 'string',
			options: {
				list: [
					{ title: 'No', value: 'no' },
					{ title: 'Yes: Front Paws', value: 'front' },
					{ title: 'Yes: Back Paws', value: 'back' },
					{ title: 'Yes: Front and Back Paws', value: 'both' },
				],
			},
			group: 'details',
		}),
		defineField({
			name: 'hair',
			title: 'Hair',
			type: 'object',
			group: 'details',
			fields: [
				defineField({
					name: 'primaryColor',
					title: 'Primary Color',
					type: 'reference',
					to: [{ type: 'hair-color' }],
				}),
				defineField({
					name: 'secondaryColor',
					title: 'Secondary Color',
					type: 'reference',
					to: [{ type: 'hair-color' }],
				}),
				defineField({
					name: 'length',
					title: 'Length',
					type: 'reference',
					to: [{ type: 'hair-length' }],
				}),
			],
		}),
		defineField({
			name: 'type',
			title: 'Type',
			type: 'reference',
			to: [{ type: 'cat-type' }],
			group: 'details',
		}),
		defineField({
			name: 'otherCats',
			title: 'Other Cats',
			type: 'string',
			options: {
				list: [
					{ title: 'Bonded', value: 'bonded' },
					{ title: 'Cannot be only cat', value: 'cannot_be_only' },
					{ title: 'Must be only cat', value: 'must_be_only' },
					{ title: 'Best as only cat', value: 'best_as_only' },
				],
			},
			group: 'details',
		}),
		defineField({
			name: 'bondedCats',
			title: 'Bonded Cats',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'cat' }] }],
			description: 'Select other cats this cat is bonded with (only shown when "Other Cats" is set to "Bonded")',
			group: 'details',
			hidden: ({ document }) => document?.otherCats !== 'bonded',
		}),
		defineField({
			name: 'goodWithDogs',
			title: 'Good with Dogs',
			type: 'string',
			options: {
				list: [
					{ title: 'Yes', value: 'yes' },
					{ title: 'No', value: 'no' },
				],
			},
			group: 'details',
		}),
		defineField({
			name: 'fee',
			title: 'Fee',
			type: 'string',
			group: 'details',
		}),
		defineField({
			name: 'link',
			title: 'Link',
			type: 'url',
			group: 'content',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'gallery',
			title: 'Image Gallery',
			type: 'array',
			of: [{ type: 'image' }],
			group: 'content',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'metadata',
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
			title: 'name',
			ageGroup: 'ageGroup.title',
			type: 'type.title',
			language: 'language',
			isAvailable: 'isAvailable',
			slug: 'metadata.slug.current',
		},
		prepare: ({ title, ageGroup, type, language, isAvailable, slug }) => ({
			title: `${title}${isAvailable === false ? ' (Not Available)' : ''}`,
			subtitle: [ageGroup, type, language && `[${language}]`, slug && `/${slug}`]
				.filter(Boolean)
				.join(' • '),
		}),
	},
	orderings: [
		{
			title: 'Name',
			name: 'name',
			by: [{ field: 'name', direction: 'asc' }],
		},
		{
			title: 'Age Group',
			name: 'ageGroup',
			by: [{ field: 'ageGroup.title', direction: 'asc' }],
		},
		{
			title: 'Available First',
			name: 'availableFirst',
			by: [
				{ field: 'isAvailable', direction: 'desc' },
				{ field: 'name', direction: 'asc' },
			],
		},
	],
}) 