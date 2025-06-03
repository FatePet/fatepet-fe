import { apiRoutes } from "@/_lib/apiRoutes"
import api from "@/_lib/fetcher"

export const getUserBusiness = async (
    sort: string,
    page: number,
    size: number,
    latitude: number | null,
    longitude: number | null,
) => {
    

    if (sort === 'DISTANCE') {
        if (!latitude || !longitude) {
            return;
        }
        const queryParams = new URLSearchParams({
            sort,
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
            sort: sort,
            page: page.toString(),
            size: size.toString(),
        }).toString();

        const response: IGetBusinessListResponseType = await api.get({
            endpoint: `${apiRoutes.business}?${queryParams}`
        });

        return response;
    }
};