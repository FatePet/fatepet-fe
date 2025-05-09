'use client';
import React from 'react';
import MediumButton from '../buttons/MediumButton';

interface Props {
	inputData: string;
	placeHolder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMsg: string;
	inputType?: string;
	buttonText: string;
	handleButtonClick: () => void;
}

function RightButtonInput({
	inputData,
	placeHolder,
	onChange,
	errorMsg,
	inputType,
	buttonText,
	handleButtonClick,
}: Props) {
	return (
		<div className='w-full flex flex-col gap-[2px]'>
			<div className='flex gap-[10px]'>
				<input
					className='w-full min-w-[250px] px-[14px] font-medium text-[13px] h-[38px] rounded-[4px] focus:outline-none border '
					value={inputData}
					placeholder={placeHolder}
					onChange={onChange}
					type={inputType}
				/>
				<MediumButton buttonText={buttonText} handleClick={handleButtonClick} />
			</div>
			<div className='text-[#FF0000] font-bold text-[12px]'>{errorMsg}</div>
		</div>
	);
}

export default RightButtonInput;
