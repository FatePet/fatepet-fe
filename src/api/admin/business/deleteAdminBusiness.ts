import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const deleteAdminBusiness = async (
	authorization: string,
	businessId: string,
	setAccessToken: (accessToken: string) => void,
) => {
	const response = api.delete<IResponseType>({
		endpoint: `${apiRoutes.admin}${apiRoutes.business}/${businessId}`,
		authorization,
		setAccessToken,
	});
	return response;
};
