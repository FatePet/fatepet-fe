'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { accessToken, isHydrated } = useAuthStore();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!isHydrated) return;

		const isProtectedAdminPage =
			pathname.startsWith('/admin') && pathname !== '/admin/login';

		if (!accessToken && isProtectedAdminPage) {
			router.replace('/admin/login');
		}
	}, [accessToken, pathname, router, isHydrated]);

	if (!isHydrated) {
		return null;
	}

	return <>{children}</>;
}
