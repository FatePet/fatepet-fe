'use client'

import { postCreateBusiness } from '@/api/admin/business/postCreateBusiness';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const usePostCreateBusiness = (
	token: string,
	setAccessToken: (accessToken: string) => void,
) => {
	const router = useRouter();
	return useMutation({
		mutationFn: (body: IPostCreateBusinessRequestType) =>
			postCreateBusiness(body, token, setAccessToken),
		onMutate: () => {
			toast.loading("처리 중...", {id: "createBusinessLoading"})
		},
		onSuccess: () => {
			toast.dismiss('createBusinessLoading');
			toast.success('업체 등록 완료!');
			router.push('/admin/main');
		},
		onError: () => {
			toast.dismiss('createBusinessLoading');
			toast.error('업체 등록에 실패했습니다.');
		},
	});
};
