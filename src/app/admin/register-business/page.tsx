'use client';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ServiceInfoArea from './_components/ServiceInfoArea';
import BusinessInfoArea from './_components/BusinessInfoArea';
import AdditionalInfoArea from './_components/AdditionalInfoArea';
import { convertAddressToCoordinates } from '@/hooks/admin-business/useConvertAddressToCoordinates';
import useAuthStore from '@/store/useAuthStore';
import { usePostCreateBusiness } from '@/hooks/api/admin/business/usePostCreateBusiness';
import toast from 'react-hot-toast';

const areaNameClass = 'font-bold text-[14px] text-gray-middle mt-[10px]';
const borderClass = 'w-[100%] h-[1px] bg-gray-middle mb-[10px]';

function RegisterBusiness() {
	const router = useRouter();
	const { accessToken, setAccessToken } = useAuthStore();
	const { mutate: createBusiness } = usePostCreateBusiness(
		accessToken,
		setAccessToken,
	);
	const [businessItem, setBusinessItem] =
		useState<IPostCreateBusinessRequestType>({
			name: '',
			category: '장묘',
			mainImage: null,
			address: '',
			latitude: 0,
			longitude: 0,
			businessHours: '',
			phoneNumber: '',
			email: '',
			service: [],
			serviceImage: [],
			additionalImage: [],
			additionalInfo: '',
		});
	const [thumbnailFile, setThumbnailFile] = useState<string | File | null>(
		null,
	);
	const [address, setAddress] = useState<string>('');
	const [detailAddress, setDetailAddress] = useState<string>('');
	const [errorMsgs, setErrorMsgs] = useState<IBusinessErrorMsgType>({
		nameError: '',
		hoursError: '',
		phoneError: '',
		emailError: '',
		addressError: '',
	});
	const [serviceErrorMsgs, setServiceErrorMsgs] = useState<string[]>(['']);
	const [serviceList, setServiceList] = useState<IServiceItemType[]>([
		{
			type: '기본항목',
			name: '',
			description: '',
			priceType: '직접입력',
			price: '',
			image: false,
		},
	]);
	const [serviceImageList, setServiceImageList] = useState<(File | null)[]>([]);
	const [additionalImgFileList, setAdditionalImgFileList] = useState<
		(File | null)[]
	>([]);
	const [isCheckedName, setIsCheckedName] = useState<boolean>(false);

	useEffect(() => {
		convertAddressToCoordinates(address).then((result) => {
			setBusinessItem((prev) => ({
				...prev,
				latitude: result?.lat ?? 0,
				longitude: result?.lng ?? 0,
			}));
		});
	}, [address]);

	useEffect(() => {
		const validAdditionalImgFiles = additionalImgFileList.filter(
			(file): file is File => file !== null,
		);
		const validServiceImgFiles = serviceImageList.filter(
			(file): file is File => file !== null,
		);
		setBusinessItem((prev) => ({
			...prev,
			mainImage: thumbnailFile as File,
			service: serviceList,
			additionalImage: validAdditionalImgFiles,
			serviceImage: validServiceImgFiles,
		}));
	}, [thumbnailFile, serviceImageList, serviceList, additionalImgFileList]);

	const isValidPhoneNumber = (phoneNumber: string) => {
		const regex = /^010\d{8}$/;
		return regex.test(phoneNumber);
	};

	const checkIsServiceFilled = (
		callType: 'check' | 'alert',
	): void | boolean => {
		const hasName = serviceList.every((item) => item.name.trim() !== '');
		const hasPrice = serviceList.every(
			(item) => item.priceType !== '직접입력' || item.price.trim() !== '',
		);

		switch (callType) {
			case 'check':
				return hasName && hasPrice;
			case 'alert':
				if (!hasName) {
					toast.error(`서비스명을 입력해주세요.`);
				} else if (!hasPrice) {
					toast.error('서비스 가격을 입력해주세요.');
				}
				break;
			default:
				break;
		}
	};

	const handleCheckErrorMsgs = () => {
		if (businessItem.name === '') {
			toast.error('업체명을 입력해주세요.');
			return;
		} else if (!isCheckedName) {
			toast.error('업체명 중복확인을 해주세요.');
			return;
		}

		if (thumbnailFile === null) {
			toast.error('대표사진을 등록해주세요.');
			return;
		}

		if (businessItem.businessHours === '') {
			toast.error('운영시간을 입력해주세요.');
			return;
		}

		if (businessItem.phoneNumber === '') {
			toast.error('휴대폰번호를 입력해주세요.');
			return;
		} else if (!isValidPhoneNumber(businessItem.phoneNumber)) {
			toast.error('휴대폰번호 형식이 올바르지 않습니다.');
			return;
		}
		if (businessItem.email === '') {
			toast.error('이메일을 입력해주세요.');
			return;
		}
		if (businessItem.address === '') {
			toast.error('주소를 설정해주세요.');
			return;
		}
		checkIsServiceFilled('alert');
	};

	const handleBusinessRegisterButton = () => {
		handleCheckErrorMsgs();
		if (
			checkIsServiceFilled('check') &&
			businessItem.mainImage !== null &&
			Object.values(errorMsgs).every((msg) => msg === '') &&
			Object.values(serviceErrorMsgs).every((msg) => msg === '')
		) {
			createBusiness(businessItem);
		}
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
						address={address}
						setAddress={setAddress}
						detailAddress={detailAddress}
						setDetailAddress={setDetailAddress}
						setIsCheckedName={setIsCheckedName}
						isCheckedName={isCheckedName}
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
						serviceErrorMsgs={serviceErrorMsgs}
						setServiceErrorMsgs={setServiceErrorMsgs}
					/>
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>기타 정보</p>
					<div className={borderClass} />
					<AdditionalInfoArea
						setAdditionalImgFileList={setAdditionalImgFileList}
						businessItem={businessItem}
						setBusinessItem={setBusinessItem}
						additionalImgFileList={additionalImgFileList}
					/>
				</div>
			</div>
		</div>
	);
}

export default RegisterBusiness;
