import { ABeeZee, Roboto } from 'next/font/google'

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
		<html lang="en" className={`${abeezee.variable} ${roboto.variable}`}>
			<body>{children}</body>
		</html>
	)
}
