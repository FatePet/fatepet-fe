import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getCheckBusinessName = async (
	authorization: string,
	businessName: string,
	setAccessToken: (accessToken: string) => void,
) => {
	const response: IResponseType = await api.get({
		endpoint: `${apiRoutes.admin}/check-name?name=${businessName}`,
		authorization,
		setAccessToken,
	});
	return response;
};
