'use client';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import { useRouter } from 'next/navigation';
import React from 'react';
import StoreInfoArea from './_components/CompanyInfoArea';
import ServiceInfoArea from './_components/ServiceInfoArea';
import MoreInfoArea from './_components/MoreInfoArea';

function RegisterStore() {
	const router = useRouter();

	const areaNameClass = 'font-bold text-[14px] text-gray-middle mt-[10px]';
	const borderClass = 'w-[100%] h-[1px] bg-gray-middle mb-[10px]';

	return (
		<div className='mb-[60px]'>
			<HeaderWithBackArrow
				headerTitle='업체등록'
				handleBackArrowClick={() => router.back()}
				hasRightConfirmButton={true}
				handleConfirmButtonClick={() => {
					return;
				}}
			/>
			<div className='flex flex-col gap-[10px]'>
				<div className='STORE-INFO'>
					<p className={areaNameClass}>업체 정보</p>
					<div className={borderClass} />
					<StoreInfoArea />
				</div>
				<div className='SERVICE-INFO'>
					<p className={`${areaNameClass} mt-[50px]`}>서비스 정보</p>
					<div className={borderClass} />

					<ServiceInfoArea />
				</div>
				<div className='MORE-INFO'>
					<p className={`${areaNameClass} mt-[50px]`}>기타 정보</p>
					<div className={borderClass} />
					<MoreInfoArea />
				</div>
			</div>
		</div>
	);
}

export default RegisterStore;
