//업체 등록
type IPostCreateBusinessRequestType = {
	name: string;
	category: string;
	mainImage: File | null;
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
	description: string;
	priceType: string;
	price: string;
	image: boolean;
};

type IUpdateServiceItemType = {
	serviceId: number;
	imageType: number;
} & IServiceItemType;

type IBusinessErrorMsgType = {
	nameError: string;
	hoursError: string;
	phoneError: string;
	emailError: string;
	addressError: string;
};

//업체 수정
type IPatchBusinessRequestType = {
	name: string | null;
	category: string | null;
	mainImage: File | null;
	address: string | null;
	latitude: number | null;
	longitude: number | null;
	businessHours: string | null;
	phoneNumber: string | null;
	email: string | null;
	addService: IServiceItemType[] | null;
	addServiceImage: File[] | null;
	updateService: IUpdateServiceItemType[] | null;
	updateServiceImage: File[] | null;
	removeServiceIds: number[] | null;
	addAdditionalImage: File[] | null;
	removeAdditionalImageIds: number[] | null;
	additionalInfo: string | null;
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
