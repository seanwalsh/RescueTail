import { PortableText } from 'next-sanity'
import { Img } from '@/ui/Img'
import CTAList from '@/ui/CTAList'
import Bonding from './CatModule/Bonding'
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
		<section className="bg-gray-50 py-16">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-4xl">
					{/* Header */}
					<div className="mb-12 text-center">
						{title && (
							<h2 className="mb-4 text-4xl font-bold text-gray-900">{title}</h2>
						)}
						{intro && (
							<div className="prose prose-lg mx-auto text-gray-600">
								<PortableText value={intro} />
							</div>
						)}
					</div>

					{/* Cat Information */}
					<div className="overflow-hidden rounded-lg bg-white shadow-lg">
						{/* Main Cat Info */}
						<div className="p-8">
							<div className="flex flex-col gap-8 lg:flex-row">
								{/* Cat Image */}
								{cat.gallery && cat.gallery.length > 0 && showGallery && (
									<div className="lg:w-1/3">
										<div className="aspect-square overflow-hidden rounded-lg">
											<Img
												image={cat.gallery[0]}
												alt={cat.name}
												className="h-full w-full object-cover"
											/>
										</div>
										{/* Image Gallery */}
										{cat.gallery.length > 1 && (
											<div className="mt-4 grid grid-cols-4 gap-2">
												{cat.gallery.slice(1, 5).map((image, index) => (
													<div
														key={index}
														className="aspect-square overflow-hidden rounded"
													>
														<Img
															image={image}
															alt={`${cat.name} - Image ${index + 2}`}
															className="h-full w-full object-cover"
														/>
													</div>
												))}
											</div>
										)}
									</div>
								)}

								{/* Cat Details */}
								<div className="lg:w-2/3">
									<div className="mb-4 flex items-start justify-between">
										<h2 className="text-3xl font-bold text-gray-900">
											{cat.name}
										</h2>
										{!cat.isAvailable && (
											<span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
												Not Available
											</span>
										)}
									</div>

									{/* Basic Info */}
									<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
										{cat.gender && (
											<div>
												<span className="text-sm text-gray-500">Gender:</span>
												<p className="font-medium capitalize">{cat.gender}</p>
											</div>
										)}
										{cat.estimatedAge && (
											<div>
												<span className="text-sm text-gray-500">Age:</span>
												<p className="font-medium">{cat.estimatedAge}</p>
											</div>
										)}
										{cat.ageGroup && (
											<div>
												<span className="text-sm text-gray-500">
													Age Group:
												</span>
												<p className="font-medium">{cat.ageGroup.title}</p>
											</div>
										)}
										{cat.weight && (
											<div>
												<span className="text-sm text-gray-500">Weight:</span>
												<p className="font-medium">{cat.weight}</p>
											</div>
										)}
										{cat.type && (
											<div>
												<span className="text-sm text-gray-500">Type:</span>
												<p className="font-medium">{cat.type.title}</p>
											</div>
										)}
										{cat.fee && (
											<div>
												<span className="text-sm text-gray-500">
													Adoption Fee:
												</span>
												<p className="font-medium">{cat.fee}</p>
											</div>
										)}
									</div>

									{/* Description */}
									{cat.description && showDescription && (
										<div className="mb-6">
											<h3 className="mb-2 text-lg font-semibold text-gray-900">
												About {cat.name}
											</h3>
											<div className="prose prose-gray max-w-none">
												<PortableText value={cat.description} />
											</div>
										</div>
									)}

									{/* External Link */}
									{cat.link && (
										<div className="mb-6">
											<a
												href={cat.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
											>
												View Adoption Profile
												<svg
													className="-mr-1 ml-2 h-4 w-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
													/>
												</svg>
											</a>
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
							<div className="border-t border-gray-200 bg-gray-50 p-8">
								<h3 className="mb-6 text-xl font-semibold text-gray-900">
									Detailed Information
								</h3>
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
									{/* Hair Information */}
									{cat.hair && (
										<div className="rounded-lg bg-white p-4">
											<h4 className="mb-3 font-medium text-gray-900">
												Appearance
											</h4>
											<div className="space-y-2 text-sm">
												{cat.hair.primaryColor && (
													<div>
														<span className="text-gray-500">
															Primary Color:
														</span>
														<p className="font-medium">
															{cat.hair.primaryColor.title}
														</p>
													</div>
												)}
												{cat.hair.secondaryColor && (
													<div>
														<span className="text-gray-500">
															Secondary Color:
														</span>
														<p className="font-medium">
															{cat.hair.secondaryColor.title}
														</p>
													</div>
												)}
												{cat.hair.length && (
													<div>
														<span className="text-gray-500">Hair Length:</span>
														<p className="font-medium">
															{cat.hair.length.title}
														</p>
													</div>
												)}
											</div>
										</div>
									)}

									{/* Behavior Information */}
									<div className="rounded-lg bg-white p-4">
										<h4 className="mb-3 font-medium text-gray-900">Behavior</h4>
										<div className="space-y-2 text-sm">
											{cat.otherCats && (
												<div>
													<span className="text-gray-500">
														With Other Cats:
													</span>
													<p className="font-medium">
														{cat.otherCats === 'bonded' && 'Bonded'}
														{cat.otherCats === 'cannot_be_only' &&
															'Cannot be only cat'}
														{cat.otherCats === 'must_be_only' &&
															'Must be only cat'}
														{cat.otherCats === 'best_as_only' &&
															'Best as only cat'}
													</p>
												</div>
											)}
											{cat.goodWithDogs && (
												<div>
													<span className="text-gray-500">Good with Dogs:</span>
													<p className="font-medium capitalize">
														{cat.goodWithDogs}
													</p>
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
								</div>

								{/* Bondings - Full Width */}
								{cat.bondings && cat.bondings.length > 0 && (
									<div className="mt-6 space-y-6">
										{cat.bondings.map((bonding) => (
											<Bonding
												key={bonding._id}
												bonding={bonding}
												currentCatId={cat._id}
											/>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
