'use client';
import React from 'react';

interface Props {
	inputData: string;
	disabled: boolean;
	placeHolder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMsg: string;
	inputType?: string;
}

function LongInput({
	inputData,
	disabled,
	placeHolder,
	onChange,
	errorMsg,
	inputType,
}: Props) {
	return (
		<div className='w-full flex flex-col gap-[2px]'>
			<input
				className={`w-full px-[14px] font-medium text-[13px] h-[38px] rounded-[4px] focus:outline-none border ${
					disabled ? 'border-[#AEAEAE] bg-gray-lite' : 'border-black bg-white'
				}`}
				value={inputData}
				placeholder={placeHolder}
				onChange={onChange}
				disabled={disabled}
				type={inputType}
			/>
			<div className='text-[#FF0000] font-bold text-[12px]'>{errorMsg}</div>
		</div>
	);
}

export default LongInput;
