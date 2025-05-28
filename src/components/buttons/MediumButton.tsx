import React from 'react';

interface Props {
	buttonText: string;
	handleClick: () => void;
}

function MediumButton({ buttonText, handleClick }: Props) {
	return (
		<button
			className='miax-w-[89px] h-[38px] rounded-[4px] px-[20px] flex justify-center items-center text-white font-bold text-[13px] cursor-pointer bg-p-black whitespace-nowrap'
			onClick={handleClick}
		>
			{buttonText}
		</button>
	);
}

export default MediumButton;
