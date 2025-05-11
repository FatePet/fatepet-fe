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
	const [thumbnailFile, setThumbnailFile] = useState<string | File | null>(
		null,
	);

	const [errorMsgs, setErrorMsgs] = useState<IerrorMsgType>({
		nameError: '',
		hoursError: '',
		phoneError: '',
		emailError: '',
	});
	const [serviceList, setServiceList] = useState<IServiceItemType[]>([
		{
			type: '',
			name: '',
			desc: '',
			priceType: '',
			price: '',
			image: false,
		},
	]);
	const [serviceImageList, setServiceImageList] = useState<(File | null)[]>([]);
	const [additionalImgFile, setAdditionalImgFile] = useState<
		string | File | null
	>(null);

	const isValidPhoneNumber = (phoneNumber: string) => {
		const regex = /^010\d{8}$/;
		return regex.test(phoneNumber);
	};

	const handleBusinessRegisterButton = () => {
		const newErrors = { ...errorMsgs };

		if (businessItem.name === '') {
			newErrors.nameError = '업체명을 입력해주세요.';
		} else {
			newErrors.nameError = '';
		}
		if (businessItem.businessHours === '') {
			newErrors.hoursError = '운영시간을 입력해주세요.';
		} else {
			newErrors.hoursError = '';
		}
		if (businessItem.phoneNumber === '') {
			newErrors.phoneError = '휴대폰번호를 입력해주세요.';
		} else if (!isValidPhoneNumber(businessItem.phoneNumber)) {
			newErrors.phoneError = '형식이 올바르지 않습니다.';
		} else {
			newErrors.phoneError = '';
		}
		if (businessItem.email === '') {
			newErrors.emailError = '이메일을 입력해주세요.';
		} else {
			newErrors.emailError = '';
		}

		setBusinessItem({ ...businessItem, thumbnail: thumbnailFile as File });

		setErrorMsgs(newErrors);

		const validServiceImgFiles = serviceImageList.filter(
			(file): file is File => file !== null,
		);
	};

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
						imageFile={thumbnailFile}
						setImageFile={setThumbnailFile}
					/>
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>서비스 정보</p>
					<div className={borderClass} />
					<ServiceInfoArea
						serviceList={serviceList}
						setServiceList={setServiceList}
						serviceImageList={serviceImageList}
						setServiceImageList={setServiceImageList}
					/>
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>기타 정보</p>
					<div className={borderClass} />
					<AdditionalInfoArea
						additionalImgFile={additionalImgFile}
						setAdditionalImgFile={setAdditionalImgFile}
						businessItem={businessItem}
						setBusinessItem={setBusinessItem}
					/>
				</div>
			</div>
		</div>
	);
}

export default RegisterBusiness;
