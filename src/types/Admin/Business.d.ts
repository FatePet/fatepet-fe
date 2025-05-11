//업체 등록
type IPostCreateBusinessRequestType = {
	name: string;
	type: string;
	thumbnail: File | null;
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
