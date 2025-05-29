import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import TextArea from '@/components/inputs/TextArea';
import React, { useEffect, useState } from 'react';
import DeleteButton from '@/components/buttons/DeleteButton';
import ModalLayout from '@/components/modals/ModalLayout';
import CancelConfirmModal from '@/components/modals/CancelConfirmModal';
import ImageUploadButton from '@/app/admin/register-business/_components/ImageUploadButton';
import { useRouter } from 'next/navigation';

const divClass = 'flex flex-col gap-[5px] font-bold';
const requiredClass = 'text-p-red';

interface Props {
	serviceCount: number;
	serviceId?: number;
	serviceIdx: number;
	isOrigin: boolean;
	serviceItem: IServiceItemType | IServiceDetailType;
	setOriginServiceList: React.Dispatch<
		React.SetStateAction<IServiceDetailType[]>
	>;
	setUpdateServiceList: React.Dispatch<
		React.SetStateAction<IUpdateServiceItemType[]>
	>;
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
	setUpdateServiceList,
	setAddServiceList,
	setServiceImageList,
	setAddServiceImageList,
	setUpdateServiceImageList,
	setRemoveServiceIds,
	errorMsg,
}: Props) {
	const router = useRouter();
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
		if ('imageUrl' in serviceItem) {
			setServiceImgPreview(serviceItem.imageUrl);
		}
	}, [serviceItem]);

	useEffect(() => {
		const targetIndex = serviceIdx - 1;
		const updatedImageFlag = serviceImgFile !== null;

		const imgFile =
			serviceImgFile instanceof File ? (serviceImgFile as File) : null;

		if (isOrigin) {
			setOriginServiceList((prev) =>
				prev.map((item, index) =>
					index === targetIndex ? { ...item, image: updatedImageFlag } : item,
				),
			);
			setServiceImageList((prev) => {
				if (prev.length === serviceIdx) {
					return prev.map((item, index) =>
						index === targetIndex ? imgFile : item,
					);
				} else {
					return [...prev, imgFile];
				}
			});
			setUpdateServiceList((prev) =>
				prev.map((item, index) =>
					index === targetIndex ? { ...item, image: updatedImageFlag } : item,
				),
			);
			setUpdateServiceImageList((prev) => {
				if (prev.length === serviceIdx) {
					return prev.map((item, index) =>
						index === targetIndex ? imgFile : item,
					);
				} else {
					return [...prev, imgFile];
				}
			});
		} else {
			setAddServiceList((prev) =>
				prev.map((item, index) =>
					index === targetIndex ? { ...item, image: updatedImageFlag } : item,
				),
			);
			setAddServiceImageList((prev) => {
				if (prev.length === serviceIdx) {
					return prev.map((item, index) =>
						index === targetIndex ? imgFile : item,
					);
				} else {
					return [...prev, imgFile];
				}
			});
		}
	}, [serviceImgFile]);

	const handleTypeClick = (type: string) => {
		if (isOrigin) {
			setOriginServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, type: type } : item,
				),
			);
			setUpdateServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, type: type } : item,
				),
			);
		} else {
			setAddServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, type: type } : item,
				),
			);
		}
	};

	const handlePriceTypeClick = (type: string) => {
		if (isOrigin) {
			setOriginServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, priceType: type } : item,
				),
			);
			setUpdateServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, priceType: type } : item,
				),
			);
		} else {
			setAddServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, priceType: type } : item,
				),
			);
		}
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isOrigin) {
			setOriginServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, name: e.target.value } : item,
				),
			);
			setUpdateServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, name: e.target.value } : item,
				),
			);
		} else {
			setAddServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, name: e.target.value } : item,
				),
			);
		}
	};

	const onTextAreaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		type: string,
	) => {
		switch (type) {
			case 'info':
				if (isOrigin) {
					setOriginServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx - 1
								? { ...item, description: e.target.value }
								: item,
						),
					);
					setUpdateServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx - 1
								? { ...item, description: e.target.value }
								: item,
						),
					);
				} else {
					setAddServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx - 1
								? { ...item, description: e.target.value }
								: item,
						),
					);
				}

				break;
			case 'price':
				if (isOrigin) {
					setOriginServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx - 1
								? { ...item, price: e.target.value }
								: item,
						),
					);
					setUpdateServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx - 1
								? { ...item, price: e.target.value }
								: item,
						),
					);
				} else {
					setAddServiceList((prev) =>
						prev.map((item, index) =>
							index === serviceIdx - 1
								? { ...item, price: e.target.value }
								: item,
						),
					);
				}

				break;
		}
	};

	const handleDeleteImage = () => {
		if (isOrigin && serviceId) {
			setServiceImgFile(null);
			setServiceImgPreview(null);
			setServiceImageList((prev) =>
				prev.map((item, index) => (index === serviceIdx - 1 ? null : item)),
			);

			// setOriginServiceList((prev) =>
			// 	prev.map((item) =>
			// 		item.serviceId === serviceId ? { ...item, image: false } : item,
			// 	),
			// );

			setRemoveServiceIds((prev) => [...prev, serviceId]);
		} else {
			setAddServiceList((prev) =>
				prev.map((item, index) =>
					index === serviceIdx - 1 ? { ...item, image: false } : item,
				),
			);
			setAddServiceImageList((prev) =>
				prev.map((item, index) => (index === serviceIdx - 1 ? null : item)),
			);
		}
	};

	const handleLeftButtonClick = () => {
		setIsOpenServiceDeleteModal(false);
	};

	const handleRightButtonClick = () => {
		setIsOpenServiceDeleteModal(false);
		// setServiceList((prev) =>
		// 	prev.filter((_, index) => index !== serviceIdx - 1),
		// );
		router.back();
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
