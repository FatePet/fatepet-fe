'use client';

import { getUserBusiness } from '@/api/user/business/getUserBusiness';
import { useQuery } from '@tanstack/react-query';

export const useGetUserBusiness = (
	sort: string,
	page: number,
	size: number,
	latitude: number | null,
	longitude: number | null,
) => {
	const sortOption: string = (() => {
		switch (sort) {
			case '거리순':
				return 'DISTANCE';
			case '추천순':
				return 'RECOMMEND';
			default:
				return 'POPULAR';
		}
	})();

	return useQuery({
		queryKey: ['USER_BUSINESS_LIST', sortOption],
		queryFn: () => getUserBusiness(sortOption, page, size, latitude, longitude),
	});
};
