import React from 'react';

type ServiceListType = 'update' | 'add' | 'origin';

interface Props {
	serviceCount: number;
	setServiceList?: React.Dispatch<React.SetStateAction<IServiceItemType[]>>;
	setServiceErrorMsgs: React.Dispatch<React.SetStateAction<string[]>>;
	handleServiceListChange?: (
		listType: ServiceListType,
		field: string,
		data: string | number | boolean,
	) => void;
	isOrigin?: boolean;
}

export const useServiceInputChange = ({
	serviceCount,
	setServiceList,
	setServiceErrorMsgs,
	handleServiceListChange,
	isOrigin,
}: Props) => {
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (handleServiceListChange) {
			if (isOrigin) {
				handleServiceListChange('origin', 'name', value);
				handleServiceListChange('update', 'name', value);
			} else {
				handleServiceListChange('add', 'name', value);
			}
		} else if (setServiceList) {
			setServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceCount - 1 ? { ...item, name: value } : item,
				),
			);
		}

		setServiceErrorMsgs((prev) => {
			const newErrors = [...prev];

			while (newErrors.length < serviceCount) {
				newErrors.push('');
			}

			newErrors[serviceCount - 1] =
				value === '' ? '서비스명을 입력해주세요.' : '';

			return newErrors;
		});
	};

	const onTextAreaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		type: string,
	) => {
		const value = e.target.value;

		if (handleServiceListChange) {
			switch (type) {
				case 'info':
					if (isOrigin) {
						handleServiceListChange('origin', 'description', value);
						handleServiceListChange('update', 'description', value);
					} else {
						handleServiceListChange('add', 'description', value);
					}

					break;
				case 'price':
					if (isOrigin) {
						handleServiceListChange('origin', 'price', value);
						handleServiceListChange('update', 'price', value);
					} else {
						handleServiceListChange('add', 'price', value);
					}

					break;
			}
		} else if (setServiceList) {
			switch (type) {
				case 'info':
					setServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceCount - 1
								? { ...item, description: value }
								: item,
						),
					);
					break;
				case 'price':
					setServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceCount - 1 ? { ...item, price: value } : item,
						),
					);
					break;
			}
		}
	};

	const handleTypeClick = (type: string) => {
		if (handleServiceListChange) {
			if (isOrigin) {
				handleServiceListChange('origin', 'type', type);
				handleServiceListChange('update', 'type', type);
			} else {
				handleServiceListChange('add', 'type', type);
			}
		} else if (setServiceList) {
			setServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceCount - 1 ? { ...item, type: type } : item,
				),
			);
		}
	};

	const handlePriceTypeClick = (type: string) => {
		if (handleServiceListChange) {
			if (isOrigin) {
				handleServiceListChange('origin', 'priceType', type);
				handleServiceListChange('update', 'priceType', type);
			} else {
				handleServiceListChange('add', 'priceType', type);
			}
		} else if (setServiceList) {
			setServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceCount - 1 ? { ...item, priceType: type } : item,
				),
			);
		}
	};

	return {
		onInputChange,
		onTextAreaChange,
		handleTypeClick,
		handlePriceTypeClick,
	};
};
