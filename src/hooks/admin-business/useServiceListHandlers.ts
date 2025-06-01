import { useCallback } from 'react';

type ServiceListType = 'update' | 'add' | 'origin';

interface UseServiceListHandlersParams {
	serviceId?: number;
	serviceIdx: number;
	setOriginServiceList: React.Dispatch<
		React.SetStateAction<IServiceDetailType[]>
	>;
	updateServiceList: IUpdateServiceItemType[];
	setUpdateServiceList: React.Dispatch<
		React.SetStateAction<IUpdateServiceItemType[]>
	>;
	addServiceList: IServiceItemType[];
	setAddServiceList: React.Dispatch<React.SetStateAction<IServiceItemType[]>>;
	serviceImgPreview: string | null;
}

export const useServiceListHandlers = ({
	serviceIdx,
	serviceId,
	setOriginServiceList,
	updateServiceList,
	setUpdateServiceList,
	addServiceList,
	setAddServiceList,
	serviceImgPreview,
}: UseServiceListHandlersParams) => {
	const updatedImageFlag = serviceImgPreview !== null;

	const handleServiceListChange = useCallback(
		(
			listType: ServiceListType,
			field: string,
			data: string | number | boolean,
		) => {
			const updateItem = (item: any) => ({ ...item, [field]: data });

			switch (listType) {
				case 'update':
					if (updateServiceList && serviceId && updateServiceList.length <= 0) {
						const newUpdateItem: IUpdateServiceItemType = {
							serviceId: serviceId ?? -1,
							type: '',
							name: '',
							description: '',
							priceType: '',
							price: '',
							image: updatedImageFlag,
							imageType: 0,
						};
						setUpdateServiceList([newUpdateItem]);
					}
					setUpdateServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx ? updateItem(item) : item,
						),
					);
					break;

				case 'add':
					if (addServiceList.length <= 0) {
						const newAddItem: IServiceItemType = {
							type: '',
							name: '',
							description: '',
							priceType: '',
							price: '',
							image: updatedImageFlag,
						};
						setAddServiceList([newAddItem]);
					}
					setAddServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx ? updateItem(item) : item,
						),
					);
					break;

				case 'origin':
					setOriginServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx ? updateItem(item) : item,
						),
					);
					break;

				default:
					console.warn('Invalid service list type');
			}
		},
		[
			serviceIdx,
			serviceImgPreview,
			updateServiceList,
			setUpdateServiceList,
			addServiceList,
			setAddServiceList,
			setOriginServiceList,
			serviceId,
		],
	);

	return {
		handleServiceListChange,
	};
};
