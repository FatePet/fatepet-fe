// 업체 목록 조회
type IGetBusinessListResponseType = IResponseType & {
	data: IBusinessItemType[];
};

type IBusinessItemType = IBusinessItemCommonType & {
	businessId: number;
};

// 상담 요청
type IPostRequestConsultationRequestType = {
	businessId: string;
	contactType: string;
	phoneNumber: string;
	inquiry: string;
}