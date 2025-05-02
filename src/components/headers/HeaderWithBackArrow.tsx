import React from 'react';
import CompleteButton from '../buttons/CompleteButton';

interface Props {
	headerTitle: string;
	handleBackArrowClick: () => void;
	hasRightConfirmButton: boolean;
	handleConfirmButtonClick?: () => void;
}

function HeaderWithBackArrow({
	headerTitle,
	handleBackArrowClick,
	hasRightConfirmButton,
	handleConfirmButtonClick,
}: Props) {
	return (
		<div className='w-full h-[51px] flex justify-between items-center relative text-black bg-white'>
			<img
				src='/images/backArrow.png'
				width={22}
				height={25}
				alt='뒤로가기버튼'
				onClick={handleBackArrowClick}
			/>
			<div className='absolute left-1/2 transform -translate-x-1/2 text-[20px] font-black'>
				{headerTitle}
			</div>
			{hasRightConfirmButton && (
				<CompleteButton size='small' handleClick={handleConfirmButtonClick!} />
			)}
		</div>
	);
}

export default HeaderWithBackArrow;
