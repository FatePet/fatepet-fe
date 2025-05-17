import type { Metadata } from 'next';
import './styles/globals.css';
import RQProvider from '@/components/RQProvider';
import { Suspense } from 'react';
import localFont from 'next/font/local';

const pretendard = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
});

export const metadata: Metadata = {
	title: 'FatePet',
	description: '장묘 주선 서비스',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<body className='vsc-initialized'>
				<RQProvider>
					<Suspense>
						<div className='root_container'>{children}</div>
					</Suspense>
				</RQProvider>
			</body>
		</html>
	);
}
