'use client';
import { postAdminLogin } from '@/api/admin/auth/postAdminLogin';
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostAdminLogin = () => {
	const { setAccessToken } = useAuthStore();
	const router = useRouter();

	return useMutation({
		mutationFn: (body: IPostLoginRequestType) => postAdminLogin(body),
		onSuccess: (accessToken: string) => {
			setAccessToken(accessToken);
			router.push('/admin/main');
		},
		onError: (error) => {
			alert(error.message);
		},
	});
};
