//업체 등록
type IPostCreateBusinessRequestType = {
	name: string;
	type: string;
	thumbnail: File | null;
	address: string;
	latitude: number;
	longitude: number;
	businessHours: string;
	phoneNumber: string;
	email: string;
	service: IServiceItemType[];
	serviceImage: File[];
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

type IBusinessErrorMsgType = {
	nameError: string;
	hoursError: string;
	phoneError: string;
	emailError: string;
	addressError: string;
};

// 업체 조회
// 업체 목록 조회
type IGetAdminBusinessResponseType = IResponseType & {
	data: IAdminBusinessItemType[];
};

type IAdminBusinessItemType = {
	businessId: number;
	name: string;
	address: string;
	category: string;
	mainImageUrl: string;
};
