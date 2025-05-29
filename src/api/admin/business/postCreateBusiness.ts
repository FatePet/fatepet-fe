import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const postCreateBusiness = async (
	body: IPostCreateBusinessRequestType,
	token: string,
	setAccessToken: (accessToken: string) => void,
) => {
	const formData = new FormData();
	console.log(body);

	formData.append('name', body.name);
	formData.append('category', body.category);
	if (body.mainImage) formData.append('mainImage', body.mainImage as File);
	formData.append('address', body.address);
	formData.append('latitude', String(body.latitude));
	formData.append('longitude', String(body.longitude));
	formData.append('businessHours', body.businessHours);
	formData.append('phoneNumber', body.phoneNumber);
	formData.append('email', body.email);
	formData.append('service', JSON.stringify(body.service));
	body.serviceImage.forEach((file) => {
		formData.append('serviceImage', file);
	});
	body.additionalImage.forEach((file) => {
		formData.append('additionalImage', file);
	});
	formData.append('additionalInfo', body.additionalInfo);

	const response = await api.post<FormData, IResponseType>({
		endpoint: apiRoutes.admin,
		authorization: token,
		body: formData,
		setAccessToken,
	});

	return response;
};
