import BigButton from '@/components/buttons/BigButton';
import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import React, { useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import RightButtonInput from '@/components/inputs/RightButtonInput';

const divClass = 'flex flex-col gap-[5px] font-bold';
const requiredClass = 'text-p-red';

interface IerrorMsgType {
	nameError: string;
	hoursError: string;
	phoneError: string;
	emailError: string;
}

interface Props {
	businessItem: IPostCreateBusinessRequestType;
	setBusinessItem: React.Dispatch<
		React.SetStateAction<IPostCreateBusinessRequestType>
	>;
	errorMsgs: IerrorMsgType;
	setErrorMsgs: React.Dispatch<React.SetStateAction<IerrorMsgType>>;
	setImageFile: React.Dispatch<React.SetStateAction<string | File | null>>;
}

function BusinessInfoArea({
	businessItem,
	setBusinessItem,
	setImageFile,
}: Props) {
	const [imgPreview, setImgPreview] = useState<string | null>(null);

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

	const handleCategoryClick = (category: string) => {
		setBusinessItem({ ...businessItem, type: category });
	};

	const onInputChange = (
		type: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		switch (type) {
			case '업체명':
				setBusinessItem({ ...businessItem, name: e.target.value });
				break;
			case '운영시간':
				setBusinessItem({ ...businessItem, businessHours: e.target.value });
				break;
			case '번호':
				setBusinessItem({ ...businessItem, phoneNumber: e.target.value });
				break;
			case '이메일':
				setBusinessItem({ ...businessItem, email: e.target.value });
				break;
		}
	};

	const handleDeleteImage = () => {
		setImageFile(null);
		setImgPreview(null);
	};

	const handleCheckDuplicateName = () => {};

	const isValidPhoneNumber = (phoneNumber: string) => {
		const regex = /^010\d{8}$/;
		return regex.test(phoneNumber);
	};

	return (
		<div className='flex flex-col gap-[20px]'>
			<div className={divClass}>
				<p>
					업체명 <span className={requiredClass}>*</span>
				</p>
				<RightButtonInput
					inputData={businessItem.name}
					errorMsg={'업체명을 입력해주세요.'}
					placeHolder='예시) (주)페이트펫'
					onChange={(e) => onInputChange('업체명', e)}
					buttonText='중복확인'
					handleButtonClick={handleCheckDuplicateName}
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
							isClicked={businessItem.type === business.category}
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
					imageFile={businessItem.thumbnail}
					setImageFile={setImageFile}
					setImgPreview={setImgPreview}
				/>
			</div>
			<div className={divClass}>
				<p>
					주소 <span className={requiredClass}>*</span>
				</p>
				<BigButton
					buttonText='주소 검색'
					handleClick={() => {
						return;
					}}
				/>
			</div>
			<div className={divClass}>
				<p>
					운영시간 <span className={requiredClass}>*</span>
				</p>
				<LongInput
					inputData={businessItem.businessHours}
					disabled={false}
					errorMsg='운영시간을 입력해주세요.'
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
					errorMsg='형식이 올바르지 않습니다.'
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
					errorMsg='형식이 올바르지 않습니다.'
					placeHolder='예시) example@gmail.com'
					onChange={(e) => onInputChange('이메일', e)}
				/>
			</div>
		</div>
	);
}

export default BusinessInfoArea;
