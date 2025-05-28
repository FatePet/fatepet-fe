interface Coordinates {
	lat: number;
	lng: number;
}

export async function convertAddressToCoordinates(
	address: string,
): Promise<Coordinates | null> {
	const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAOKEY}`,
			},
		});

		if (!response.ok) {
			return null;
		}

		const data = await response.json();

		if (data.documents.length === 0) {
			return null;
		}

		const { x, y } = data.documents[0].address;

		return {
			lat: parseFloat(y),
			lng: parseFloat(x),
		};
	} catch (error) {
		console.error('Error fetching coordinates:', error);
		return null;
	}
}
