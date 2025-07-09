import { structureTool } from 'sanity/structure'
import { singleton, group, directory } from 'sanitypress-utils'
import { VscFiles, VscServerProcess } from 'react-icons/vsc'

export const structure = structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([

				S.documentTypeListItem('page').title('All pages').icon(VscFiles),

				S.divider(),

				S.documentTypeListItem('cat').title('Cats'),
				S.documentTypeListItem('bonding').title('Bondings'),
				group(S, 'Cat Settings', [
					S.documentTypeListItem('age-group').title('Age Groups'),
					S.documentTypeListItem('cat-type').title('Breeds'),
					S.documentTypeListItem('hair-color').title('Hair Colors'),
					S.documentTypeListItem('hair-length').title('Hair Lengths'),
				]),
				S.divider(),

				S.documentTypeListItem('blog.post').title('Blog posts'),
				S.documentTypeListItem('blog.category').title('Blog categories'),
				S.divider(),

				// customize page directories
				group(S, 'Directories', [
					directory(S, 'docs', { maxLevel: 1 }).title('Docs'),
					directory(S, 'docs/modules').title('Docs › Modules'),
				]),

				S.documentTypeListItem('global-module').title('Global modules'),
				S.divider(),

				group(S, 'Settings', [
					singleton(S, 'site', 'Site settings').icon(VscServerProcess),
					S.documentTypeListItem('announcement').title('Announcements'),
					S.documentTypeListItem('logo').title('Logos'),
					S.documentTypeListItem('navigation'),
					S.documentTypeListItem('person').title('People'),
					S.documentTypeListItem('pricing').title('Pricing tiers'),
					S.documentTypeListItem('redirect').title('Redirects'),
					S.documentTypeListItem('reputation'),
					S.documentTypeListItem('testimonial').title('Testimonials'),
				]),
			]),
})
