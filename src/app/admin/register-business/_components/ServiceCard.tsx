import BigButton from '@/components/buttons/BigButton';
import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import TextArea from '@/components/inputs/TextArea';
import React, { useEffect, useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import ModalLayout from '@/components/modals/ModalLayout';
import CancelConfirmModal from '@/components/modals/CancelConfirmModal';

const divClass = 'flex flex-col gap-[5px] font-bold';
const requiredClass = 'text-p-red';

interface Props {
	serviceCount: number;
	serviceItem: IServiceItemType;
	setServiceList: React.Dispatch<React.SetStateAction<IServiceItemType[]>>;
	serviceImageList: (File | null)[];
	setServiceImageList: React.Dispatch<React.SetStateAction<(File | null)[]>>;
	errorMsg: string;
}

function ServiceCard({
	serviceCount,
	serviceItem,
	setServiceList,
	serviceImageList,
	setServiceImageList,
	errorMsg,
}: Props) {
	const [serviceImgFile, setServiceImgFile] = useState<string | File | null>(
		null,
	);
	const [serviceImgPreview, setServiceImgPreview] = useState<string | null>(
		null,
	);
	const [isOpenServiceDeleteModal, setIsOpenServiceDeleteModal] =
		useState<boolean>(false);

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

	useEffect(() => {
		const targetIndex = serviceCount - 1;
		const updatedImageFlag = serviceImgFile !== null;

		setServiceList((prev) =>
			prev.map((item, index) =>
				index === targetIndex ? { ...item, image: updatedImageFlag } : item,
			),
		);

		const imgFile =
			serviceImgFile instanceof File ? (serviceImgFile as File) : null;

		setServiceImageList((prev) => {
			if (prev.length === serviceCount) {
				return prev.map((item, index) =>
					index === targetIndex ? imgFile : item,
				);
			} else {
				return [...prev, imgFile];
			}
		});
	}, [serviceImgFile]);

	const handleTypeClick = (type: string) => {
		setServiceList((prev) =>
			prev.map((item, index) =>
				index === serviceCount - 1 ? { ...item, type: type } : item,
			),
		);
	};

	const handlePriceTypeClick = (type: string) => {
		setServiceList((prev) =>
			prev.map((item, index) =>
				index === serviceCount - 1 ? { ...item, priceType: type } : item,
			),
		);
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setServiceList((prev) =>
			prev.map((item, index) =>
				index === serviceCount - 1 ? { ...item, name: e.target.value } : item,
			),
		);
	};

	const onTextAreaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		type: string,
	) => {
		switch (type) {
			case 'info':
				setServiceList((prev) =>
					prev.map((item, index) =>
						index === serviceCount - 1
							? { ...item, desc: e.target.value }
							: item,
					),
				);
				break;
			case 'price':
				setServiceList((prev) =>
					prev.map((item, index) =>
						index === serviceCount - 1
							? { ...item, price: e.target.value }
							: item,
					),
				);
				break;
		}
	};

	const handleDeleteImage = () => {
		setServiceImgFile(null);
		setServiceImgPreview(null);
		setServiceImageList((prev) =>
			prev.map((item, index) => (index === serviceCount - 1 ? null : item)),
		);
	};

	const handleLeftButtonClick = () => {
		setIsOpenServiceDeleteModal(false);
		setServiceList((prevList) =>
			prevList.filter((_, index) => index !== serviceCount - 1),
		);
	};

	const handleRightButtonClick = () => {
		setIsOpenServiceDeleteModal(false);
	};

	return (
		<div className='w-[100%] rounded-[12px] border border-p-green-lite overflow-hidden'>
			<div className='bg-p-black h-[50px] min-w-[343px] flex items-center px-[20px] justify-between'>
				<p className='text-white text-[20px] font-bold'>
					서비스 {serviceCount}
				</p>
				{serviceCount > 1 && (
					<DeleteButton
						color='red'
						handleClick={() => {
							setIsOpenServiceDeleteModal(true);
						}}
					/>
				)}
			</div>
			<div className='bg-[#FBFFF2] flex flex-col gap-[20px] p-[20px]'>
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
								isClicked={serviceItem.type === item.type}
							/>
						))}
					</div>
				</div>
				<div className={divClass}>
					<p>
						서비스 명 <span className={requiredClass}>*</span>
					</p>
					<LongInput
						inputData={serviceItem.name}
						disabled={false}
						onChange={onInputChange}
						errorMsg={errorMsg}
						placeHolder='서비스 명을 입력해주세요.'
					/>
				</div>
				<div className={divClass}>
					<p>서비스 설명</p>
					<TextArea
						type='service'
						inputData={serviceItem.desc}
						onChange={(e) => onTextAreaChange(e, 'info')}
						maxLength={500}
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
						type={`service${serviceCount}`}
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
								isClicked={serviceItem.priceType === price.priceType}
							/>
						))}
					</div>
					{serviceItem.priceType === '직접입력' && (
						<TextArea
							type='price'
							inputData={serviceItem.price}
							onChange={(e) => onTextAreaChange(e, 'price')}
							maxLength={500}
						/>
					)}
				</div>
			</div>
			{isOpenServiceDeleteModal && (
				<ModalLayout setIsModalOpen={setIsOpenServiceDeleteModal}>
					<CancelConfirmModal
						modalConfirmText={`입력하신 정보가 저장되지 않았어요.\n 해당 서비스를 정말 삭제하실 건가요?`}
						leftButtonText='취소'
						rightButtonText='확인'
						handleLeftButtonClick={handleLeftButtonClick}
						handleRightButtonClick={handleRightButtonClick}
						rightButtonText='계속 입력'
						leftButtonText='서비스 삭제'
					/>
				</ModalLayout>
			)}
		</div>
	);
}

export default ServiceCard;
