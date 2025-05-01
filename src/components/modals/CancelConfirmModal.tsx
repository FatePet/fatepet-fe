import Image from 'next/image';
import React from 'react';
import ModalButton from '../buttons/ModalButton';

interface Props {
	modalConfirmText: string;
	handleLeftButtonClick: () => void;
	handleRightButtonClick: () => void;
}

function CancelConfirmModal({
	modalConfirmText,
	handleLeftButtonClick,
	handleRightButtonClick,
}: Props) {
	return (
		<div className='w-full py-[20px] h-[201px] max-w-[360px] rounded-[15px] text-[14px] font-bold text-black bg-white'>
			<div className='w-full h-full flex flex-col gap-[20px] justify-center items-center'>
				<Image
					src='/icons/alertIcon.svg'
					width={34}
					height={30}
					alt='경고아이콘'
				/>
				<div className='flex flex-col justify-center items-center'>
					<p className="whitespace-pre-line text-center">{modalConfirmText}</p>
				</div>
				<div className='flex gap-[10px]'>
					<ModalButton
						buttonText='등록 취소'
						handleClick={handleLeftButtonClick}
					/>
					<ModalButton
						buttonText='계속 입력'
						handleClick={handleRightButtonClick}
					/>
				</div>
			</div>
		</div>
	);
}

export default CancelConfirmModal;
