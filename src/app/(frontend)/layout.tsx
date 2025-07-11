// import { GoogleTagManager } from '@next/third-parties/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import VisualEditingControls from '@/ui/VisualEditingControls'
import { ABeeZee, Roboto } from 'next/font/google'
import '@/styles/app.css'

const abeezee = ABeeZee({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-abeezee',
	display: 'swap',
})

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-roboto',
	display: 'swap',
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{/* <GoogleTagManager gtmId="" /> */}
			<NuqsAdapter>
				<SkipToContent />
				<Announcement />
				<Header />
				<main id="main-content" role="main" tabIndex={-1}>
					{children}
				</main>
				<Footer />
				<VisualEditingControls />
			</NuqsAdapter>
		</>
	)
}
