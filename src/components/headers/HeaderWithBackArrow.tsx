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
		<div className='w-full h-[51px] flex items-center relative text-black bg-white'>
			<img
				src='/images/backArrow.png'
				width={22}
				height={25}
				alt='뒤로가기버튼'
				onClick={handleBackArrowClick}
			/>
			<div className='text-[20px] font-black ml-[15px]'>{headerTitle}</div>
			{hasRightConfirmButton && (
				<div className='ml-auto'>
					<CompleteButton
						size='small'
						handleClick={handleConfirmButtonClick!}
					/>
				</div>
			)}
		</div>
	);
}

export default HeaderWithBackArrow;
