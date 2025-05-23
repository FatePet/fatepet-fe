// 업체 목록 조회
type IGetBusinessListResponseType = IResponseType & {
	data: IBusinessItemType[];
};

type IBusinessItemType = IBusinessItemCommonType & {
	businessId: number;
};