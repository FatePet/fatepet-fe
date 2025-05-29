// 업체 상세 조회 페이지, 업체 목록 조회 페이지에서 공통적으로 사용되는 데이터 타입
type IBusinessItemCommonType = {
	name: string;
	address: string;
	mainImageUrl: string;
	businessHours: string;
	phoneNumber: string;
	category: string;
};

// 업체 상세 조회
type IGetBusinessDetailResponseType = IResponseType & {
	data: IBusinessDetailDataType;
};

type IBusinessDetailDataType = IBusinessItemCommonType & {
	email: string;
	services: IServiceDetailType[];
	additionalInfo: IAdditionalInfoType;
};

type IServiceDetailType = {
	serviceId: number;
	type: string;
	name: string;
	description: string;
	imageUrl: string;
	priceType: string;
	price: string;
};

type IAdditionalInfoType = {
	images: IAdditionalImageType[];
	description: string;
};

type IAdditionalImageType = {
	imageId: number;
	url: string;
};
