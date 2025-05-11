'use client';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ServiceInfoArea from './_components/ServiceInfoArea';
import BusinessInfoArea from './_components/BusinessInfoArea';
import AdditionalInfoArea from './_components/AdditionalInfoArea';

const areaNameClass = 'font-bold text-[14px] text-gray-middle mt-[10px]';
const borderClass = 'w-[100%] h-[1px] bg-gray-middle mb-[10px]';

interface IerrorMsgType {
	nameError: string;
	hoursError: string;
	phoneError: string;
	emailError: string;
}

function RegisterBusiness() {
	const router = useRouter();
	const [businessItem, setBusinessItem] =
		useState<IPostCreateBusinessRequestType>({
			name: '',
			type: '',
			thumbnail: null,
			address: '',
			businessHours: '',
			phoneNumber: '',
			email: '',
			service: [],
			additionalImage: [],
			additionalInfo: '',
		});
	const [imageFile, setImageFile] = useState<string | File | null>(null);
	const [errorMsgs, setErrorMsgs] = useState<IerrorMsgType>({
		nameError: '',
		hoursError: '',
		phoneError: '',
		emailError: '',
	});

	const handleBusinessRegisterButton = () => {};

	return (
		<div className='mb-[60px]'>
			<HeaderWithBackArrow
				headerTitle='업체등록'
				handleBackArrowClick={() => router.back()}
				hasRightConfirmButton={true}
				handleRightButtonClick={handleBusinessRegisterButton}
			/>
			<div className='flex flex-col gap-[10px]'>
				<div>
					<p className={areaNameClass}>업체 정보</p>
					<div className={borderClass} />
					<BusinessInfoArea
						businessItem={businessItem}
						setBusinessItem={setBusinessItem}
						errorMsgs={errorMsgs}
						setErrorMsgs={setErrorMsgs}
						setImageFile={setImageFile}
					/>
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>서비스 정보</p>
					<div className={borderClass} />
					<ServiceInfoArea />
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>기타 정보</p>
					<div className={borderClass} />
					<AdditionalInfoArea />
				</div>
			</div>
		</div>
	);
}

export default RegisterBusiness;
