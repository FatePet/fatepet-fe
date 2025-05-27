import { apiRoutes } from "@/_lib/apiRoutes"
import api from "@/_lib/fetcher"

export const getUserBusiness = async (
    sort: string,
    page: number,
    size: number,
    latitude: number | null,
    longitude: number | null,
) => {
    const sortOption: string = (() => {
        switch (sort) {
            case '인기순':
                return 'POPULAR';
            case '추천순':
                return 'RECOMMEND';
            default:
                return 'DISTANCE';
        }
    })();

    if (sortOption === 'DISTANCE') {
        if (!(latitude && longitude)) {
            latitude = 0;
            longitude = 0;
        }
        
        const queryParams = new URLSearchParams({
            sort: sortOption,
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
            sort: sortOption,
            page: page.toString(),
            size: size.toString(),
        }).toString();

        const response: IGetBusinessListResponseType = await api.get({
            endpoint: `${apiRoutes.business}?${queryParams}`
        });

        return response;
    }
};