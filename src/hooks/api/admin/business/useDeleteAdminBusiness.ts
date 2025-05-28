'use client';

import { deleteAdminBusiness } from '@/api/admin/business/deleteAdminBusiness';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useDeleteAdminBusiness = (
	authorization: string,
	businessId: string,
	setAccessToken: (accessToken: string) => void,
) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: () =>
			deleteAdminBusiness(authorization, businessId, setAccessToken),
		onMutate: () => {
			toast.loading('처리 중...', { id: 'deleteAdminBusinessLoading' });
		},
		onSuccess: (data: IResponseType) => {
			toast.dismiss('deleteAdminBusinessLoading');
			toast.success(data.message);
			['ADMIN_BUSINESS_LIST', 'USER_BUSINESS_LIST'].forEach((key) =>
				queryClient.invalidateQueries({
					queryKey: [`${key}`],
				}),
			);
			router.back();
		},
		onError: (error) => {
			toast.dismiss('deleteAdminBusinessLoading');
			toast.error(error.message);
		},
	});
};
