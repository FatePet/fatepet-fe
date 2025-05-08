import React, { useEffect } from 'react';

interface Props {
	setImgPreview: React.Dispatch<React.SetStateAction<string | null>>;
	imageFile: string | File | null;
	setImageFile: React.Dispatch<React.SetStateAction<string | File | null>>;
	type: string;
}

function ImageUploadButton({
	setImgPreview,
	imageFile,
	setImageFile,
	type,
}: Props) {
	useEffect(() => {
		if (imageFile instanceof File) {
			const objectUrl = URL.createObjectURL(imageFile);
			setImgPreview(objectUrl);
			return () => URL.revokeObjectURL(objectUrl);
		} else if (typeof imageFile === 'string') {
			setImgPreview(imageFile);
		} else {
			setImgPreview(null);
		}
	}, [imageFile]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const validExtensions = ['jpg', 'jpeg', 'png'];
			const fileExtension = file.name.split('.').pop()?.toLowerCase();

			if (!fileExtension || !validExtensions.includes(fileExtension)) {
				alert('이미지 형식에 맞지 않습니다. (허용: jpg, jpeg, png)');
				return;
			}

			const maxFileSize = 5 * 1024 * 1024;
			if (file.size > maxFileSize) {
				alert('파일이 너무 큽니다. (최대: 5MB)');
				return;
			}
			setImageFile(file);
		}
	};
	return (
		<label
			htmlFor={`image-upload${type}`}
			className='w-full h-[50px] rounded-[4px] text-white font-bold text-[20px] bg-p-black flex justify-center items-center cursor-pointer'
		>
			<input
				type='file'
				id={`image-upload${type}`}
				accept='image/*'
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			<p>사진 업로드</p>
		</label>
	);
}

export default ImageUploadButton;
