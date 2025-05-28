import React from 'react';

interface Props {
	buttonText: string;
	handleClick: () => void;
}

function BigButton({ buttonText, handleClick }: Props) {
	return (
		<button
			className='w-full h-[50px] rounded-[4px] text-white font-bold text-[20px] cursor-pointer bg-p-black'
			onClick={handleClick}
		>
			{buttonText}
		</button>
	);
}

export default BigButton;
