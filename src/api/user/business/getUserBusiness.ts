import { apiRoutes } from "@/_lib/apiRoutes"
import api from "@/_lib/fetcher"

export const getUserBusiness = async (
    sortType: string,
    page: number,
    size: number,
    latitude: number | null,
    longitude: number | null,
) => {
    const sortOption = () => {
        switch (sortType) {
            case '인기순':
                return 'POPULAR';
            case '추천순':
                return 'RECOMMEND';
            default:
                return 'DISTANCE';
        }
    }

    if (sortType === 'DISTANCE' && latitude && longitude) {
        const queryParams = new URLSearchParams({
            sortType: sortOption().toString(),
            page: page.toString(),
            size: size.toString(),
            latitude: latitude.toString(),
            longitude: longitude.toString(),
        }).toString();

        const response: IGetBusinessListResponseType = await api.get({
            endpoint: `${apiRoutes.business}?${queryParams}`,
        });

        return response;
    } else {
        const queryParams = new URLSearchParams({
            sortType: sortOption().toString(),
            page: page.toString(),
            size: size.toString(),
        }).toString();

        const response: IGetBusinessListResponseType = await api.get({
            endpoint: `${apiRoutes.business}?${queryParams}`
        });

        return response;
    }
};