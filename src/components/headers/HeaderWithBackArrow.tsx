import React from 'react';
import CompleteButton from '../buttons/CompleteButton';
import { MiniButton } from '../buttons/MiniButton';

interface Props {
	headerTitle: string;
	handleBackArrowClick: () => void;
	hasRightConfirmButton: boolean;
	handleRightButtonClick?: () => void;
	type?: '확인' | '수정';
	handleDeleteButtonClick?: () => void;
}

function HeaderWithBackArrow({
	headerTitle,
	handleBackArrowClick,
	hasRightConfirmButton,
	handleRightButtonClick,
	type = '확인',
	handleDeleteButtonClick,
}: Props) {
	return (
		<div className='w-full h-[51px] flex items-center relative text-black bg-white'>
			<img
				src='/images/backArrow.png'
				className='cursor-pointer'
				width={22}
				height={25}
				alt='뒤로가기버튼'
				onClick={handleBackArrowClick}
			/>
			<div className='text-[20px] font-black ml-[15px]'>{headerTitle}</div>
			{hasRightConfirmButton && (
				<div className='ml-auto'>
					{type === '확인' ? (
						<CompleteButton
							size='small'
							handleClick={handleRightButtonClick!}
						/>
					) : (
						<div className='flex gap-[5px]'>
							<MiniButton
								buttonText='정보 수정'
								handleClick={handleRightButtonClick!}
								isClicked={true}
							/>
							<MiniButton
								buttonText='삭제'
								handleClick={handleDeleteButtonClick!}
								isClicked={false}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default HeaderWithBackArrow;
