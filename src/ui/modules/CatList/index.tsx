'use client'

import { useState, useMemo, useEffect } from 'react'
import { PortableText } from 'next-sanity'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import CatCard from './CatCard'
import FilterControls from './FilterControls'
import Pagination from './Pagination'
import { cn } from '@/lib/utils'

export default function CatList({
	title,
	intro,
	itemsPerPage = 12,
	showFilters = true,
	showPagination = true,
	ctas,
}: Sanity.CatList) {
	const [cats, setCats] = useState<Sanity.Cat[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [filters, setFilters] = useState({
		gender: '',
		type: '',
		ageGroup: '',
	})

	const [currentPage, setCurrentPage] = useState(1)

	// Fetch all cats
	useEffect(() => {
		const fetchCats = async () => {
			try {
				const data = await fetchSanityLive<Sanity.Cat[]>({
					query: groq`*[
						_type == 'cat' &&
						isAvailable == true
					]|order(name asc){
						_id,
						name,
						gender,
						estimatedAge,
						ageGroup->{ title },
						type->{ title },
						weight,
						fee,
						gallery[],
						metadata { slug }
					}`,
				})
				setCats(data || [])
			} catch (error) {
				console.error('Error fetching cats:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCats()
	}, [])

	// Filter cats based on selected filters
	const filteredCats = useMemo(() => {
		return cats.filter((cat: Sanity.Cat) => {
			if (filters.gender && cat.gender !== filters.gender) return false
			if (filters.type && cat.type?.title !== filters.type) return false
			if (filters.ageGroup && cat.ageGroup?.title !== filters.ageGroup)
				return false
			return true
		})
	}, [cats, filters])

	// Get unique filter options
	const filterOptions = useMemo(() => {
		const genders = [
			...new Set(cats.map((cat: Sanity.Cat) => cat.gender).filter(Boolean)),
		] as string[]
		const types = [
			...new Set(
				cats.map((cat: Sanity.Cat) => cat.type?.title).filter(Boolean),
			),
		] as string[]
		const ageGroups = [
			...new Set(
				cats.map((cat: Sanity.Cat) => cat.ageGroup?.title).filter(Boolean),
			),
		] as string[]

		return { genders, types, ageGroups }
	}, [cats])

	// Paginate filtered cats
	const totalPages = Math.ceil(filteredCats.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const paginatedCats = filteredCats.slice(startIndex, endIndex)

	// Reset to first page when filters change
	useMemo(() => {
		setCurrentPage(1)
	}, [filters])

	return (
		<section className="bg-gray-50 py-16">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-7xl">
					{/* Header */}
					<div className="mb-12 text-center">
						{title && (
							<h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
						)}
						{intro && (
							<div className="mx-auto mb-6">
								<PortableText
									value={intro}
									components={{
										block: {
											// Only render paragraphs, no headlines
											normal: ({ children }) => (
												<p className="prose-lg mx-auto mb-6 text-balance text-gray-600">
													{children}
												</p>
											),
										},
									}}
								/>
							</div>
						)}
						{ctas && ctas.length > 0 && (
							<div className="mb-6 flex justify-center">
								<CTAList ctas={ctas} />
							</div>
						)}
					</div>

					{/* Filters */}
					{showFilters && (
						<div className="mb-8">
							<FilterControls
								filters={filters}
								setFilters={setFilters}
								options={filterOptions}
								totalCats={filteredCats.length}
							/>
						</div>
					)}

					{/* Loading State */}
					{isLoading && (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{Array.from({ length: itemsPerPage }).map((_, i) => (
								<div
									key={i}
									className="animate-pulse overflow-hidden rounded-lg bg-white shadow-md"
								>
									<div className="aspect-square bg-gray-200" />
									<div className="space-y-2 p-4">
										<div className="h-4 w-3/4 rounded bg-gray-200" />
										<div className="h-3 w-1/2 rounded bg-gray-200" />
									</div>
								</div>
							))}
						</div>
					)}

					{/* Cat Grid */}
					{!isLoading && (
						<>
							{paginatedCats.length > 0 ? (
								<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{paginatedCats.map((cat: Sanity.Cat) => (
										<CatCard key={cat._id} cat={cat} />
									))}
								</div>
							) : (
								<div className="py-12 text-center">
									<p className="text-lg text-gray-500">
										No cats found matching your criteria.
									</p>
								</div>
							)}

							{/* Pagination */}
							{showPagination && totalPages > 1 && (
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={setCurrentPage}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</section>
	)
}
