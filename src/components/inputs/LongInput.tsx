'use client';
import React from 'react';

interface Props {
	inputData: string;
	disabled: boolean;
	placeHolder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LongInput({ inputData, disabled, placeHolder, onChange }: Props) {
	return (
		<input
			className={`w-full px-[14px] font-medium text-[13px] h-[38px] rounded-[4px] focus:outline-none border ${
				disabled ? 'border-[#AEAEAE] bg-[#D9D9D9]' : 'border-p-black bg-p-white'
			}`}
			value={inputData}
			placeholder={placeHolder}
			onChange={onChange}
			disabled={disabled}
		/>
	);
}

export default LongInput;
