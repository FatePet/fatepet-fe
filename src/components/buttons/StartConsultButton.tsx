import React from 'react';

interface Props {
	handleClick: () => void;
	salePercentageNum: number;
}

function StartConsultButton({ handleClick, salePercentageNum }: Props) {
	return (
		<div
			className='w-[85.87%] h-[69px] cursor-pointer rounded-[34.5px] bg-p-black flex flex-col justify-center items-center'
			onClick={handleClick}
		>
			<div className='text-[20px] font-black text-white'>상담 진행</div>
			<div className='text-[12px] font-medium text-p-blue-lite '>
				페이트펫을 통한 상담 진행시{' '}
				<span className='text-[#858DFF]'>{salePercentageNum}%할인</span>이 적용
				됩니다.
			</div>
		</div>
	);
}

export default StartConsultButton;
