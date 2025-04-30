import React from 'react';

interface Props {
	buttonText: string;
	handleClick: () => void;
}

function BigButton({ buttonText, handleClick }: Props) {
	const bgColor = buttonText === '로그인' ? 'bg-p-black' : 'bg-black';
	return (
		<button
			className={`w-full h-[50px] rounded-[4px] text-white font-bold text-[20px] ${bgColor}`}
			onClick={handleClick}
		>
			{buttonText}
		</button>
	);
}

export default BigButton;
