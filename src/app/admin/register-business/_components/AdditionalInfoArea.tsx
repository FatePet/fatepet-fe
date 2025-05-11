import DeleteButton from '@/components/buttons/DeleteButton';
import TextArea from '@/components/inputs/TextArea';
import React, { useEffect, useState } from 'react';
import ImageUploadButton from './ImageUploadButton';

interface Props {
	additionalImgFileList: (File | null)[];
	setAdditionalImgFileList: React.Dispatch<
		React.SetStateAction<(File | null)[]>
	>;
	businessItem: IPostCreateBusinessRequestType;
	setBusinessItem: React.Dispatch<
		React.SetStateAction<IPostCreateBusinessRequestType>
	>;
}

function AdditionalInfoArea({
	additionalImgFileList,
	setAdditionalImgFileList,
	businessItem,
	setBusinessItem,
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
			setAdditionalImgFileList((prev) => [...prev, additionalImgFile as File]);
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
		if (additionalImgFileList.length >= 10 && imgPreviewList.length >= 10) {
			return true;
		} else {
			return false;
		}
	};

	const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBusinessItem({ ...businessItem, additionalInfo: e.target.value });
	};

	const handleDeleteImage = (index: number) => {
		setAdditionalImgFileList((prev) => prev.filter((_, i) => i !== index));
		setImgPreviewList((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<div className='flex flex-col gap-[20px]'>
			<div className='flex flex-col gap-[10px]'>
				{imgPreviewList &&
					imgPreviewList.map((img, idx) => (
						<div className='relative' key={idx}>
							<img className='w-full h-full' src={img} />
							<div className='absolute top-[10px] right-[10px]'>
								<DeleteButton
									color='red'
									handleClick={() => handleDeleteImage(idx)}
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
					inputData={businessItem.additionalInfo}
					onChange={onTextAreaChange}
					maxLength={500}
				/>
			</div>
		</div>
	);
}

export default AdditionalInfoArea;
