'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

export default function AdminPage() {
	const router = useRouter();
	const { accessToken } = useAuthStore();

	useEffect(() => {
		if (accessToken) {
			router.replace('/admin/main');
		} else {
			router.replace('/admin/login');
		}
	}, [accessToken, router]);

	return null;
}
