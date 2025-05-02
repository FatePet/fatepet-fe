import React from 'react';

interface Props {
	inputData: string;
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

function TextArea({ inputData, onChange }: Props) {
	return (
		<div className='w-full flex flex-col gap-[2px] items-end'>
			<textarea
				className='w-full h-[192px] focus:outline-none border border-black p-[14px] text-[14px] font-medium text-[#010101] resize-none'
				value={inputData}
				onChange={onChange}
				maxLength={500}
				placeholder='서비스에 대해서 자세하게 적어주세요.'
			/>
			<div className='text-[14px] font-medium text-[#010101]'>
				{inputData.length}
				<span className='text-[#B3B3B3]'>/500</span>
			</div>
		</div>
	);
}

export default TextArea;
