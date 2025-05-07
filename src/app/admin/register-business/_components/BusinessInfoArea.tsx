import BigButton from '@/components/buttons/BigButton';
import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import React, { useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import DeleteButton from '@/components/buttons/DeleteButton';

const divClass = 'flex flex-col gap-[5px] font-bold';
const requiredClass = 'text-p-red';

function BusinessInfoArea() {
	const [businessName, setBusinessName] = useState<string>('');
	const [category, setCategory] = useState<string>('장묘');
	const [businessHours, setBusinessHours] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [imageFile, setImageFile] = useState<string | File | null>(null);
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
		setCategory(category);
	};

	const onInputChange = (
		type: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		switch (type) {
			case '업체명':
				setBusinessName(e.target.value);
				break;
			case '운영시간':
				setBusinessHours(e.target.value);
				break;
			case '번호':
				setPhoneNumber(e.target.value);
				break;
			case '이메일':
				setEmail(e.target.value);
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
				<LongInput
					inputData={businessName}
					disabled={false}
					errorMsg=''
					placeHolder='예시) (주)페이트펫'
					onChange={(e) => onInputChange('업체명', e)}
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
							isClicked={category === business.category}
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
					imageFile={imageFile}
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
					inputData={businessHours}
					disabled={false}
					errorMsg=''
					placeHolder='예시) 월화수목금토 09:00~22:00 일요일 공휴일 휴무'
					onChange={(e) => onInputChange('운영시간', e)}
				/>
			</div>
			<div className={divClass}>
				<p>
					휴대폰번호(숫자만) <span className={requiredClass}>*</span>
				</p>
				<LongInput
					inputData={phoneNumber}
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
					inputData={email}
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
