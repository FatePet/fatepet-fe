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
			case '최저가순':
				return 'LOWEST_PRICE';
			default:
				return 'POPULAR';
		}
	})();

	const queryKey =
		sortOption === 'DISTANCE'
			? ['USER_BUSINESS_LIST', sortOption, latitude, longitude]
			: ['USER_BUSINESS_LIST', sortOption];

	return useQuery({
		queryKey: ['USER_BUSINESS_LIST', queryKey],
		queryFn: () => getUserBusiness(sortOption, page, size, latitude, longitude),
	});
};
