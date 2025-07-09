import Link from 'next/link'
import { Img } from '@/ui/Img'

interface CatCardProps {
	cat: Sanity.Cat
}

export default function CatCard({ cat }: CatCardProps) {
	const catSlug = cat.metadata?.slug?.current || cat.name.toLowerCase().replace(/\s+/g, '-')

	return (
		<Link
			href={`/cat/${catSlug}`}
			className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
		>
			{/* Cat Image */}
			<div className="aspect-square relative overflow-hidden">
				{cat.gallery && cat.gallery.length > 0 ? (
					<Img
						image={cat.gallery[0]}
						alt={cat.name}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
						loading="lazy"
					/>
				) : (
					<div className="w-full h-full bg-gray-200 flex items-center justify-center">
						<span className="text-gray-500 text-sm">No image</span>
					</div>
				)}
			</div>

			{/* Cat Info */}
			<div className="p-4">
				<h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
					{cat.name}
				</h3>
				
				<div className="space-y-1 text-sm text-gray-600">
					{cat.gender && (
						<p className="capitalize">
							<span className="font-medium">Gender:</span> {cat.gender}
						</p>
					)}
					{cat.estimatedAge && (
						<p>
							<span className="font-medium">Age:</span> {cat.estimatedAge}
						</p>
					)}
					{cat.ageGroup && (
						<p>
							<span className="font-medium">Age Group:</span> {cat.ageGroup.title}
						</p>
					)}
					{cat.type && (
						<p>
							<span className="font-medium">Breed:</span> {cat.type.title}
						</p>
					)}
					{cat.weight && (
						<p>
							<span className="font-medium">Weight:</span> {cat.weight}
						</p>
					)}
					{cat.fee && (
						<p className="text-green-600 font-medium">
							<span className="font-medium">Adoption Fee:</span> {cat.fee}
						</p>
					)}
				</div>
			</div>
		</Link>
	)
} 