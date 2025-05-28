import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getUserBusinessDetail = async (
	businessId: string,
) => {
	const response: IGetBusinessDetailResponseType = await api.get({
		endpoint: `${apiRoutes.business}/${businessId}`,
	});
	return response;
};
