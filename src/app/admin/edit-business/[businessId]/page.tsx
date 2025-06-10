'use client';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { convertAddressToCoordinates } from '@/hooks/admin-business/useConvertAddressToCoordinates';
import useAuthStore from '@/store/useAuthStore';
import { useGetAdminBusinessDetail } from '@/hooks/api/admin/business/useGetAdminBusinessDetail';
import { usePatchEditBusiness } from '@/hooks/api/admin/business/usePatchEditBusiness';
import EditBusinessInfoArea from './_components/EditBusinessInfoArea';
import EditServiceInfoArea from './_components/EditServiceInfoArea';
import EditAdditionalInfoArea from './_components/EditAdditionalInfoArea';
import toast from 'react-hot-toast';

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
		businessId,
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
	const [addServiceImageList, setAddServiceImageList] = useState<
		(File | null)[]
	>([]);
	const [updateServiceImageList, setUpdateServiceImageList] = useState<
		(File | null)[]
	>([]);
	const [removeServiceIds, setRemoveServiceIds] = useState<number[]>([]);
	const [addAdditionalImageList, setAddAdditionalImageList] = useState<
		(File | null)[]
	>([]);
	const [removeAdditionalImageIds, setRemoveAdditionalImageIds] = useState<
		number[]
	>([]);
	const [isCheckedName, setIsCheckedName] = useState<boolean>(true);

	useEffect(() => {
		if (businessDetail) {
			const itemData = businessDetail.data;

			setOriginBusinessItem(itemData);

			if (!itemData.address.endsWith(')')) {
				handleSplitAddress(itemData.address);
			} else {
				setAddress(itemData.address);
			}
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

	// useEffect(() => {
	// 	const updatedErrorMsgs = serviceList.map((service) =>
	// 		service.name === '' ? '서비스명을 입력해주세요.' : '',
	// 	);

	// 	setServiceErrorMsgs(updatedErrorMsgs);
	// }, [serviceList]);

	useEffect(() => {
		convertAddressToCoordinates(address).then((result) => {
			setPatchBusinessItem((prev) => ({
				...prev,
				latitude: result?.lat ?? 0,
				longitude: result?.lng ?? 0,
			}));
		});
	}, [address]);

	useEffect(() => {
		const validAddServiceImage = addServiceImageList.filter(
			(file): file is File => file !== null,
		);

		const validUpdateServiceImage = updateServiceImageList.filter(
			(file): file is File => file !== null,
		);

		const validAddAdditionalImage = addAdditionalImageList.filter(
			(file): file is File => file !== null,
		);

		setPatchBusinessItem((prev) => ({
			...prev,
			mainImage: patchMainImageFile as File,
			addService: addServiceList,
			addServiceImage: validAddServiceImage,
			updateService: updateServiceList,
			updateServiceImage: validUpdateServiceImage,
			removeServiceIds: removeServiceIds,
			addAdditionalImage: validAddAdditionalImage,
			removeAdditionalImageIds: removeAdditionalImageIds,
		}));
	}, [
		patchMainImageFile,
		addServiceList,
		updateServiceList,
		updateServiceImageList,
		removeServiceIds,
		removeAdditionalImageIds,
		addAdditionalImageList,
	]);

	const handleSplitAddress = (address: string) => {
		const splitedAddress = address.split(')');
		setAddress(splitedAddress[0] + ')');
		setDetailAddress(splitedAddress[1]);
	};

	const isValidPhoneNumber = (phoneNumber: string): boolean => {
		const regex = /^010\d{8}$/;
		return regex.test(phoneNumber);
	};

	const checkIsServiceFilled = (
		callType: 'check' | 'alert',
	): void | boolean => {
		const hasName =
			serviceList.every((item) => item.name.trim() !== '') &&
			addServiceList.every((item) => item.name.trim() !== '');
		const hasPrice =
			serviceList.every(
				(item) => item.priceType !== '직접입력' || item.price.trim() !== '',
			) &&
			addServiceList.every(
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
		if (patchBusinessItem.name === '') {
			toast.error('업체명을 입력해주세요.');
			return;
		} else if (!isCheckedName) {
			toast.error('업체명 중복확인을 해주세요.');
			return;
		}

		if (originBusinessItem.mainImageUrl === '' && patchMainImageFile === null) {
			toast.error('대표사진을 등록해주세요.');
			return;
		}

		if (patchBusinessItem.businessHours === '') {
			toast.error('운영시간을 입력해주세요.');
			return;
		}

		if (patchBusinessItem.phoneNumber === '') {
			toast.error('휴대폰번호를 입력해주세요.');
			return;
		} else if (
			!isValidPhoneNumber(
				patchBusinessItem.phoneNumber ?? originBusinessItem.phoneNumber,
			)
		) {
			toast.error('휴대폰번호 형식이 올바르지 않습니다.');
			return;
		}
		if (patchBusinessItem.email === '') {
			toast.error('이메일을 입력해주세요.');
			return;
		}
		if (patchBusinessItem.address === '') {
			toast.error('주소를 설정해주세요.');
			return;
		}
		checkIsServiceFilled('alert');
	};

	const handleBusinessRegisterButton = () => {
		handleCheckErrorMsgs();
		if (
			checkIsServiceFilled('check') &&
			(originBusinessItem.mainImageUrl !== '' || patchMainImageFile !== null) &&
			Object.values(errorMsgs).every((msg) => msg === '') &&
			Object.values(serviceErrorMsgs).every((msg) => msg === '')
		) {
			editBusiness(patchBusinessItem);
		}
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
						setOriginBusinessItem={setOriginBusinessItem}
						patchBusinessItem={patchBusinessItem}
						setPatchBusinessItem={setPatchBusinessItem}
						errorMsgs={errorMsgs}
						setErrorMsgs={setErrorMsgs}
						imageFile={patchMainImageFile ?? originBusinessItem.mainImageUrl}
						setImageFile={setPathchMainImageFile}
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
						setServiceErrorMsgs={setServiceErrorMsgs}
					/>
				</div>
				<div>
					<p className={`${areaNameClass} mt-[50px]`}>기타 정보</p>
					<div className={borderClass} />
					<EditAdditionalInfoArea
						setAddAdditionalImgFileList={setAddAdditionalImageList}
						setOriginBusinessItem={setOriginBusinessItem}
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
