import React from 'react';
import ModalButton from '../buttons/ModalButton';

interface Props {
	modalConfirmText: string;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AlertModal({ modalConfirmText, setIsModalOpen }: Props) {
	const handleConfirmBtnClick = () => {
		setIsModalOpen(false);
	};

	return (
		<div className='bg-white w-full py-[20px] h-[138px] max-w-[360px] rounded-[15px] text-[14px] text-black font-bold'>
			<div className='w-full h-full flex flex-col gap-[20px] justify-center items-center'>
				<div>{modalConfirmText}</div>
				<ModalButton buttonText='확인' handleClick={handleConfirmBtnClick} />
			</div>
		</div>
	);
}

export default AlertModal;
