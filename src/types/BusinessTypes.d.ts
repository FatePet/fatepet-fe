// 업체 상세 조회
type IGetBusinessDetailResponseType = IResponseType & {
    data: IBusinessDetailDataType;
}

type IBusinessDetailDataType = {
    category: string;
    name: string;
    address: string;
    businessHours: string;
    phoneNumber: string;
    email: string;
    services: IServiceDetailType[];
    additionalInfo: IAdditionalInfoType;
}

type IServiceDetailType = {
    type: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
}

type IAdditionalInfoType = {
    imageUrl: string;
    description: string;
}

//