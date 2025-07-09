import { PortableText } from 'next-sanity'
import { Img } from '@/ui/Img'
import CTAList from '@/ui/CTAList'
import Link from 'next/link'

export default function CatModule({
	title,
	intro,
	cat,
	showGallery = true,
	showDetails = true,
	showDescription = true,
	ctas,
}: Sanity.CatModule) {
	if (!cat) return null

	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						{title && (
							<h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
						)}
						{intro && (
							<div className="prose prose-lg mx-auto text-gray-600">
								<PortableText value={intro} />
							</div>
						)}
					</div>

					{/* Cat Information */}
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						{/* Main Cat Info */}
						<div className="p-8">
							<div className="flex flex-col lg:flex-row gap-8">
								{/* Cat Image */}
								{cat.gallery && cat.gallery.length > 0 && showGallery && (
									<div className="lg:w-1/3">
										<div className="aspect-square rounded-lg overflow-hidden">
											<Img
												image={cat.gallery[0]}
												alt={cat.name}
												className="w-full h-full object-cover"
											/>
										</div>
										
										{/* Image Gallery */}
										{cat.gallery.length > 1 && (
											<div className="mt-4 grid grid-cols-4 gap-2">
												{cat.gallery.slice(1, 5).map((image, index) => (
													<div key={index} className="aspect-square rounded overflow-hidden">
														<Img
															image={image}
															alt={`${cat.name} - Image ${index + 2}`}
															className="w-full h-full object-cover"
														/>
													</div>
												))}
											</div>
										)}
									</div>
								)}

								{/* Cat Details */}
								<div className="lg:w-2/3">
									<div className="flex items-start justify-between mb-4">
										<h2 className="text-3xl font-bold text-gray-900">{cat.name}</h2>
										{!cat.isAvailable && (
											<span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
												Not Available
											</span>
										)}
									</div>

									{/* Basic Info */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
										{cat.gender && (
											<div>
												<span className="text-gray-500 text-sm">Gender:</span>
												<p className="font-medium capitalize">{cat.gender}</p>
											</div>
										)}
										{cat.estimatedAge && (
											<div>
												<span className="text-gray-500 text-sm">Age:</span>
												<p className="font-medium">{cat.estimatedAge}</p>
											</div>
										)}
										{cat.ageGroup && (
											<div>
												<span className="text-gray-500 text-sm">Age Group:</span>
												<p className="font-medium">{cat.ageGroup.title}</p>
											</div>
										)}
										{cat.weight && (
											<div>
												<span className="text-gray-500 text-sm">Weight:</span>
												<p className="font-medium">{cat.weight}</p>
											</div>
										)}
										{cat.type && (
											<div>
												<span className="text-gray-500 text-sm">Type:</span>
												<p className="font-medium">{cat.type.title}</p>
											</div>
										)}
										{cat.fee && (
											<div>
												<span className="text-gray-500 text-sm">Adoption Fee:</span>
												<p className="font-medium">{cat.fee}</p>
											</div>
										)}
									</div>

									{/* Description */}
									{cat.description && showDescription && (
										<div className="mb-6">
											<h3 className="text-lg font-semibold text-gray-900 mb-2">About {cat.name}</h3>
											<div className="prose prose-gray max-w-none">
												<PortableText value={cat.description} />
											</div>
										</div>
									)}

									{/* CTAs */}
									{ctas && ctas.length > 0 && (
										<div className="mb-6">
											<CTAList ctas={ctas} />
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Detailed Information */}
						{showDetails && (
							<div className="border-t border-gray-200 p-8 bg-gray-50">
								<h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Information</h3>
								
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{/* Hair Information */}
									{cat.hair && (
										<div className="bg-white p-4 rounded-lg">
											<h4 className="font-medium text-gray-900 mb-3">Appearance</h4>
											<div className="space-y-2 text-sm">
												{cat.hair.primaryColor && (
													<div>
														<span className="text-gray-500">Primary Color:</span>
														<p className="font-medium">{cat.hair.primaryColor.title}</p>
													</div>
												)}
												{cat.hair.secondaryColor && (
													<div>
														<span className="text-gray-500">Secondary Color:</span>
														<p className="font-medium">{cat.hair.secondaryColor.title}</p>
													</div>
												)}
												{cat.hair.length && (
													<div>
														<span className="text-gray-500">Hair Length:</span>
														<p className="font-medium">{cat.hair.length.title}</p>
													</div>
												)}
											</div>
										</div>
									)}

									{/* Behavior Information */}
									<div className="bg-white p-4 rounded-lg">
										<h4 className="font-medium text-gray-900 mb-3">Behavior</h4>
										<div className="space-y-2 text-sm">
											{cat.otherCats && (
												<div>
													<span className="text-gray-500">With Other Cats:</span>
													<p className="font-medium">
														{cat.otherCats === 'bonded' && 'Bonded'}
														{cat.otherCats === 'cannot_be_only' && 'Cannot be only cat'}
														{cat.otherCats === 'must_be_only' && 'Must be only cat'}
														{cat.otherCats === 'best_as_only' && 'Best as only cat'}
													</p>
												</div>
											)}
											{cat.goodWithDogs && (
												<div>
													<span className="text-gray-500">Good with Dogs:</span>
													<p className="font-medium capitalize">{cat.goodWithDogs}</p>
												</div>
											)}
											{cat.declawed && cat.declawed !== 'no' && (
												<div>
													<span className="text-gray-500">Declawed:</span>
													<p className="font-medium">
														{cat.declawed === 'front' && 'Front paws'}
														{cat.declawed === 'back' && 'Back paws'}
														{cat.declawed === 'both' && 'Front and back paws'}
													</p>
												</div>
											)}
										</div>
									</div>

									{/* Bonded Cats */}
									{cat.otherCats === 'bonded' && cat.bondedCats && cat.bondedCats.length > 0 && (
										<div className="bg-white p-4 rounded-lg">
											<h4 className="font-medium text-gray-900 mb-3">Bonded With</h4>
											<div className="space-y-2">
												{cat.bondedCats.map((bondedCat) => (
													<Link
														key={bondedCat._id}
														href={`/cat/${bondedCat.metadata?.slug?.current}`}
														className="block text-blue-600 hover:text-blue-800 text-sm font-medium"
													>
														{bondedCat.name}
													</Link>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
} 