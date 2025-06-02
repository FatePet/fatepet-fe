'use client';

import { patchEditBusiness } from '@/api/admin/business/patchEditBusiness';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const usePatchEditBusiness = (
	authorization: string,
	businessId: string,
	setAccessToken: (accessToken: string) => void,
) => {
	// const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (body: IPatchBusinessRequestType) =>
			patchEditBusiness(body, authorization, businessId, setAccessToken),
		onMutate: () => {
			toast.loading('처리 중...', { id: 'editBusinessLoading' });
		},
		onSuccess: () => {
			toast.dismiss('editBusinessLoading');
			toast.success('업체 수정 완료!');
			router.back();
		},
		onError: () => {
			toast.dismiss('editBusinessLoading');
			toast.error('업체 수정에 실패했습니다.');
		},
	});
};
