'use client';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { convertAddressToCoordinates } from '@/hooks/useConvertAddressToCoordinates';
import useAuthStore from '@/store/useAuthStore';
import { usePostCreateBusiness } from '@/hooks/admin/business/usePostCreateBusiness';
import BusinessInfoArea from '../../register-business/_components/BusinessInfoArea';
import ServiceInfoArea from '../../register-business/_components/ServiceInfoArea';
import AdditionalInfoArea from '../../register-business/_components/AdditionalInfoArea';
import { useGetAdminBusinessDetail } from '@/hooks/api/admin/business/useGetAdminBusinessDetail';

const areaNameClass = 'font-bold text-[14px] text-gray-middle mt-[10px]';
const borderClass = 'w-[100%] h-[1px] bg-gray-middle mb-[10px]';

function EditBusiness() {
	const router = useRouter();
	const { accessToken, setAccessToken } = useAuthStore();
	const params = useParams();
	const businessId = params.businessId as string;
	const { data: businessDetail } = useGetAdminBusinessDetail(
		businessId,
		accessToken,
		setAccessToken,
	);
	const { mutate: createBusiness } = usePostCreateBusiness(
		accessToken,
		setAccessToken,
	);
	const [postBusinessItem, setPostBusinessItem] =
		useState<IPostCreateBusinessRequestType>({
			name: '',
			type: '',
			thumbnail: null,
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
			type: '',
			name: '',
			desc: '',
			priceType: '',
			price: '',
			image: false,
		},
	]);
	const [originServiceList, setOriginServiceList] = useState<
		IServiceDetailType[]
	>([
		{
			serviceId: 0,
			category: '',
			name: '',
			description: '',
			imageUrl: '',
			price: '',
		},
	]);
	const [serviceImageList, setServiceImageList] = useState<(File | null)[]>([]);
	const [additionalImgFileList, setAdditionalImgFileList] = useState<
		(File | null)[]
	>([]);

	useEffect(() => {
		if (businessDetail) {
			const itemData = businessDetail.data;
			setPostBusinessItem({
				name: itemData.name,
				type: itemData.category,
				thumbnail: null,
				address: itemData.address,
				latitude: 0,
				longitude: 0,
				businessHours: itemData.businessHours,
				phoneNumber: itemData.phoneNumber,
				email: itemData.email,
				service: [],
				serviceImage: [],
				additionalImage: [],
				additionalInfo: itemData.additionalInfo.description,
			});
			setServiceList(
				itemData.services.map((item) => ({
					type: item.category,
					name: item.name,
					desc: item.description,
					priceType: item.price,
					price: item.price,
					image: item.description ? true : false,
				})),
			);
		}
	}, [businessDetail]);

	useEffect(() => {
		const updatedErrorMsgs = serviceList.map((service) =>
			service.name === '' ? '서비스명을 입력해주세요.' : '',
		);

		setServiceErrorMsgs(updatedErrorMsgs);
	}, [serviceList]);

	useEffect(() => {
		convertAddressToCoordinates(address).then((result) => {
			setPostBusinessItem((prev) => ({
				...prev,
				latitude: result?.lat ?? 0,
				longitude: result?.lng ?? 0,
			}));
		});

		setPostBusinessItem((prev) => ({
			...prev,
			thumbnail: thumbnailFile as File,
			service: serviceList,
		}));

		const validAdditionalImgFiles = additionalImgFileList.filter(
			(file): file is File => file !== null,
		);
		setPostBusinessItem((prev) => ({
			...prev,
			additionalImage: validAdditionalImgFiles,
		}));

		const validServiceImgFiles = serviceImageList.filter(
			(file): file is File => file !== null,
		);
		setPostBusinessItem((prev) => ({
			...prev,
			serviceImage: validServiceImgFiles,
		}));
	}, [
		address,
		thumbnailFile,
		serviceImageList,
		serviceList,
		additionalImgFileList,
	]);

	const isValidPhoneNumber = (phoneNumber: string) => {
		const regex = /^010\d{8}$/;
		return regex.test(phoneNumber);
	};

	const handleBusinessRegisterButton = () => {
		const newErrors = { ...errorMsgs };

		if (postBusinessItem.name === '') {
			newErrors.nameError = '업체명을 입력해주세요.';
		} else {
			newErrors.nameError = '';
		}
		if (postBusinessItem.businessHours === '') {
			newErrors.hoursError = '운영시간을 입력해주세요.';
		} else {
			newErrors.hoursError = '';
		}
		if (postBusinessItem.phoneNumber === '') {
			newErrors.phoneError = '휴대폰번호를 입력해주세요.';
		} else if (!isValidPhoneNumber(postBusinessItem.phoneNumber)) {
			newErrors.phoneError = '형식이 올바르지 않습니다.';
		} else {
			newErrors.phoneError = '';
		}
		if (postBusinessItem.email === '') {
			newErrors.emailError = '이메일을 입력해주세요.';
		} else {
			newErrors.emailError = '';
		}
		if (postBusinessItem.address === '') {
			newErrors.addressError = '주소를 설정해주세요.';
		} else {
			newErrors.addressError = '';
		}
		setErrorMsgs(newErrors);

		console.log(postBusinessItem);
		createBusiness(postBusinessItem);
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
						businessItem={postBusinessItem}
						setBusinessItem={setPostBusinessItem}
						errorMsgs={errorMsgs}
						setErrorMsgs={setErrorMsgs}
						imageFile={thumbnailFile}
						setImageFile={setThumbnailFile}
						address={address}
						setAddress={setAddress}
						detailAddress={detailAddress}
						setDetailAddress={setDetailAddress}
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
					/>
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>기타 정보</p>
					<div className={borderClass} />
					<AdditionalInfoArea
						setAdditionalImgFileList={setAdditionalImgFileList}
						businessItem={postBusinessItem}
						setBusinessItem={setPostBusinessItem}
						additionalImgFileList={additionalImgFileList}
					/>
				</div>
			</div>
		</div>
	);
}

export default EditBusiness;
