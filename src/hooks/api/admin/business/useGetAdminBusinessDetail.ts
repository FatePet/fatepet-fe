'use client';
import { getAdminBusinessDetail } from '@/api/admin/business/getAdminBusinessDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminBusinessDetail = (businessId: string, authorization: string) => {
	return useQuery({
		queryKey: ['BUSINESS_DETAIL', businessId],
		queryFn: () => getAdminBusinessDetail(businessId, authorization),
	});
};
