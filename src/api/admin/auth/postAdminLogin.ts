import { apiRoutes } from '@/_lib/apiRoutes';

export const postAdminLogin = async (
	body: IPostLoginRequestType,
): Promise<string> => {
	const endpoint = `${process.env.NEXT_PUBLIC_API}${apiRoutes.login}`;

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
		credentials: 'include',
	};

	const response = await fetch(endpoint, requestOptions);

	if (!response.ok) {
		const result = await response.json();
		throw new Error(result.message);
	}
	
	const authorization = response.headers.get('x-amzn-remapped-authorization');
	if (!authorization) {
		throw new Error('Authorization header is missing');
	}

	const accessToken = authorization.split(' ')[1];
	if (!accessToken) {
		throw new Error('Access token is missing in the authorization header');
	}

	return accessToken;
};

