import React from 'react';
import ServiceCardWithImage from './ServiceCardWithImage';
import ServiceCardWithNoImage from './ServiceCardWithNoImage';

interface Props {
	services: IServiceDetailType[];
}

function PrimaryServiceList({ services }: Props) {
	const primaryServices = services.filter(
		(service) => service.type === '기본항목',
	);

	const priceTypeClass = (priceType: string, price: string): string => {
		if (priceType === '직접입력') {
			return price;
		}
		return priceType;
	};

	return (
		<div className='w-full flex flex-col gap-[5px]'>
			{primaryServices.map((primaryService) =>
				primaryService.imageUrl ? (
					<ServiceCardWithImage
						name={primaryService.name}
						description={primaryService.description}
						imageUrl={primaryService.imageUrl}
						price={priceTypeClass(
							primaryService.priceType,
							primaryService.price,
						)}
						key={primaryService.serviceId}
					/>
				) : (
					<ServiceCardWithNoImage
						name={primaryService.name}
						description={primaryService.description}
						price={priceTypeClass(
							primaryService.priceType,
							primaryService.price,
						)}
						key={primaryService.serviceId}
					/>
				),
			)}
		</div>
	);
}

export default PrimaryServiceList;
