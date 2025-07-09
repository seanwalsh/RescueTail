import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import {
	MODULES_QUERY,
	GLOBAL_MODULE_PATH_QUERY,
	TRANSLATIONS_QUERY,
} from '@/sanity/lib/queries'
import { languages } from '@/lib/i18n'
import errors from '@/lib/errors'

export default async function Page({ params }: Props) {
	const data = await getPage(await params)
	if (!data) notFound()
	
	// Handle cat pages by creating a cat module
	if (data._type === 'cat') {
		const catModule: Sanity.CatModule = {
			_type: 'cat',
			_key: 'cat-detail',
			cat: data,
			showGallery: true,
			showDetails: true,
			showDescription: true,
		}
		return <Modules modules={[catModule]} />
	}
	
	return <Modules modules={data.modules} page={data} />
}

export async function generateMetadata({ params }: Props) {
	const data = await getPage(await params)
	if (!data) notFound()
	return processMetadata(data)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<{ slug: string }[]>(
		groq`*[
			_type == 'page' &&
			defined(metadata.slug.current) &&
			!(metadata.slug.current in ['index'])
		]{
			'slug': metadata.slug.current
		}`,
	)

	const catSlugs = await client.fetch<{ slug: string }[]>(
		groq`*[
			_type == 'cat' &&
			defined(metadata.slug.current)
		]{
			'slug': 'cat/' + metadata.slug.current
		}`,
	)

	return [...slugs, ...catSlugs].map(({ slug }) => ({ slug: slug.split('/') }))
}

async function getPage(params: Params): Promise<Sanity.Page | Sanity.Cat | undefined> {
	const { slug, lang } = processSlug(params)

	// Check if this is a cat route (starts with 'cat/')
	if (slug.startsWith('cat/')) {
		const catSlug = slug.replace('cat/', '')
		const cat = await fetchSanityLive<Sanity.Cat>({
			query: groq`*[
				_type == 'cat' &&
				metadata.slug.current == $catSlug
				${lang ? `&& language == '${lang}'` : ''}
			][0]{
				...,
				ageGroup->{ title },
				type->{ title },
				hair {
					primaryColor->{ title },
					secondaryColor->{ title },
					length->{ title }
				},
				bondedCats[]->{
					_id,
					name,
					metadata { slug }
				},
				metadata {
					...,
					'ogimage': image.asset->url + '?w=1200'
				},
			}`,
			params: { catSlug },
		})

		if (cat) {
			return cat
		}
	}

	const page = await fetchSanityLive<Sanity.Page>({
		query: groq`*[
			_type == 'page' &&
			metadata.slug.current == $slug
			${lang ? `&& language == '${lang}'` : ''}
		][0]{
			...,
			'modules': (
				// global modules (before)
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				// path modules (before)
				+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].before[]{ ${MODULES_QUERY} }
				// page modules
				+ modules[]{ ${MODULES_QUERY} }
				// path modules (after)
				+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].after[]{ ${MODULES_QUERY} }
				// global modules (after)
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			),
			parent[]->{ metadata { slug } },
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			},
			${TRANSLATIONS_QUERY},
		}`,
		params: { slug },
	})

	if (slug === 'index' && !page) throw new Error(errors.missingHomepage)

	return page
}

type Params = { slug?: string[] }

type Props = {
	params: Promise<Params>
}

function processSlug(params: Params) {
	const lang =
		params.slug && languages.includes(params.slug[0])
			? params.slug[0]
			: undefined

	if (params.slug === undefined)
		return {
			slug: 'index',
			lang,
		}

	const slug = params.slug.join('/')

	if (lang) {
		const processed = slug.replace(new RegExp(`^${lang}/?`), '')

		return {
			slug: processed === '' ? 'index' : processed,
			lang,
		}
	}

	return { slug }
}
