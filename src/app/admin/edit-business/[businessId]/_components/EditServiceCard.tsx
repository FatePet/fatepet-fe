import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import TextArea from '@/components/inputs/TextArea';
import React, { useEffect, useRef, useState } from 'react';
import DeleteButton from '@/components/buttons/DeleteButton';
import ModalLayout from '@/components/modals/ModalLayout';
import CancelConfirmModal from '@/components/modals/CancelConfirmModal';
import ImageUploadButton from '@/app/admin/register-business/_components/ImageUploadButton';
import { useServiceListHandlers } from '@/hooks/admin-business/useServiceListHandlers';

const divClass = 'flex flex-col gap-[5px] font-bold';
const requiredClass = 'text-p-red';

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

interface Props {
	serviceCount: number;
	serviceId?: number;
	serviceIdx: number;
	isOrigin: boolean;
	serviceItem: IServiceItemType | IServiceDetailType;
	setOriginServiceList: React.Dispatch<
		React.SetStateAction<IServiceDetailType[]>
	>;
	updateServiceList: IUpdateServiceItemType[];
	setUpdateServiceList: React.Dispatch<
		React.SetStateAction<IUpdateServiceItemType[]>
	>;
	addServiceList: IServiceItemType[];
	setAddServiceList: React.Dispatch<React.SetStateAction<IServiceItemType[]>>;
	setServiceImageList: React.Dispatch<React.SetStateAction<(File | null)[]>>;
	setUpdateServiceImageList: React.Dispatch<
		React.SetStateAction<(File | null)[]>
	>;
	setAddServiceImageList: React.Dispatch<React.SetStateAction<(File | null)[]>>;
	setRemoveServiceIds: React.Dispatch<React.SetStateAction<number[]>>;
	errorMsg: string;
}

function EditServiceCard({
	serviceCount,
	serviceItem,
	serviceIdx,
	isOrigin,
	serviceId,
	setOriginServiceList,
	updateServiceList,
	setUpdateServiceList,
	addServiceList,
	setAddServiceList,
	setServiceImageList,
	setAddServiceImageList,
	setUpdateServiceImageList,
	setRemoveServiceIds,
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
	const isFirstRender = useRef(true);
	const { handleServiceListChange } = useServiceListHandlers({
		serviceIdx,
		serviceId,
		setOriginServiceList,
		updateServiceList,
		setUpdateServiceList,
		addServiceList,
		setAddServiceList,
		serviceImgPreview,
	});

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if (serviceImgFile === null) return;

		const updatedImageFlag = serviceImgFile !== null;
		const imgFile =
			serviceImgFile instanceof File ? (serviceImgFile as File) : null;

		if (isOrigin) {
			handleServiceListChange('origin', 'image', updatedImageFlag);
			setServiceImageList((prev) => {
				if (prev.length === serviceIdx + 1) {
					return prev.map((item, index) =>
						index === serviceIdx ? imgFile : item,
					);
				} else {
					return [...prev, imgFile];
				}
			});
			handleServiceListChange('update', 'image', updatedImageFlag);
			handleServiceListChange('update', 'imageType', 1);

			setUpdateServiceImageList((prev) => {
				if (prev.length === serviceIdx + 1) {
					return prev.map((item, index) =>
						index === serviceIdx ? imgFile : item,
					);
				} else {
					return [...prev, imgFile];
				}
			});
		} else {
			handleServiceListChange('add', 'image', updatedImageFlag);

			setAddServiceImageList((prev) => {
				if (prev.length === serviceIdx + 1) {
					return prev.map((item, index) =>
						index === serviceIdx ? imgFile : item,
					);
				} else {
					return [...prev, imgFile];
				}
			});
		}
	}, [serviceImgFile]);

	const handleTypeClick = (type: string) => {
		if (isOrigin) {
			handleServiceListChange('origin', 'type', type);
			handleServiceListChange('update', 'type', type);
		} else {
			handleServiceListChange('add', 'type', type);
		}
	};

	const handlePriceTypeClick = (type: string) => {
		if (isOrigin) {
			handleServiceListChange('origin', 'priceType', type);
			handleServiceListChange('update', 'priceType', type);
		} else {
			handleServiceListChange('add', 'priceType', type);
		}
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (isOrigin) {
			handleServiceListChange('origin', 'name', value);
			handleServiceListChange('update', 'name', value);
		} else {
			handleServiceListChange('add', 'name', value);
		}
	};

	const onTextAreaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		type: string,
	) => {
		const value = e.target.value;
		switch (type) {
			case 'info':
				if (isOrigin) {
					handleServiceListChange('origin', 'description', value);
					handleServiceListChange('update', 'description', value);
				} else {
					handleServiceListChange('add', 'description', value);
				}

				break;
			case 'price':
				if (isOrigin) {
					handleServiceListChange('origin', 'price', value);
					handleServiceListChange('update', 'price', value);
				} else {
					handleServiceListChange('add', 'price', value);
				}

				break;
		}
	};

	const handleDeleteImage = () => {
		if (isOrigin && serviceId) {
			handleServiceListChange('update', 'image', false);
			handleServiceListChange('update', 'imageType', 2);
			handleServiceListChange('origin', 'image', false);
			setServiceImgFile(null);
			setServiceImgPreview(null);
			setServiceImageList((prev) =>
				prev.map((item, index) => (index === serviceIdx ? null : item)),
			);
		} else {
			setServiceImgFile(null);
			setServiceImgPreview(null);
			handleServiceListChange('add', 'image', false);
			setAddServiceImageList((prev) =>
				prev.map((item, index) => (index === serviceIdx ? null : item)),
			);
		}
	};

	const handleLeftButtonClick = () => {
		setIsOpenServiceDeleteModal(false);
	};

	const handleRightButtonClick = () => {
		setIsOpenServiceDeleteModal(false);
		if (isOrigin && serviceId) {
			setOriginServiceList((prev) =>
				prev.filter((_, index) => index !== serviceIdx),
			);
			setRemoveServiceIds((prev) => [...prev, serviceId]);
		} else {
			setAddServiceList((prev) =>
				prev.filter((_, index) => index !== serviceIdx),
			);
		}
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
						inputData={serviceItem.description}
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
						imageFile={
							serviceImgFile ??
							('imageUrl' in serviceItem ? serviceItem.imageUrl : '')
						}
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
						handleRightButtonClick={handleRightButtonClick}
						handleLeftButtonClick={handleLeftButtonClick}
						rightButtonText='서비스 삭제'
						leftButtonText='계속 입력'
					/>
				</ModalLayout>
			)}
		</div>
	);
}

export default EditServiceCard;
