'use client'

interface FilterControlsProps {
	filters: {
		gender: string
		type: string
		ageGroup: string
	}
	setFilters: (filters: {
		gender: string
		type: string
		ageGroup: string
	}) => void
	options: {
		genders: string[]
		types: string[]
		ageGroups: string[]
	}
	totalCats: number
}

export default function FilterControls({
	filters,
	setFilters,
	options,
	totalCats,
}: FilterControlsProps) {
	const handleFilterChange = (key: keyof typeof filters, value: string) => {
		setFilters({
			...filters,
			[key]: value,
		})
	}

	const clearAllFilters = () => {
		setFilters({
			gender: '',
			type: '',
			ageGroup: '',
		})
	}

	const hasActiveFilters = filters.gender || filters.type || filters.ageGroup

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
				<h3 className="text-lg font-semibold text-gray-900">Filter Cats</h3>
				<div className="flex items-center gap-4">
					<span className="text-sm text-gray-600">
						{totalCats} cat{totalCats !== 1 ? 's' : ''} found
					</span>
					{hasActiveFilters && (
						<button
							onClick={clearAllFilters}
							className="text-sm text-blue-600 hover:text-blue-800 underline"
						>
							Clear all filters
						</button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Gender Filter */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Gender
					</label>
					<div className="space-y-2">
						<label className="flex items-center">
							<input
								type="radio"
								name="gender"
								value=""
								checked={filters.gender === ''}
								onChange={(e) => handleFilterChange('gender', e.target.value)}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span className="ml-2 text-sm text-gray-700">All</span>
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="gender"
								value="male"
								checked={filters.gender === 'male'}
								onChange={(e) => handleFilterChange('gender', e.target.value)}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span className="ml-2 text-sm text-gray-700">Male</span>
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="gender"
								value="female"
								checked={filters.gender === 'female'}
								onChange={(e) => handleFilterChange('gender', e.target.value)}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span className="ml-2 text-sm text-gray-700">Female</span>
						</label>
					</div>
				</div>

				{/* Breed Filter */}
				<div>
					<label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
						Breed
					</label>
					<select
						id="type-filter"
						value={filters.type}
						onChange={(e) => handleFilterChange('type', e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="">All Breeds</option>
						{options.types.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>

				{/* Age Group Filter */}
				<div>
					<label htmlFor="age-group-filter" className="block text-sm font-medium text-gray-700 mb-2">
						Age Group
					</label>
					<select
						id="age-group-filter"
						value={filters.ageGroup}
						onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="">All Ages</option>
						{options.ageGroups.map((ageGroup) => (
							<option key={ageGroup} value={ageGroup}>
								{ageGroup}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	)
} 