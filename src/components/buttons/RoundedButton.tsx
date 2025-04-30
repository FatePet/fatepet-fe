import React from 'react';

interface Props {
	buttonText: '내 위치 설정' | '거리순';
	handleClick: () => void;
}

function RoundedButton({ buttonText, handleClick }: Props) {
	const className =
		buttonText === '거리순' ? 'w-[56px] h-[30px] ' : 'w-[79px] h-[28px]';
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
