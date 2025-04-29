import type { Metadata } from 'next';
import './styles/globals.css';
import RQProvider from '@/components/RQProvider';
import { Suspense } from 'react';

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
      <body>
        <RQProvider>
          <Suspense>
            <div className='root_container'>{children}</div>
          </Suspense>
        </RQProvider>
      </body>
    </html>
  );
}
