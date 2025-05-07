import BigButton from '@/components/buttons/BigButton';
import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import TextArea from '@/components/inputs/TextArea';
import React, { useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import DeleteButton from '@/components/buttons/DeleteButton';

const divClass = 'flex flex-col gap-[5px] font-bold';
const requiredClass = 'text-p-red';

function ServiceCard() {
	const [serviceType, setServiceType] = useState<string>('기본항목');
	const [serviceName, setServiceName] = useState<string>('');
	const [serviceInfo, setServiceInfo] = useState<string>('');
	const [servicePrice, setServicePrice] = useState<string>('직접입력');
	const [servicePriceInfo, setServicePriceInfo] = useState<string>('');
	const [serviceImgFile, setServiceImgFile] = useState<
		string[] | File[] | null
	>(null);
	const [serviceImgPreview, setServiceImgPreview] = useState<string[] | null>(
		null,
	);

	const serviceTypes = [
		{ type: '기본항목' },
		{ type: '선택항목' },
		{ type: '패키지' },
	];

	const servicePriceTypes = [
		{ priceType: '직접입력' },
		{ priceType: '무료' },
		{ priceType: '직접문의' },
	];

	const handleTypeClick = (type: string) => {
		setServiceType(type);
	};

	const handlePriceTypeClick = (type: string) => {
		setServicePrice(type);
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setServiceName(e.target.value);
	};

	const onTextAreaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		type: string,
	) => {
		switch (type) {
			case 'info':
				setServiceInfo(e.target.value);
				break;
			case 'price':
				setServicePriceInfo(e.target.value);
				break;
		}
	};

	const handleDeleteImage = () => {
		setServiceImgFile(null);
		setServiceImgPreview(null);
	};

	return (
		<div className='w-[100%] rounded-[12px] border border-p-blue-lite'>
			<div className='bg-p-black rounded-t-[12px] h-[50px] min-w-[343px] flex items-center pl-[10px]'>
				<p className='text-white text-[20px] font-bold'>서비스 1</p>
			</div>
			<div className='bg-[#F3F4FF] w-[100%] rounded-b-[12px] flex flex-col gap-[20px] p-[20px]'>
				<div className={divClass}>
					<p>
						구분 <span className={requiredClass}>*</span>
					</p>
					<div className='flex gap-[10px]'>
						{serviceTypes.map((item) => (
							<MiniButton
								key={item.type}
								buttonText={item.type}
								handleClick={() => handleTypeClick(item.type)}
								isClicked={serviceType === item.type}
							/>
						))}
					</div>
				</div>
				<div className={divClass}>
					<p>
						서비스 명 <span className={requiredClass}>*</span>
					</p>
					<LongInput
						inputData={serviceName}
						disabled={false}
						onChange={onInputChange}
						errorMsg=''
						placeHolder='서비스 명을 입력해주세요.'
					/>
				</div>
				<div className={divClass}>
					<p>서비스 설명</p>
					<TextArea
						type='service'
						inputData={serviceInfo}
						onChange={(e) => onTextAreaChange(e, 'info')}
					/>
				</div>
				<div className={divClass}>
					<p>서비스 사진 (1장)</p>
					{serviceImgPreview && (
						<div className='relative'>
							<img className='w-full h-full' src={serviceImgPreview} />
							<div className='absolute top-[10px] right-[10px]'>
								<DeleteButton color='red' handleClick={handleDeleteImage} />
							</div>
						</div>
					)}
					<ImageUploadButton
						imageFile={serviceImgFile}
						setImageFile={setServiceImgFile}
						setImgPreview={setServiceImgPreview}
					/>
				</div>
				<div className={divClass}>
					<p>
						서비스 가격<span className={requiredClass}>*</span>
					</p>
					<div className='flex gap-[10px]'>
						{servicePriceTypes.map((price) => (
							<MiniButton
								key={price.priceType}
								buttonText={price.priceType}
								handleClick={() => handlePriceTypeClick(price.priceType)}
								isClicked={servicePrice === price.priceType}
							/>
						))}
					</div>
					<TextArea
						type='price'
						inputData={servicePriceInfo}
						onChange={(e) => onTextAreaChange(e, 'price')}
					/>
				</div>
			</div>
		</div>
	);
}

export default ServiceCard;
