import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import React, { useEffect, useState } from 'react';
import DeleteButton from '@/components/buttons/DeleteButton';
import RightButtonInput from '@/components/inputs/RightButtonInput';
import DaumPost from '@/components/location/DaumPost';
import ImageUploadButton from '../../../register-business/_components/ImageUploadButton';
import { useCheckDuplicateName } from '@/hooks/useCheckDuplicateName';

const divClass = 'flex flex-col gap-[5px] font-bold';
const requiredClass = 'text-p-red';

interface Props {
	originBusinessItem: IBusinessDetailDataType;
	patchBusinessItem: IPatchBusinessRequestType;
	setPatchBusinessItem: React.Dispatch<
		React.SetStateAction<IPatchBusinessRequestType>
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

function EditBusinessInfoArea({
	errorMsgs,
	setErrorMsgs,
	originBusinessItem,
	patchBusinessItem,
	setPatchBusinessItem,
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
		patchBusinessItem.name ?? '',
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
			setPatchBusinessItem({ ...patchBusinessItem, address: fullAddress });
		} else {
			setPatchBusinessItem({ ...patchBusinessItem, address: address });
		}
	}, [address, detailAddress]);

	const handleCategoryClick = (category: string) => {
		setPatchBusinessItem({ ...patchBusinessItem, category: category });
	};

	const onInputChange = (
		type: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		switch (type) {
			case '업체명':
				setPatchBusinessItem({ ...patchBusinessItem, name: e.target.value });
				setIsCheckedName(false);
				break;
			case '운영시간':
				setPatchBusinessItem({
					...patchBusinessItem,
					businessHours: e.target.value,
				});
				break;
			case '번호':
				setPatchBusinessItem({
					...patchBusinessItem,
					phoneNumber: e.target.value,
				});
				break;
			case '이메일':
				setPatchBusinessItem({ ...patchBusinessItem, email: e.target.value });
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
					inputData={patchBusinessItem.name ?? originBusinessItem.name}
					errorMsg={errorMsgs.nameError}
					placeHolder='예시) (주)페이트펫'
					onChange={(e) => onInputChange('업체명', e)}
					buttonText='중복확인'
					handleButtonClick={checkDuplicateName}
				/>
				{errorMsgs.nameError !== '' && <p>{errorMsgs.nameError}</p>}
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
							isClicked={
								patchBusinessItem.category
									? patchBusinessItem.category === business.category
									: originBusinessItem.category === business.category
							}
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
					inputData={
						patchBusinessItem.businessHours ?? originBusinessItem.businessHours
					}
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
					inputData={
						patchBusinessItem.phoneNumber ?? originBusinessItem.phoneNumber
					}
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
					inputData={patchBusinessItem.email ?? originBusinessItem.email}
					disabled={false}
					errorMsg={errorMsgs.emailError}
					placeHolder='예시) example@gmail.com'
					onChange={(e) => onInputChange('이메일', e)}
				/>
			</div>
		</div>
	);
}

export default EditBusinessInfoArea;
