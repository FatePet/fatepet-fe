import type { Metadata } from 'next';
import './styles/globals.css';
import RQProvider from '@/components/RQProvider';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import Script from 'next/script';

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

const API: string = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOKEY}&libraries=services,clusterer&autoload=false`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<head>
				<link rel='icon' href='/logo/fatepetLogo.svg' type='image/svg+xml' />
			</head>
			<body className='vsc-initialized'>
				<RQProvider>
					<Suspense>
						<div className='root_container'>{children}</div>
						<Script src={API} strategy='afterInteractive' />
					</Suspense>
				</RQProvider>
			</body>
		</html>
	);
}
