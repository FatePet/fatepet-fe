import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getCheckBusinessName = async (
	businessName: string,
	authorization: string,
) => {
	const response: IResponseType = await api.get({
		endpoint: `${apiRoutes.admin}/check-name?name=${businessName}`,
		authorization,
	});
	return response;
};
