import resolveUrl from './resolveUrl'
import { BASE_URL, BLOG_DIR } from './env'
import type { Metadata } from 'next'
import { DEFAULT_LANG } from './i18n'

export default async function processMetadata(
	page: (Sanity.Page | Sanity.BlogPost | Sanity.Cat) & {
		translations?: {
			slug: string
			language?: string
		}[]
	},
): Promise<Metadata> {
	// Handle cat documents that might not have metadata
	if (page._type === 'cat' && !page.metadata) {
		const url = `${BASE_URL}/cat/${page.name.toLowerCase().replace(/\s+/g, '-')}`
		return {
			metadataBase: new URL(BASE_URL),
			title: page.name,
			description: `Meet ${page.name}, available for adoption.`,
			openGraph: {
				type: 'website',
				url,
				title: page.name,
				description: `Meet ${page.name}, available for adoption.`,
				images: `${BASE_URL}/api/og?title=${encodeURIComponent(page.name)}`,
			},
			alternates: {
				canonical: url,
			},
		}
	}

	const url = resolveUrl(page)
	const { title, description, ogimage, noIndex } = page.metadata!

	return {
		metadataBase: new URL(BASE_URL),
		title,
		description,
		openGraph: {
			type: 'website',
			url,
			title,
			description,
			images:
				ogimage || `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`,
		},
		alternates: {
			canonical: url,
			languages: Object.fromEntries(
				page.translations
					?.filter((t) => !!t?.language && !!t?.slug)
					?.map(({ language, slug }) => [
						language,
						[BASE_URL, language !== DEFAULT_LANG && language, slug]
							.filter(Boolean)
							.join('/'),
					]) || [],
			),
			types: {
				'application/rss+xml': `/${BLOG_DIR}/rss.xml`,
			},
		},
	}
}
