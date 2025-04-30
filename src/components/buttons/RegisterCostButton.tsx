import React from 'react';

interface Props {
	buttonText: '직접 입력' | '무료' | '직접 문의';
	handleClick: () => void;
	isClicked: boolean;
}

function RegisterCostButton({ buttonText, handleClick, isClicked }: Props) {
	const clickChangeColor = isClicked
		? 'bg-p-black text-white'
		: 'bg-white text-black';
	return (
		<button
			className={`w-[81px] h-[35px] font-bold text-[14px] rounded-[4px] border border-black cursor-pointer ${clickChangeColor}`}
			onClick={handleClick}
		>
			{buttonText}
		</button>
	);
}

export default RegisterCostButton;
