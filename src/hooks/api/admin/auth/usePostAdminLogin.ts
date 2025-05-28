'use client';
import { postAdminLogin } from '@/api/admin/auth/postAdminLogin';
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const usePostAdminLogin = () => {
	const { setAccessToken } = useAuthStore();
	const router = useRouter();

	return useMutation({
		mutationFn: (body: IPostLoginRequestType) => postAdminLogin(body),
		onMutate: () => {
			toast.loading('로딩 중...', { id: 'adminLoginLoading' });
		},
		onSuccess: (accessToken: string) => {
			toast.dismiss('adminLoginLoading');
			setAccessToken(accessToken);
			router.push('/admin/main');
		},
		onError: (error) => {
			toast.dismiss('adminLoginLoading');
			toast.error(error.message);
		},
	});
};
