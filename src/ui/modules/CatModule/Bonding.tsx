import { Img } from '@/ui/Img'
import Link from 'next/link'
import { PortableText } from 'next-sanity'

interface BondingProps {
	bonding: Sanity.Bonding
	currentCatId: string
}

export default function Bonding({ bonding, currentCatId }: BondingProps) {
	// Filter out the current cat from the bonding
	const otherCats = bonding.cats.filter(cat => cat._id !== currentCatId)
	
	if (otherCats.length === 0) return null

	return (
		<div className="bg-white p-4 rounded-lg">
			<h4 className="font-medium text-gray-900 mb-3">{bonding.title}</h4>
			{bonding.description && (
				<div className="prose prose-sm text-gray-600 mb-4">
					<PortableText value={bonding.description} />
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{otherCats.map((cat) => (
					<Link
						key={cat._id}
						href={`/cat/${cat.metadata?.slug?.current}`}
						className="block group hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden border border-gray-200"
					>
						<div className="aspect-square">
							{cat.gallery && cat.gallery.length > 0 ? (
								<Img
									image={cat.gallery[0]}
									alt={cat.name}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
								/>
							) : (
								<div className="w-full h-full bg-gray-200 flex items-center justify-center">
									<span className="text-gray-500 text-sm">No image</span>
								</div>
							)}
						</div>
						<div className="p-3">
							<h5 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
								{cat.name}
							</h5>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
} 