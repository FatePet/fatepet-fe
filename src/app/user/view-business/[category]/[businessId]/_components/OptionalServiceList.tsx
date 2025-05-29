import React from 'react';
import ServiceCardWithNoImage from './ServiceCardWithNoImage';
import ServiceCardWithImage from './ServiceCardWithImage';

interface Props {
	services: IServiceDetailType[];
}

function OptionalServiceList({ services }: Props) {
	const optionalServices = services.filter(
		(service) => service.type === '선택항목',
	);

	return (
		<div className='w-full flex flex-col gap-[5px]'>
			{optionalServices.map((optionalService) =>
				optionalService.imageUrl ? (
					<ServiceCardWithImage
						name={optionalService.name}
						description={optionalService.description}
						imageUrl={optionalService.imageUrl}
						price={optionalService.price}
						key={optionalService.serviceId}
					/>
				) : (
					<ServiceCardWithNoImage
						name={optionalService.name}
						description={optionalService.description}
						price={optionalService.price}
						key={optionalService.serviceId}
					/>
				),
			)}
		</div>
	);
}

export default OptionalServiceList;
