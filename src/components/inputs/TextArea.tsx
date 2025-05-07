import React from 'react';

interface Props {
	inputData: string;
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
	maxLength: 200 | 500 | 2000;
	placeholder: string;
}

function TextArea({ inputData, onChange, maxLength, placeholder }: Props) {
	const height = maxLength === 200 ? 'h-[101px]' : 'h-[192px]'
	return (
		<div className='w-full flex flex-col gap-[2px] items-end'>
			<textarea
				className={`w-full ${height} focus:outline-none border border-black p-[14px] text-[14px] font-medium text-[#010101] resize-none`}
				value={inputData}
				onChange={onChange}
				maxLength={maxLength}
				placeholder={placeholder}
			/>
			<div className='text-[14px] font-medium text-[#010101]'>
				{inputData.length}
				<span className='text-[#B3B3B3]'>/{maxLength}</span>
			</div>
		</div>
	);
}

export default TextArea;
