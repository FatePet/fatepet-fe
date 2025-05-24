import { getCheckBusinessName } from '@/api/admin/business/getCheckBusinessName';
import { useQuery } from '@tanstack/react-query';

export const useGetCheckBusinessName = (
	token: string,
	businessName: string,
	enabled?: boolean,
) => {
	return useQuery({
		queryKey: ['CHECK_BUSINESS_NAME'],
		queryFn: () => getCheckBusinessName(token, businessName),
		enabled: enabled,
	});
};
