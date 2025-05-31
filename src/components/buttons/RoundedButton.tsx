import React from 'react';

interface Props {
	buttonText: '거리순' | string;
	handleClick: () => void;
}

function RoundedButton({ buttonText, handleClick }: Props) {
	const className = 'min-w-[56px] h-[30px] p-[5px]';
	return (
		<button
			className={`bg-p-black text-white font-bold text-[12px] rounded-[16px] cursor-pointer ${className}`}
			onClick={handleClick}
		>
			{buttonText}
		</button>
	);
}

export default RoundedButton;
