import { apiRoutes } from "@/_lib/apiRoutes"
import api from "@/_lib/fetcher"

export const getUserBusiness = async (sortType: string, page: number, size: number, latitude: number | null, longitude: number | null) => {
    if (sortType === 'DISTANCE' && latitude && longitude) {
        const requestParams = {
            sortType: sortType,
            page: page,
            size: size,
            latitude: latitude,
            longitude: longitude,
        };

        const queryParams = new URLSearchParams({
            sortType: requestParams.sortType,
            page: requestParams.page.toString(),
            size: requestParams.size.toString(),
            latitude: requestParams.latitude.toString(),
            longitude: requestParams.longitude.toString(),
        });

        const response: IGetBusinessListResponseType = await api.get({
            endpoint: `${apiRoutes.business}?${queryParams}`,
        });

        return response;
    } else {
        const requestParams = {
            sortType: sortType,
            page: page,
            size: size,
        };

        const queryParams = new URLSearchParams({
            sortType: requestParams.sortType,
            page: requestParams.page.toString(),
            size: requestParams.size.toString(),
        });

        const response: IGetBusinessListResponseType = await api.get({
            endpoint: `${apiRoutes.business}?${queryParams}`
        });

        return response;
    }
};