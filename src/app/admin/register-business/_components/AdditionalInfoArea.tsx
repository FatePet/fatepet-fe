import BigButton from '@/components/buttons/BigButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import TextArea from '@/components/inputs/TextArea';
import React, { useState } from 'react';
import ImageUploadButton from './ImageUploadButton';

interface Props {
	additionalImgFile: string | File | null;
	setAdditionalImgFile: React.Dispatch<
		React.SetStateAction<string | File | null>
	>;
	businessItem: IPostCreateBusinessRequestType;
	setBusinessItem: React.Dispatch<
		React.SetStateAction<IPostCreateBusinessRequestType>
	>;
}

function AdditionalInfoArea({
	additionalImgFile,
	setAdditionalImgFile,
	businessItem,
	setBusinessItem,
}: Props) {
	const [imgPreview, setImgPreview] = useState<string | null>(null);

	const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBusinessItem({ ...businessItem, additionalInfo: e.target.value });
	};

	const handleDeleteImage = () => {
		setAdditionalImgFile(null);
		setImgPreview(null);
	};

	return (
		<div className='flex flex-col gap-[20px]'>
			<div className='flex flex-col gap-[10px]'>
				{imgPreview && (
					<div className='relative'>
						<img className='w-full h-full' src={imgPreview} />
						<div className='absolute top-[10px] right-[10px]'>
							<DeleteButton color='red' handleClick={handleDeleteImage} />
						</div>
					</div>
				)}
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
