interface KakaoAddressResponse {
	road_address?: {
		address_name: string;
	};
	address?: {
		address_name: string;
	};
}

export const convertCoordinatesToAddress = async (
	lat: number,
	lng: number,
): Promise<{
	roadAddress: string | null;
	bunjiAddress: string | null;
} | null> => {
	const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`;
	const headers = {
		Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAOKEY}`,
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			console.error('Failed to fetch from Kakao API:', response.status);
			return null;
		}
		const data = await response.json();
		const document: KakaoAddressResponse = data.documents?.[0];
		return {
			roadAddress: document?.road_address?.address_name || null,
			bunjiAddress: document?.address?.address_name || null,
		};
	} catch (error) {
		console.error('Error converting coordinates to address:', error);
		return null;
	}
};
