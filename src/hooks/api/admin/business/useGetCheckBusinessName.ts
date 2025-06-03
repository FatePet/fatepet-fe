import { getCheckBusinessName } from '@/api/admin/business/getCheckBusinessName';
import { useQuery } from '@tanstack/react-query';

export const useGetCheckBusinessName = (
	token: string,
	businessName: string,
	setAccessToken: (accessToken: string) => void,
	enabled?: boolean,
) => {
	return useQuery({
		queryKey: ['CHECK_BUSINESS_NAME', businessName],
		queryFn: () => getCheckBusinessName(token, businessName, setAccessToken),
		enabled: enabled,
	});
};
