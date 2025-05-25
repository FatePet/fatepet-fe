'use client';

import { getUserBusiness } from "@/api/user/business/getUserBusiness";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBusiness = (
    sortType: string,
    page: number, 
    size: number,
    latitude: number | null, 
    longitude: number | null,
) => {
    return useQuery({
        queryKey: ['USER_BUSINESS_LIST', sortType],
        queryFn: () => getUserBusiness(sortType, page, size, latitude, longitude),
    });
};