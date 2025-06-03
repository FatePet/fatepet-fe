import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import React, { useEffect, useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import RightButtonInput from '@/components/inputs/RightButtonInput';
import DaumPost from '@/components/location/DaumPost';
import { useGetCheckBusinessName } from '@/hooks/api/admin/business/useGetCheckBusinessName';
import useAuthStore from '@/store/useAuthStore';
import { useCheckDuplicateName } from '@/hooks/admin-business/useCheckDuplicateName';
import toast from 'react-hot-toast';

const divClass = 'flex flex-col gap-[5px] font-bold';
const requiredClass = 'text-p-red';

interface Props {
	businessItem: IPostCreateBusinessRequestType;
	setBusinessItem: React.Dispatch<
		React.SetStateAction<IPostCreateBusinessRequestType>
	>;
	errorMsgs: IBusinessErrorMsgType;
	setErrorMsgs: React.Dispatch<React.SetStateAction<IBusinessErrorMsgType>>;
	setImageFile: React.Dispatch<React.SetStateAction<string | File | null>>;
	imageFile: string | File | null;
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	detailAddress: string;
	setDetailAddress: React.Dispatch<React.SetStateAction<string>>;
	setIsCheckedName: React.Dispatch<React.SetStateAction<boolean>>;
	isCheckedName: boolean;
}

function BusinessInfoArea({
	errorMsgs,
	setErrorMsgs,
	businessItem,
	setBusinessItem,
	imageFile,
	setImageFile,
	address,
	setAddress,
	detailAddress,
	setDetailAddress,
	setIsCheckedName,
	isCheckedName,
}: Props) {
	const [imgPreview, setImgPreview] = useState<string | null>(null);
	const { checkDuplicateName } = useCheckDuplicateName(
		businessItem.name,
		isCheckedName,
		setIsCheckedName,
		setErrorMsgs,
	);

	const businessCategory = [
		{
			category: '장묘',
		},
		{
			category: '브리더',
		},
		{
			category: '악세사리',
		},
		{
			category: '행동상담',
		},
	];

	useEffect(() => {
		if (detailAddress !== '') {
			const fullAddress = address + detailAddress;
			setBusinessItem({ ...businessItem, address: fullAddress });
		} else {
			setBusinessItem({ ...businessItem, address: address });
		}
	}, [address, detailAddress]);

	const handleCategoryClick = (category: string) => {
		if (category === '장묘') {
			setBusinessItem({ ...businessItem, category: category });
		} else {
			toast.error('아직 준비중인 서비스입니다.');
		}
	};

	const handleErrorMsgs = (errType: string, msg: string) => {
		setErrorMsgs((prev) => ({
			...prev,
			[errType]: msg,
		}));
	};

	const onInputChange = (
		type: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;

		switch (type) {
			case '업체명':
				if (value === '') {
					handleErrorMsgs('nameError', '업체명을 입력해주세요.');
				} else if (!isCheckedName) {
					handleErrorMsgs('nameError', '업체명을 중복확인을 해주세요.');
				} else {
					handleErrorMsgs('nameError', '');
				}
				setBusinessItem({ ...businessItem, name: e.target.value });
				setIsCheckedName(false);
				break;
			case '운영시간':
				if (value === '') {
					handleErrorMsgs('hoursError', '운영시간을 입력해주세요.');
				} else {
					handleErrorMsgs('hoursError', '');
				}
				setBusinessItem({ ...businessItem, businessHours: e.target.value });
				break;
			case '번호':
				if (value === '') {
					handleErrorMsgs('phoneError', '휴대폰번호를 입력해주세요.');
				} else {
					handleErrorMsgs('phoneError', '');
				}
				setBusinessItem({ ...businessItem, phoneNumber: e.target.value });
				break;
			case '이메일':
				if (value === '') {
					handleErrorMsgs('emailError', '이메일을 입력해주세요.');
				} else {
					handleErrorMsgs('emailError', '');
				}
				setBusinessItem({ ...businessItem, email: e.target.value });
				break;
			case '상세주소':
				setDetailAddress(e.target.value);
				break;
		}
	};

	const handleDeleteImage = () => {
		setImageFile(null);
		setImgPreview(null);
	};

	return (
		<div className='flex flex-col gap-[20px]'>
			<div className={divClass}>
				<p>
					업체명 <span className={requiredClass}>*</span>
				</p>
				<RightButtonInput
					inputData={businessItem.name}
					errorMsg={errorMsgs.nameError}
					placeHolder='예시) (주)페이트펫'
					onChange={(e) => onInputChange('업체명', e)}
					buttonText='중복확인'
					handleButtonClick={checkDuplicateName}
					disabled={businessItem.name === ''}
				/>
			</div>
			<div className={divClass}>
				<p>
					업체 구분 <span className={requiredClass}>*</span>
				</p>
				<div className='flex items-center gap-[10px]'>
					{businessCategory.map((business) => (
						<MiniButton
							key={business.category}
							buttonText={business.category}
							handleClick={() => handleCategoryClick(business.category)}
							isClicked={businessItem.category === business.category}
						/>
					))}
				</div>
			</div>
			<div className={divClass}>
				<p>
					대표 사진 (1장) <span className={requiredClass}>*</span>
				</p>
				{imgPreview && (
					<div className='relative'>
						<img className='w-full h-full' src={imgPreview} />
						<div className='absolute top-[10px] right-[10px]'>
							<DeleteButton color='red' handleClick={handleDeleteImage} />
						</div>
					</div>
				)}
				<ImageUploadButton
					type='business'
					imageFile={imageFile}
					setImageFile={setImageFile}
					setImgPreview={setImgPreview}
				/>
			</div>
			<div className={divClass}>
				<p>
					주소 <span className={requiredClass}>*</span>
				</p>
				<LongInput
					inputData={address}
					disabled={true}
					errorMsg={errorMsgs.addressError}
					placeHolder='주소를 검색해주세요.'
				/>
				<LongInput
					inputData={detailAddress}
					disabled={address === '' ? true : false}
					errorMsg={''}
					placeHolder='자세한 주소 직접 입력'
					onChange={(e) => onInputChange('상세주소', e)}
				/>
				<DaumPost setAddress={setAddress} />
			</div>
			<div className={divClass}>
				<p>
					운영시간 <span className={requiredClass}>*</span>
				</p>
				<LongInput
					inputData={businessItem.businessHours}
					disabled={false}
					errorMsg={errorMsgs.hoursError}
					placeHolder='예시) 월화수목금토 09:00~22:00 일요일 공휴일 휴무'
					onChange={(e) => onInputChange('운영시간', e)}
				/>
			</div>
			<div className={divClass}>
				<p>
					휴대폰번호(숫자만) <span className={requiredClass}>*</span>
				</p>
				<LongInput
					inputData={businessItem.phoneNumber}
					disabled={false}
					errorMsg={errorMsgs.phoneError}
					placeHolder='예시) 01012341234'
					onChange={(e) => onInputChange('번호', e)}
				/>
			</div>
			<div className={divClass}>
				<p>
					이메일 <span className={requiredClass}>*</span>
				</p>
				<LongInput
					inputData={businessItem.email}
					disabled={false}
					errorMsg={errorMsgs.emailError}
					placeHolder='예시) example@gmail.com'
					onChange={(e) => onInputChange('이메일', e)}
				/>
			</div>
		</div>
	);
}

export default BusinessInfoArea;
