import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getAdminBusinessDetail = async (businessId: string, authorization: string) => {
	const response: IGetBusinessDetailResponseType = await api.get({
		endpoint: `${apiRoutes.business}/${businessId}`,
		authorization,
	});
    return response;
};


