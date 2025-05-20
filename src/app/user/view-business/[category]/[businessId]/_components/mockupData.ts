export const getBusinessDetailData: IGetBusinessDetailResponseType = {
	status: 200,
	message: 'success',
	data: {
		category: '장묘',
		name: '포 포우즈 춘천점',
		address: '강원도 춘천시 퇴계로 1233123123',
		businessHours: '24시간 연중무휴',
		phoneNumber: '010-1231-1231',
		mainImageUrl: '/images/mockupImage1.png',
		email: 'example@example.com',
		services: [
			{
				serviceId: 1,
				category: '기본항목',
				name: '베이직 장례',
				description:
					'세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항',
				imageUrl: '/images/mockupImage3.png',
				price: '15KG미만: 35,000원, 15KG이상: 5123112원 ',
			},
			{
				serviceId: 2,
				category: '기본항목',
				name: '노말 장례',
				description: '세부사항세부사항세부사항세부사항세부사항세부사항',
				imageUrl: '/images/mockupImage3.png',
				price:
					'15KG미만: 35,000원, 15KG이상: 50,000원, 15KG미만: 35,000원, 15KG이상: 50,000원',
			},
			{
				serviceId: 3,
				category: '선택항목',
				name: '베이직 장례',
				description:
					'세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항',
				imageUrl: '/images/mockupImage3.png',
				price: '15KG미만: 35,000원, 15KG이상: 5123112원 ',
			},
			{
				serviceId: 4,
				category: '선택항목',
				name: '노말 장례',
				description: '',
				imageUrl: '',
				price: '15KG미만: 35,000원, 15KG이상: 5123112원 ',
			},
			{
				serviceId: 5,
				category: '패키지',
				name: '베이직 장례',
				description: '',
				imageUrl: '',
				price: '15KG 미만: 35,000원, 15KG이상: 5123112원, 20KG 이상: 1212312원',
			},
			{
				serviceId: 6,
				category: '패키지',
				name: '베이직 장례',
				description: '이건 설명이 있음',
				imageUrl: '/images/mockupImage2.png',
				price: '15KG 미만: 35,000원',
			},
		],
		additionalInfo: {
			images: [
				{ url: '/images/mockupImage2.png', imageId: 1 },
				{ url: '/images/mockupImage3.png', imageId: 2 },
			],
			description:
				'기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 ',
		},
	},
};
