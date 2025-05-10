import React from 'react';
import CompleteButton from '../buttons/CompleteButton';
import { MiniButton } from '../buttons/MiniButton';

interface Props {
	headerTitle: string;
	handleBackArrowClick: () => void;
	hasRightConfirmButton: boolean;
	handleRightButtonClick?: () => void;
	type?: "확인" | "수정"
}

function HeaderWithBackArrow({
	headerTitle,
	handleBackArrowClick,
	hasRightConfirmButton,
	handleRightButtonClick,
	type = "확인"
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
					{type === "확인" ? <CompleteButton
						size='small'
						handleClick={handleRightButtonClick!}
					/>
						:
						<MiniButton buttonText='정보 수정' handleClick={handleRightButtonClick!} isClicked={true} />
				}
					
				</div>
			)}
		</div>
	);
}

export default HeaderWithBackArrow;
