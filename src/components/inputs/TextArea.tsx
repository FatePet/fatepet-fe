import React, { useEffect, useState } from 'react';

interface Props {
	inputData: string;
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
	maxLength: 200 | 500 | 2000;
	type: 'service' | 'price' | 'more' | 'etc';
}

function TextArea({ inputData, onChange, maxLength, type }: Props) {
	const height = maxLength === 200 ? 'h-[101px]' : 'h-[192px]';
	const [placeholder, setPlaceholer] = useState<string>('');

	useEffect(() => {
		switch (type) {
			case 'service':
				setPlaceholer('서비스에 대해서 자세하게 적어주세요.');
				break;
			case 'price':
				setPlaceholer('가격에 대해서 자세하게 적어주세요.');
				break;
			case 'more':
				setPlaceholer('기타 정보에 대해서 자세하게 적어주세요.');
				break;
			case 'etc':
				setPlaceholer('기타 문의사항');
			default:
				break;
		}
	}, []);

	return (
		<div className='w-full flex flex-col gap-[2px] items-end'>
			<textarea
				className={`w-full ${height} focus:outline-none border border-black p-[14px] text-[14px] font-medium text-[#010101] resize-none rounded-[4px]`}
				value={inputData}
				onChange={onChange}
				maxLength={maxLength}
				placeholder={placeholder}
			/>
			<div className='text-[14px] font-medium text-[#010101]'>
				{inputData && inputData.length}
				<span className='text-[#B3B3B3]'>/{maxLength}</span>
			</div>
		</div>
	);
}

export default TextArea;
