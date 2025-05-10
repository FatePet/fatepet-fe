//업체 등록
type IPostCreateBusinessRequestType = {
	name: string;
	type: string;
	thumbnail: File;
	address: string;
	businessHours: string;
	phoneNumber: string;
	email: string;
	service: IServiceItemType[];
	additionalImage: File[];
	additionalInfo: string;
};

type IServiceItemType = {
	type: string;
	name: string;
	desc: string;
	priceType: string;
	price: string;
	image: boolean;
};

// 업체 조회
type IAdminBusinessItemType = {
	businessId: number;
	name: string;
	address: string;
	category: string;
	thumbnailUrl: string;
};

type IGetAdminBusinessResponseType = IResponseType & {
	data: IAdminBusinessItemType;
};
