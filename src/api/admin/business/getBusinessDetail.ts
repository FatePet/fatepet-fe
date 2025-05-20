import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getBusinessDetail = async (data: IGetBusinessDetailRequestType) => {
	const authorization = data.authorization ?? undefined;
	const response: IGetBusinessDetailResponseType = await api.get({
		endpoint: `${apiRoutes.business}/${data.businessId}`,
		authorization,
	});
    return response;
};


