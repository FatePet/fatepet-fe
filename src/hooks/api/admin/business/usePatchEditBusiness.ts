'use client';

import { deleteAdminBusiness } from '@/api/admin/business/deleteAdminBusiness';
import { patchEditBusiness } from '@/api/admin/business/patchEditBusiness';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
		onSuccess: (data: IResponseType) => {
			alert(data.message);
			router.back();
		},
		onError: (error) => {
			alert(error.message);
		},
	});
};
