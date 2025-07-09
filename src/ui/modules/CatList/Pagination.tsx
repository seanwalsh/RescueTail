'use client'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	const getPageNumbers = () => {
		const pages = []
		const maxVisiblePages = 5
		
		if (totalPages <= maxVisiblePages) {
			// Show all pages if total is small
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			// Show pages around current page
			let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
			let end = Math.min(totalPages, start + maxVisiblePages - 1)
			
			// Adjust start if we're near the end
			if (end === totalPages) {
				start = Math.max(1, end - maxVisiblePages + 1)
			}
			
			for (let i = start; i <= end; i++) {
				pages.push(i)
			}
		}
		
		return pages
	}

	const pageNumbers = getPageNumbers()

	return (
		<div className="flex items-center justify-center gap-2">
			{/* Previous Button */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Previous
			</button>

			{/* Page Numbers */}
			{pageNumbers.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-3 py-2 text-sm font-medium rounded-md ${
						page === currentPage
							? 'bg-blue-600 text-white'
							: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
					}`}
				>
					{page}
				</button>
			))}

			{/* Next Button */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Next
			</button>
		</div>
	)
} 