import React from 'react';

interface Props {
	size: 'small' | 'big';
	handleClick: () => void;
}

function CompleteButton({ size, handleClick }: Props) {
	const className =
		size === 'small'
			? 'w-[65px] h-[30px] text-white text-[14px] font-bold'
			: 'w-[72px] h-[38px] text-[13px] font-bold text-white ';

	return (
		<button
			className={`rounded-[4px] cursor-pointer bg-p-black ${className}`}
			onClick={handleClick}
		>
			완료
		</button>
	);
}

export default CompleteButton;
