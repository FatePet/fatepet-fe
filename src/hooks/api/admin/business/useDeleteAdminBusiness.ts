'use client';

import { deleteAdminBusiness } from '@/api/admin/business/deleteAdminBusiness';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
		onSuccess: (data: IResponseType) => {
			alert(data.message);
			['ADMIN_BUSINESS_LIST', 'USER_BUSINESS_LIST'].forEach((key) =>
				queryClient.invalidateQueries({
					queryKey: [`${key}`],
				}),
			);
			router.back();
		},
		onError: (error) => {
			alert(error.message);
		},
	});
};
