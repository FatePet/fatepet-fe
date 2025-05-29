import type { Metadata } from 'next';
import './styles/globals.css';
import RQProvider from '@/components/RQProvider';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

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
						<div className='root_container'>
							<Toaster
								position='top-center'
								toastOptions={{
									duration: 3000,
									style: { fontSize: '15px' },
									success: {
										style: {
											background: '#4BB543',
											color: 'white',
										},
									},
									error: {
										style: {
											background: '#FF4C4C',
											color: 'white',
										},
									},
									loading: {
										style: {
											fontSize: '13px',
											background: '#333',
											color: '#fff',
											borderRadius: '8px',
											padding: '12px 16px',
										},
										iconTheme: {
											primary: '#fff',
											secondary: '#888',
										},
									},
								}}
							/>
							{children}
						</div>
						<Script src={API} strategy='afterInteractive' />
					</Suspense>
				</RQProvider>
			</body>
		</html>
	);
}
