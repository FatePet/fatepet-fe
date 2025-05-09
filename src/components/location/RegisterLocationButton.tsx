import React from 'react';

interface Props {
	handleClick: () => void;
}

function RegisterLocationButton({ handleClick }: Props) {
	return (
		<button
			className='w-[77px] h-[22px] rounded-[4px] bg-white text-p-brown font-bold text-[12px]'
			onClick={handleClick}
		>
			내 위치 설정
		</button>
	);
}

export default RegisterLocationButton;
