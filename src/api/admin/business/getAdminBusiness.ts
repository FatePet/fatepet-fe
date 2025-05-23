import { apiRoutes } from "@/_lib/apiRoutes"
import api from "@/_lib/fetcher"

export const getAdminBusiness = async (authorization: string) => {
    const response: IGetAdminBusinessResponseType = await api.get({
        endpoint: `${apiRoutes.admin}${apiRoutes.business}`,
        authorization,
    });
    return response;
};