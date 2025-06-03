import React from 'react';

interface Props {
	buttonText: string;
	handleClick: () => void;
	disabled: boolean;
}

function MediumButton({ buttonText, handleClick, disabled }: Props) {
	return (
		<button
			className={`max-w-[89px] h-[38px] rounded-[4px] px-[20px] flex justify-center items-center ${disabled ? 'text-gray-middle bg-gray-lite' : 'text-white bg-p-black'} font-bold text-[13px] cursor-pointer whitespace-nowrap`}
			onClick={() => {
				disabled
					? () => {
							return;
						}
					: handleClick();
			}}
		>
			{buttonText}
		</button>
	);
}

export default MediumButton;
