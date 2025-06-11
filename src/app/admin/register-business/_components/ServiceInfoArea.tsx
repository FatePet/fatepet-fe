import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import BigButton from '@/components/buttons/BigButton';
import toast from 'react-hot-toast';

interface Props {
	serviceList: IServiceItemType[];
	setServiceList: React.Dispatch<React.SetStateAction<IServiceItemType[]>>;
	serviceImageList: (File | null)[];
	setServiceImageList: React.Dispatch<React.SetStateAction<(File | null)[]>>;
	serviceErrorMsgs: string[];
	setServiceErrorMsgs: React.Dispatch<React.SetStateAction<string[]>>;
}
function ServiceInfoArea({
	serviceList,
	setServiceList,
	setServiceImageList,
	serviceErrorMsgs,
	setServiceErrorMsgs,
}: Props) {
	const handleAddService = () => {
		if (serviceList.length === 100) {
			toast.error('서비스는 최대 100개까지 추가 가능합니다.');
			return;
		}

		const newServiceItem: IServiceItemType = {
			type: '',
			name: '',
			description: '',
			priceType: '',
			price: '',
			image: false,
		};

		setServiceList((prev) => [...prev, newServiceItem]);
	};

	return (
		<div className='flex flex-col gap-[10px]'>
			<p className='text-p-red text-[12px] mb-[10px] text-right font-bold'>
				*최소 1개 이상의 서비스를 등록해 주세요
			</p>
			{serviceList.map((service, idx) => (
				<ServiceCard
					key={idx}
					serviceCount={idx + 1}
					serviceItem={service}
					setServiceList={setServiceList}
					setServiceImageList={setServiceImageList}
					errorMsg={serviceErrorMsgs[idx]}
					setServiceErrorMsgs={setServiceErrorMsgs}
				/>
			))}
			<div className='relative'>
				<div className='absolute top-[50%] right-[50%]  w-[22px] h-[18px] bg-p-green text-white flex justify-center items-center rounded-[4px] translate-x-[80px] translate-y-[-50%]'>
					{serviceList.length}
				</div>
				<BigButton buttonText='서비스 추가' handleClick={handleAddService} />
			</div>
		</div>
	);
}

export default ServiceInfoArea;
