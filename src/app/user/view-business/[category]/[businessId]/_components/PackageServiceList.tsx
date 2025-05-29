import React from 'react';
import ServiceCardWithNoImage from './ServiceCardWithNoImage';
import ServiceCardWithImage from './ServiceCardWithImage';

interface Props {
	services: IServiceDetailType[];
}

function PackageServiceList({ services }: Props) {
	const packageServices = services.filter(
		(service) => service.type === '패키지',
	);

	return (
		<div className='w-full flex flex-col gap-[5px]'>
			{packageServices.map((packageService) =>
				packageService.imageUrl ? (
					<ServiceCardWithImage
						name={packageService.name}
						description={packageService.description}
						imageUrl={packageService.imageUrl}
						price={packageService.price}
						key={packageService.serviceId}
					/>
				) : (
					<ServiceCardWithNoImage
						name={packageService.name}
						description={packageService.description}
						price={packageService.price}
						key={packageService.serviceId}
					/>
				),
			)}
		</div>
	);
}

export default PackageServiceList;
