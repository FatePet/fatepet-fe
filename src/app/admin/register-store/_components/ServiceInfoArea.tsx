import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import BigButton from '@/components/buttons/BigButton';

function ServiceInfoArea() {
	const [serviceCount, setServiceCount] = useState<number>(1);

	return (
		<div className='flex flex-col gap-[10px]'>
			<p className='text-p-red text-[12px] mb-[10px] text-right font-bold'>
				*최소 1개 이상의 서비스를 등록해 주세요
			</p>
			<ServiceCard />
			<div>
				<BigButton
					buttonText='서비스 추가'
					handleClick={() => {
						return;
					}}
				/>
			</div>
		</div>
	);
}

export default ServiceInfoArea;
