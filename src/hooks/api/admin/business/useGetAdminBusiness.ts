'use client';

import { getAdminBusiness } from '@/api/admin/business/getAdminBusiness';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminBusiness = (
	authorization: string,
	setAccessToken: (accessToken: string) => void,
) => {
	return useQuery({
		queryKey: ['ADMIN_BUSINESS_LIST'],
		queryFn: () => getAdminBusiness(authorization, setAccessToken),
	});
};
