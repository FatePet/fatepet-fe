interface IFetchOptions<T = unknown> {
	endpoint: string;
	body?: T;
	method?: string;
	authorization?: string;
	id?: string;
	setAccessToken?: (token: string) => void;
}

interface IGetOptions {
	endpoint: string;
	authorization?: string;
	setAccessToken?: (token: string) => void;
}

interface IPostOptions<T = unknown> {
	endpoint: string;
	body?: T;
	authorization?: string;
	setAccessToken?: (token: string) => void;
}

interface IDeleteOptions {
	endpoint: string;
	authorization: string;
	setAccessToken?: (token: string) => void;
}

const _fetch = async <T = unknown, R = unknown>(
	options: IFetchOptions<T>,
	retry = true,
): Promise<R> => {
	const { method, endpoint, body, authorization, setAccessToken } = options;
	const headers: HeadersInit = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	if (authorization) {
		headers.Authorization = `Bearer ${authorization}`;
	}

	const requestOptions: RequestInit = {
		method,
		headers,
		credentials: 'include',
	};

	if (body) {
		requestOptions.body = JSON.stringify(body);
	}

	if (body instanceof FormData) {
		delete headers['Content-Type'];
		requestOptions.body = body;
	} else if (body) {
		requestOptions.body = JSON.stringify(body);
	}

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}${endpoint}`,
			requestOptions,
		);

		// accessToken 만료 시
		if ((res.status === 401 || res.status === 403) && retry) {
			const reissueResponse = await fetch(
				`${process.env.NEXT_PUBLIC_API}/token`,
				{
					method: 'POST',
					credentials: 'include',
				},
			);
			if (!reissueResponse.ok) {
				// refreshToken도 만료된 상태
				if (setAccessToken) {
					setAccessToken('');
				}
				window.location.replace('/admin/login');
				throw new Error('Failed to refreshToken');
			}

			// Bearer 포함 accessToken 값 헤더에서 추출
			const newAccessToken = reissueResponse.headers.get('Authorization');
			if (!newAccessToken) {
				throw new Error('Authorization is missing');
			}

			// Bearer 빼고 추출
			const accessToken = newAccessToken.split(' ')[1];
			if (!accessToken) {
				throw new Error('Access token is missing in the Authorization header');
			}
			if (setAccessToken) {
				setAccessToken(accessToken);
			}
			return _fetch<T, R>({ ...options, authorization: accessToken }, false);
		}

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message);
		}
		return await res.json();
	} catch (error) {
		throw error;
	}
};

// T: 요청 body의 타입,
// R: 응답 body의 타입

const _get = async <R = unknown>({
	endpoint,
	authorization,
	setAccessToken,
}: IGetOptions): Promise<R> => {
	return _fetch<never, R>({
		method: 'GET',
		endpoint,
		authorization,
		setAccessToken,
	});
};

const _post = async <T = unknown, R = unknown>({
	endpoint,
	body,
	authorization,
	setAccessToken,
}: IPostOptions<T>): Promise<R> => {
	return _fetch<T, R>({
		method: 'POST',
		endpoint,
		body,
		authorization,
		setAccessToken,
	});
};

const _patch = async <T = unknown, R = unknown>({
	endpoint,
	body,
	authorization,
	setAccessToken,
}: IPostOptions<T>): Promise<R> => {
	return _fetch<T, R>({
		method: 'PATCH',
		endpoint,
		body,
		authorization,
		setAccessToken,
	});
};

const _put = async <T = unknown, R = unknown>({
	endpoint,
	body,
	authorization,
	setAccessToken,
}: IPostOptions<T>): Promise<R> => {
	return _fetch<T, R>({
		method: 'PUT',
		endpoint,
		body,
		authorization,
		setAccessToken,
	});
};

const _delete = async <R = unknown>({
	endpoint,
	authorization,
	setAccessToken,
}: IDeleteOptions): Promise<R> => {
	return _fetch<never, R>({
		method: 'DELETE',
		authorization,
		endpoint,
		setAccessToken,
	});
};

const api = {
	get: _get,
	post: _post,
	patch: _patch,
	put: _put,
	delete: _delete,
};

export default api;
