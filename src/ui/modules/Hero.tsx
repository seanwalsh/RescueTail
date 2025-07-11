import moduleProps from '@/lib/moduleProps'
import { ResponsiveImg } from '@/ui/Img'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'

export default function Hero({
	pretitle,
	content,
	ctas,
	assets,
	textAlign = 'center',
	alignItems,
	overlayOpacity = 0.6,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Sanity.Img[]
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
	overlayOpacity: number
}> &
	Sanity.Module) {
	const hasImage = !!assets?.[0]
	const asset = assets?.[0]

	return (
		<section
			className={cn(
				'relative', // Ensure overlay and image are scoped to section
				hasImage &&
					'bg-ink text-canvas grid overflow-hidden *:col-span-full *:row-span-full',
			)}
			{...moduleProps(props)}
		>
			{hasImage && (
				<>
					<ResponsiveImg
						img={asset}
						className="max-h-fold z-0 size-full object-cover" // Ensure image is at z-0
						width={2400}
						draggable={false}
					/>
					{/* Overlay for accessibility */}
					<div
						aria-hidden="true"
						className="absolute inset-0 z-[1] bg-black"
						style={{ opacity: overlayOpacity }}
					/>
				</>
			)}

			{content && (
				<div className="section relative z-10 flex w-full flex-col text-balance">
					<div
						className={cn(
							'richtext headings:text-balance relative isolate max-w-xl',
							hasImage && 'text-shadow',
							{
								'mb-8': stegaClean(alignItems) === 'start',
								'my-auto': stegaClean(alignItems) === 'center',
								'mt-auto': stegaClean(alignItems) === 'end',
							},
							{
								'me-auto': ['left', 'start'].includes(stegaClean(textAlign)),
								'mx-auto': stegaClean(textAlign) === 'center',
								'ms-auto': ['right', 'end'].includes(stegaClean(textAlign)),
							},
						)}
						style={{ textAlign: stegaClean(textAlign) }}
					>
						<Pretitle className={cn(hasImage && 'text-canvas/70')}>
							{pretitle}
						</Pretitle>

						<PortableText
							value={content}
							components={{
								types: {
									'custom-html': ({ value }) => <CustomHTML {...value} />,
									'reputation-block': ({ value }) => (
										<Reputation
											className={cn(
												'!mt-4',
												hasImage && '[&_strong]:text-amber-400',
												{
													'justify-start': ['left', 'start'].includes(
														stegaClean(textAlign),
													),
													'justify-center': stegaClean(textAlign) === 'center',
													'justify-end': ['right', 'end'].includes(
														stegaClean(textAlign),
													),
												},
											)}
											reputation={value.reputation}
										/>
									),
								},
							}}
						/>

						<CTAList
							ctas={ctas}
							className={cn('!mt-4', {
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							})}
						/>
					</div>
				</div>
			)}
		</section>
	)
}
