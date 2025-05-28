'use client';
import { getUserBusinessDetail } from '@/api/user/business/getUserBusinessDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetUserBusinessDetail = (
	businessId: string,
) => {
	return useQuery({
		queryKey: ['BUSINESS_DETAIL', businessId],
		queryFn: () => getUserBusinessDetail(businessId),
	});
};
