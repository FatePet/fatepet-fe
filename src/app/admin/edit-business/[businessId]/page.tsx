'use client';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { convertAddressToCoordinates } from '@/hooks/useConvertAddressToCoordinates';
import useAuthStore from '@/store/useAuthStore';
import AdditionalInfoArea from '../../register-business/_components/AdditionalInfoArea';
import { useGetAdminBusinessDetail } from '@/hooks/api/admin/business/useGetAdminBusinessDetail';
import { usePatchEditBusiness } from '@/hooks/api/admin/business/usePatchEditBusiness';
import EditBusinessInfoArea from './_components/EditBusinessInfoArea';
import EditServiceInfoArea from './_components/EditServiceInfoArea';
import EditAdditionalInfoArea from './_components/EditAdditionalInfoArea';

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
	const { mutate: editBusiness } = usePatchEditBusiness(
		accessToken,
		setAccessToken,
	);
	const [originBusinessItem, setOriginBusinessItem] =
		useState<IBusinessDetailDataType>({
			name: '',
			category: '',
			mainImageUrl: '',
			address: '',
			businessHours: '',
			phoneNumber: '',
			email: '',
			services: [],
			additionalInfo: { images: [], description: '' },
		});

	const [patchBusinessItem, setPatchBusinessItem] =
		useState<IPatchBusinessRequestType>({
			name: null,
			category: null,
			mainImage: null,
			address: null,
			latitude: null,
			longitude: null,
			businessHours: null,
			phoneNumber: null,
			email: null,
			addService: null,
			addServiceImage: null,
			updateService: null,
			updateServiceImage: null,
			removeServiceIds: null,
			addAdditionalImage: null,
			removeAdditionalImageIds: null,
			additionalInfo: null,
		});
	const [thumbnailFile, setThumbnailFile] = useState<string | File | null>(
		null,
	);
	const [patchMainImageFile, setPathchMainImageFile] = useState<
		string | File | null
	>(null);
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
			description: '',
			priceType: '',
			price: '',
			image: false,
		},
	]);

	const [addServiceList, setAddServiceList] = useState<IServiceItemType[]>([]);
	const [updateServiceList, setUpdateServiceList] = useState<
		IUpdateServiceItemType[]
	>([]);
	const [originServiceList, setOriginServiceList] = useState<
		IServiceDetailType[]
	>([
		{
			serviceId: 0,
			type: '',
			name: '',
			description: '',
			imageUrl: '',
			priceType: '',
			price: '',
		},
	]);
	const [serviceImageList, setServiceImageList] = useState<(File | null)[]>([]);
	const [addAddServiceImageList, setAddServiceImageList] = useState<
		(File | null)[]
	>([]);
	const [updateServiceImageList, setUpdateServiceImageList] = useState<
		(File | null)[]
	>([]);
	const [removeServiceIds, setRemoveServiceIds] = useState<number[]>([]);

	const [originAdditionalImgFileList, setOriginAdditionalImgFileList] =
		useState<(File | null)[]>([]);
	const [addAdditionalImageList, setAddAdditionalImageList] = useState<
		(File | null)[]
	>([]);
	const [removeAdditionalImageIds, setRemoveAdditionalImageIds] = useState<
		number[]
	>([]);

	useEffect(() => {
		if (businessDetail) {
			const itemData = businessDetail.data;

			setOriginBusinessItem(itemData);
			setThumbnailFile(itemData.mainImageUrl);
			handleSplitAddress(itemData.address);
			setServiceList(
				itemData.services.map((item) => ({
					type: item.type,
					name: item.name,
					description: item.description,
					priceType: item.price,
					price: item.price,
					image: item.description ? true : false,
				})),
			);
			setOriginServiceList(itemData.services);
		}
	}, [businessDetail]);

	useEffect(() => {
		console.log(patchBusinessItem);
	}, [patchBusinessItem]);

	useEffect(() => {
		const updatedErrorMsgs = serviceList.map((service) =>
			service.name === '' ? '서비스명을 입력해주세요.' : '',
		);

		setServiceErrorMsgs(updatedErrorMsgs);
	}, [serviceList]);

	useEffect(() => {
		convertAddressToCoordinates(address).then((result) => {
			setOriginBusinessItem((prev) => ({
				...prev,
				latitude: result?.lat ?? 0,
				longitude: result?.lng ?? 0,
			}));
		});

		setOriginBusinessItem((prev) => ({
			...prev,
			thumbnail: thumbnailFile as File,
			service: serviceList,
		}));

		const validAdditionalImgFiles = originAdditionalImgFileList.filter(
			(file): file is File => file !== null,
		);
		setOriginBusinessItem((prev) => ({
			...prev,
			additionalImage: validAdditionalImgFiles,
		}));

		const validServiceImgFiles = serviceImageList.filter(
			(file): file is File => file !== null,
		);
		setOriginBusinessItem((prev) => ({
			...prev,
			serviceImage: validServiceImgFiles,
		}));
	}, [
		address,
		thumbnailFile,
		serviceImageList,
		serviceList,
		originAdditionalImgFileList,
	]);

	const handleSplitAddress = (address: string) => {
		const splitedAddress = address.split(')');
		setAddress(splitedAddress[0] + ')');
		setDetailAddress(splitedAddress[1]);
	};

	const isValidPhoneNumber = (phoneNumber: string) => {
		const regex = /^010\d{8}$/;
		return regex.test(phoneNumber);
	};

	const handleBusinessRegisterButton = () => {
		const newErrors = { ...errorMsgs };

		if (patchBusinessItem.name === '') {
			newErrors.nameError = '업체명을 입력해주세요.';
		} else {
			newErrors.nameError = '';
		}
		if (patchBusinessItem.businessHours === '') {
			newErrors.hoursError = '운영시간을 입력해주세요.';
		} else {
			newErrors.hoursError = '';
		}
		if (patchBusinessItem.phoneNumber === '') {
			newErrors.phoneError = '휴대폰번호를 입력해주세요.';
		} else if (!isValidPhoneNumber(patchBusinessItem.phoneNumber ?? '')) {
			newErrors.phoneError = '형식이 올바르지 않습니다.';
		} else {
			newErrors.phoneError = '';
		}
		if (patchBusinessItem.email === '') {
			newErrors.emailError = '이메일을 입력해주세요.';
		} else {
			newErrors.emailError = '';
		}
		if (patchBusinessItem.address === '') {
			newErrors.addressError = '주소를 설정해주세요.';
		} else {
			newErrors.addressError = '';
		}
		setErrorMsgs(newErrors);
	};

	return (
		<div className='mb-[60px]'>
			<HeaderWithBackArrow
				headerTitle='업체 정보 수정'
				handleBackArrowClick={() => router.back()}
				hasRightConfirmButton={true}
				handleRightButtonClick={handleBusinessRegisterButton}
			/>
			<div className='flex flex-col gap-[10px]'>
				<div>
					<p className={areaNameClass}>업체 정보</p>
					<div className={borderClass} />
					<EditBusinessInfoArea
						originBusinessItem={originBusinessItem}
						patchBusinessItem={patchBusinessItem}
						setPatchBusinessItem={setPatchBusinessItem}
						errorMsgs={errorMsgs}
						setErrorMsgs={setErrorMsgs}
						imageFile={patchMainImageFile ?? thumbnailFile}
						setImageFile={setPathchMainImageFile}
						address={address}
						setAddress={setAddress}
						detailAddress={detailAddress}
						setDetailAddress={setDetailAddress}
					/>
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>서비스 정보</p>
					<div className={borderClass} />
					<EditServiceInfoArea
						originServiceList={originServiceList}
						setOriginServiceList={setOriginServiceList}
						addServiceList={addServiceList}
						setAddServiceList={setAddServiceList}
						updateServiceList={updateServiceList}
						setUpdateServiceList={setUpdateServiceList}
						serviceImageList={serviceImageList}
						setServiceImageList={setServiceImageList}
						setAddServiceImageList={setAddServiceImageList}
						setUpdateServiceImageList={setUpdateServiceImageList}
						setRemoveServiceIds={setRemoveServiceIds}
						serviceErrorMsgs={serviceErrorMsgs}
					/>
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>기타 정보</p>
					<div className={borderClass} />
					<EditAdditionalInfoArea
						setAddAdditionalImgFileList={setAddAdditionalImageList}
						setOriginBusinessItem={setOriginBusinessItem}
						// setOriginAdditionalImgFileList={setOriginAdditionalImgFileList}
						addAdditionalImgFileList={addAdditionalImageList}
						originBusinessItem={originBusinessItem}
						patchBusinessItem={patchBusinessItem}
						setPatchBusinessItem={setPatchBusinessItem}
						setRemoveAdditionalImgaIds={setRemoveAdditionalImageIds}
					/>
				</div>
			</div>
		</div>
	);
}

export default EditBusiness;
