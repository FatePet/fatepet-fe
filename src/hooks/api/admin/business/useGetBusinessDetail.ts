'use client';
import { getBusinessDetail } from '@/api/admin/business/getBusinessDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetBusinessDetail = (data: IGetBusinessDetailRequestType) => {
	return useQuery({
		queryKey: ['BUSINESS_DETAIL', data.businessId],
		queryFn: () => getBusinessDetail(data),
	});
};
