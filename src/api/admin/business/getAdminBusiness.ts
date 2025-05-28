import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getAdminBusiness = async (
	authorization: string,
	setAccessToken: (accessToken: string) => void,
) => {
	const response: IGetAdminBusinessResponseType = await api.get({
		endpoint: `${apiRoutes.admin}`,
		authorization,
		setAccessToken,
	});
	return response;
};
