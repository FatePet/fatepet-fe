'use client';
import { MiniButton } from '@/components/buttons/MiniButton';
import LongInput from '@/components/inputs/LongInput';
import TextArea from '@/components/inputs/TextArea';
import AlertModal from '@/components/modals/AlertModal';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsRequestCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConsultModal({ setIsModalOpen,setIsRequestCompleteModalOpen }: Props) {
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [phoneNumberInputError, setPhoneNumberInputError] =
		useState<string>('');
	const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] =
		useState<boolean>(false);
	const [otherInquiries, setOtherInquiries] = useState<string>('');
	const [consultType, setConsultType] = useState<'문자' | '전화'>('문자');
	

	const handleCancelBtnClick = () => {
		setIsModalOpen(false);
	};

    const handleConsultingBtnClick = () => {
        setIsRequestCompleteModalOpen(true);
		setIsModalOpen(false);
	};

	const handleConsultTypeBtnClick = (type: '문자' | '전화') => {
		if (consultType === type) {
			return;
		}
		setConsultType(type);
	};

	const handleCheckIconClick = () => {
		setIsPrivacyPolicyAgreed((prev) => !prev);
	};

    const handlePrivacyPolicyClick = () => {
        // 노션 페이지로 이동해야함
    };

	const handlePhoneNumberInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const trimmedPhoneNumber = e.target.value.trim();
		setPhoneNumber(trimmedPhoneNumber);
		const isValid = /^\d*$/.test(trimmedPhoneNumber);

		if (!isValid || trimmedPhoneNumber.length > 11) {
			setPhoneNumberInputError('형식이 올바르지 않습니다.');
		} else {
			setPhoneNumberInputError('');
		}
	};

	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setOtherInquiries(e.target.value);
	};

	return (
		<div className='bg-white w-full px-[10px] py-[20px] h-[572px] max-w-[360px] rounded-[15px] text-black font-black'>
			<div className='w-full h-full flex flex-col gap-[20px] justify-center'>
				<div className='text-[20px]'>
					<p>고객님의 연락처로</p>
					<p>상담을 진행합니다.</p>
				</div>
				<div className='text-[14px] flex flex-col gap-[5px]'>
					<div>
						상담 방식 <span className='text-p-red'>*</span>
					</div>
					<div className='flex gap-[5px]'>
						<MiniButton
							buttonText='문자'
							handleClick={() => handleConsultTypeBtnClick('문자')}
							isClicked={consultType === '문자'}
						/>
						<MiniButton
							buttonText='전화'
							handleClick={() => handleConsultTypeBtnClick('전화')}
							isClicked={consultType === '전화'}
						/>
					</div>
				</div>
				<div className='text-[14px] flex flex-col gap-[5px]'>
					<div>
						휴대폰번호(숫자만) <span className='text-p-red'>*</span>
					</div>
					<LongInput
						inputData={phoneNumber}
						placeHolder='예시) 01012341234'
						disabled={false}
						onChange={handlePhoneNumberInputChange}
						errorMsg={phoneNumberInputError}
					/>
				</div>
				<TextArea
					inputData={otherInquiries}
					onChange={handleTextAreaChange}
					maxLength={200}
					type="etc"
				/>
				<div className='text-[14px] flex gap-[3px] justify-end'>
					<div>
						개인정보 활용에 동의합니다 <span className='text-p-red'>*</span>
					</div>
					{isPrivacyPolicyAgreed ? (
						<Image
							src='/icons/checkOnIcon.svg'
							alt='체크아이콘'
							width={27}
							height={27}
							className='cursor-pointer'
							onClick={handleCheckIconClick}
						/>
					) : (
						<Image
							src='/icons/checkOffIcon.svg'
							alt='체크아이콘'
							width={27}
							height={27}
							className='cursor-pointer'
							onClick={handleCheckIconClick}
						/>
					)}
				</div>
				<div
					className='flex gap-[5px] text-[14px] text-gray-middle justify-end cursor-pointer'
					onClick={handlePrivacyPolicyClick}
				>
					<div>개인정보 처리방침</div>
					<Image
						src='/icons/rightArrowIcon.svg'
						alt='arrowIcon'
						width={8}
						height={14}
					/>
				</div>
				<div className='flex justify-between text-[20px] text-white font-bold gap-[10px]'>
					<button
						className='flex-1 h-[52px] rounded-[4px] border border-gray-middle bg-gray-middle'
						onClick={handleCancelBtnClick}
					>
						취소
					</button>
					<button
						className='flex-[2] h-[52] rounded-[4px] border border-p-blue bg-p-blue'
						onClick={handleConsultingBtnClick}
					>
						상담요청
					</button>
				</div>
			</div>
			
		</div>
	);
}

export default ConsultModal;
