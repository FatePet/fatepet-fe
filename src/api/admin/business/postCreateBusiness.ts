import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const postCreateBusiness = async (
	body: IPostCreateBusinessRequestType,
	token: string,
) => {
	const formData = new FormData();

	formData.append('name', body.name);
	formData.append('category', body.type);
	formData.append('thumbnail', body.thumbnail as File);
	formData.append('address', body.address);
	formData.append('latitude', String(body.latitude));
	formData.append('longitude', String(body.longitude));
	formData.append('businessHours', body.businessHours);
	formData.append('email', body.email);
	formData.append('service', JSON.stringify(body.service));
	formData.append('additionalInfo', body.additionalInfo);
	body.serviceImage.forEach((file) => {
		formData.append('serviceImage', file);
	});
	body.additionalImage.forEach((file) => {
		formData.append('additionalImage', file);
	});

	const response = await api.post<FormData, IResponseType>({
		endpoint: apiRoutes.admin,
		authorization: token,
		body: formData,
	});

	return response;
};
