import React from 'react';

interface Props {
	color: 'red' | 'black';
	handleClick: () => void;
}

function DeleteButton({ color, handleClick }: Props) {
	const className =
		color === 'red'
			? 'w-[65px] h-[30px] bg-p-red rounded-[4px] text-white text-[14px] font-bold'
			: 'w-[50px] h-[20px] bg-p-black text-white font-semibold text-[10px]';

	return (
		<button className={`cursor-pointer ${className}`} onClick={handleClick}>
			삭제
		</button>
	);
}

export default DeleteButton;
