import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const postRequestConsultation = async (
	body: IPostRequestConsultationRequestType,
) => {
	const response = await api.post<
		IPostRequestConsultationRequestType,
		IResponseType
	>({
		endpoint: apiRoutes.consultation,
		body,
	});
	return response;
};
