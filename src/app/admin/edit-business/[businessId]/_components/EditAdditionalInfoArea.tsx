import ImageUploadButton from '@/app/admin/register-business/_components/ImageUploadButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import TextArea from '@/components/inputs/TextArea';
import React, { useEffect, useState } from 'react';

interface Props {
	imgCount?: number;
	addAdditionalImgFileList: (File | null)[];
	setAddAdditionalImgFileList: React.Dispatch<
		React.SetStateAction<(File | null)[]>
	>;
	originBusinessItem: IBusinessDetailDataType;
	setOriginBusinessItem: React.Dispatch<
		React.SetStateAction<IBusinessDetailDataType>
	>;
	patchBusinessItem: IPatchBusinessRequestType;
	setPatchBusinessItem: React.Dispatch<
		React.SetStateAction<IPatchBusinessRequestType>
	>;
	setRemoveAdditionalImgaIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function EditAdditionalInfoArea({
	imgCount,
	setAddAdditionalImgFileList,
	setPatchBusinessItem,
	setRemoveAdditionalImgaIds,
	setOriginBusinessItem,
	patchBusinessItem,
	originBusinessItem,
}: Props) {
	const [additionalImgFile, setAdditionalImgFile] = useState<
		string | File | null
	>(null);
	const [imgPreview, setImgPreview] = useState<string | null>(null);
	const [imgPreviewList, setImgPreviewList] = useState<string[]>([]);

	useEffect(() => {
		if (checkIsLengthOver() === true) {
			alert('기타 사진은 10장까지 업로드 가능합니다.');
			return;
		} else if (additionalImgFile != null) {
			setAddAdditionalImgFileList((prev) => [
				...prev,
				additionalImgFile as File,
			]);
		}
	}, [additionalImgFile]);

	useEffect(() => {
		if (checkIsLengthOver() === true) {
			return;
		} else if (imgPreview != null) {
			setImgPreviewList((prev) => [...prev, imgPreview]);
		}
	}, [imgPreview]);

	const checkIsLengthOver = (): boolean => {
		if (imgCount && imgCount >= 10) {
			return true;
		} else {
			return false;
		}
	};

	const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPatchBusinessItem((prev) => ({
			...prev,
			additionalInfo: e.target.value,
		}));
	};

	const handleDeleteImage = (index: number, isOrigin: boolean) => {
		if (isOrigin) {
			setOriginBusinessItem((prev) => ({
				...prev,
				additionalInfo: {
					...prev.additionalInfo,
					images: prev.additionalInfo.images.filter(
						(_, imgIdx) => imgIdx !== index,
					),
				},
			}));
			setRemoveAdditionalImgaIds((prev) => [...prev, index]);
		} else {
			// setOriginAdditionalImgFileList((prev) =>
			// 			prev.filter((_, i) => i !== index),
			// 		);
			setImgPreviewList((prev) => prev.filter((_, i) => i !== index));
		}
	};

	return (
		<div className='flex flex-col gap-[20px]'>
			<div className='flex flex-col gap-[10px]'>
				{originBusinessItem &&
					originBusinessItem.additionalInfo.images.map((img, idx) => (
						<div className='relative' key={idx}>
							<img className='w-full h-full' src={img.url} />
							<div className='absolute top-[10px] right-[10px]'>
								<DeleteButton
									color='red'
									handleClick={() => handleDeleteImage(idx, true)}
								/>
							</div>
						</div>
					))}
				{imgPreviewList &&
					imgPreviewList.map((img, idx) => (
						<div className='relative' key={idx}>
							<img className='w-full h-full' src={img} />
							<div className='absolute top-[10px] right-[10px]'>
								<DeleteButton
									color='red'
									handleClick={() => handleDeleteImage(idx, false)}
								/>
							</div>
						</div>
					))}
				<ImageUploadButton
					type='more'
					imageFile={additionalImgFile}
					setImageFile={setAdditionalImgFile}
					setImgPreview={setImgPreview}
				/>
			</div>
			<div>
				<TextArea
					type='more'
					inputData={
						patchBusinessItem.additionalInfo ??
						originBusinessItem.additionalInfo.description
					}
					onChange={onTextAreaChange}
					maxLength={500}
				/>
			</div>
		</div>
	);
}

export default EditAdditionalInfoArea;
