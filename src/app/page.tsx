'use client';

import { usePathname } from 'next/navigation';
import AdminLogin from './admin/login/page';
import UserMain from './user/main/page';
import LongInput from '@/components/inputs/LongInput';
import { useState } from 'react';
import BigButton from '@/components/buttons/BigButton';
import Image from 'next/image';
import ModalButton from '@/components/buttons/ModalButton';
import RegisterCostButton from '@/components/buttons/RegisterCostButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import RoundedButton from '@/components/buttons/RoundedButton';
import CompleteButton from '@/components/buttons/CompleteButton';
import { MiniButton } from '@/components/buttons/MiniButton';
import TextArea from '@/components/inputs/TextArea';
import Tag from '@/components/tag/Tag';
import StartConsultButton from '@/components/buttons/StartConsultButton';
import ModalLayout from '@/components/modals/ModalLayout';
import CancelConfirmModal from '@/components/modals/CancelConfirmModal';
import AlertModal from '@/components/modals/AlertModal';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import HeaderWithRightbutton from '@/components/headers/HeaderWithRightbutton';
import HeaderWithOnlyText from '@/components/headers/HeaderWithOnlyText';
import ConsultModal from './user/view-store/[storeId]/_components/ConsultModal';

export default function Main() {
	// 공통 컴포넌트
	const [inputData, setInputData] = useState<string>('');
	const [isCancelConfirmModalOpen, setIsCancelConfirmModalOpen] =
		useState<boolean>(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
	const [isRequestCompleteModalOpen, setIsRequestCompleteModalOpen] =
		useState<boolean>(false);
	const [isConsultingModalOpen, setIsConsultingModalOpen] =
		useState<boolean>(false);
	const placeHolder = 'Place Holder';
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const trimmedKeyword = e.target.value.trim();
		setInputData(trimmedKeyword);
	};
	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const trimmedKeyword = e.target.value.trim();
		setInputData(trimmedKeyword);
	};

	// 끝
	const pathname = usePathname();
	if (pathname.startsWith('/admin')) {
		return <AdminLogin />;
	}
	if (pathname.startsWith('/user')) {
		return <UserMain />;
	}

	return (
		<div className='w-full h-full flex flex-col justify-center items-center gap-[20px] overflow-scroll py-[20px]'>
			<div>활성화</div>
			<LongInput
				inputData={inputData}
				onChange={handleInputChange}
				placeHolder={placeHolder}
				disabled={false}
				errorMsg='형식이 올바르지 않습니다.'
			/>
			<div>비활성화</div>
			<LongInput
				inputData={inputData}
				onChange={handleInputChange}
				placeHolder={placeHolder}
				disabled={true}
				errorMsg=''
			/>
			<div>BigButton</div>
			<BigButton
				buttonText='로그인'
				handleClick={() => {
					return;
				}}
			/>
			<BigButton
				buttonText='사진 업로드'
				handleClick={() => {
					return;
				}}
			/>
			<div>등록 버튼</div>
			<Image
				src='/icons/registerIcon.svg'
				width={80}
				height={80}
				alt='등록 버튼'
				className='cursor-pointer'
				onClick={() => {
					return;
				}}
			/>
			<div>공통 모달 버튼</div>
			<div className='flex gap-[20px]'>
				<ModalButton
					buttonText='확인'
					handleClick={() => {
						return;
					}}
				/>
				<ModalButton
					buttonText='등록 취소'
					handleClick={() => {
						return;
					}}
				/>
				<ModalButton
					buttonText='계속 입력'
					handleClick={() => {
						return;
					}}
				/>
			</div>
			<div>RegisterCostButton</div>
			<div className='flex gap-[20px]'>
				<RegisterCostButton
					buttonText='직접 입력'
					handleClick={() => {
						return;
					}}
					isClicked={true}
				/>
				<RegisterCostButton
					buttonText='무료'
					handleClick={() => {
						return;
					}}
					isClicked={false}
				/>
				<RegisterCostButton
					buttonText='직접 문의'
					handleClick={() => {
						return;
					}}
					isClicked={false}
				/>
			</div>
			<div>DeleteButton</div>
			<div className='flex gap-[20px]'>
				<DeleteButton
					color='red'
					handleClick={() => {
						return;
					}}
				/>
				<DeleteButton
					color='black'
					handleClick={() => {
						return;
					}}
				/>
			</div>
			<div>RoundedButton</div>
			<div className='flex gap-[20px]'>
				<RoundedButton
					buttonText='내 위치 설정'
					handleClick={() => {
						return;
					}}
				/>
				<RoundedButton
					buttonText='거리순'
					handleClick={() => {
						return;
					}}
				/>
			</div>
			<div>CompleteButton</div>
			<div className='flex gap-[20px]'>
				<CompleteButton
					size='small'
					handleClick={() => {
						return;
					}}
				/>
				<CompleteButton
					size='big'
					handleClick={() => {
						return;
					}}
				/>
			</div>
			<div>MiniButton</div>
			<div className='flex gap-[20px]'>
				<MiniButton
					buttonText='장묘'
					handleClick={() => {
						return;
					}}
					isClicked={true}
				/>
				<MiniButton
					buttonText='브리더'
					handleClick={() => {
						return;
					}}
					isClicked={false}
				/>
				<MiniButton
					buttonText='악세사리'
					handleClick={() => {
						return;
					}}
					isClicked={false}
				/>
				<MiniButton
					buttonText='행동상담'
					handleClick={() => {
						return;
					}}
					isClicked={false}
				/>
			</div>
			<div className='flex gap-[20px]'>
				<MiniButton
					buttonText='기본항목'
					handleClick={() => {
						return;
					}}
					isClicked={true}
				/>
				<MiniButton
					buttonText='옵션항목'
					handleClick={() => {
						return;
					}}
					isClicked={false}
				/>
				<MiniButton
					buttonText='패키지'
					handleClick={() => {
						return;
					}}
					isClicked={false}
				/>

				<MiniButton
					buttonText='로그아웃'
					handleClick={() => {
						return;
					}}
				/>
			</div>
			<div>TextArea</div>
			<TextArea
				inputData={inputData}
				onChange={handleTextAreaChange}
				maxLength={500}
				placeholder='서비스에 대해서 자세하게 적어주세요.'
			/>
			<div>Tag</div>
			<div className='flex gap-[20px]'>
				<Tag tagText='장묘' />
				<Tag tagText='브리더' />
				<Tag tagText='악세사리' />
			</div>
			<div>StartConsultButton</div>
			<StartConsultButton
				handleClick={() => {
					setIsConsultingModalOpen(true);
				}}
				salePercentageNum={5}
			/>
			{isConsultingModalOpen && (
				<ModalLayout setIsModalOpen={setIsConsultingModalOpen}>
					<ConsultModal
						setIsModalOpen={setIsConsultingModalOpen}
						setIsRequestCompleteModalOpen={setIsRequestCompleteModalOpen}
					/>
				</ModalLayout>
			)}
			{isRequestCompleteModalOpen && (
				<ModalLayout setIsModalOpen={setIsRequestCompleteModalOpen}>
					<AlertModal
						modalConfirmText='상담 요청이 완료되었습니다.'
						setIsModalOpen={setIsRequestCompleteModalOpen}
					/>
				</ModalLayout>
			)}
			<div>CancelConfirmModal</div>
			<button
				className='bg-p-black p-[20px] text-white rounded-[15px]'
				onClick={() => setIsCancelConfirmModalOpen(true)}
			>
				CancelConfirmModal
			</button>
			{isCancelConfirmModalOpen && (
				<ModalLayout setIsModalOpen={setIsCancelConfirmModalOpen}>
					<CancelConfirmModal
						modalConfirmText={`입력하신 정보가 저장되지 않았어요.\n업체 등록을 취소할까요?`}
						handleLeftButtonClick={() => setIsCancelConfirmModalOpen(false)}
						handleRightButtonClick={() => setIsCancelConfirmModalOpen(false)}
					/>
				</ModalLayout>
			)}
			<div>AlertModal</div>
			<button
				className='bg-p-black p-[20px] text-white rounded-[15px]'
				onClick={() => setIsAlertModalOpen(true)}
			>
				AlertModal
			</button>
			{isAlertModalOpen && (
				<ModalLayout setIsModalOpen={setIsAlertModalOpen}>
					<AlertModal
						modalConfirmText='필수 항목을 모두 입력해 주세요.'
						setIsModalOpen={setIsAlertModalOpen}
					/>
				</ModalLayout>
			)}
			<div>HeaderWithBackArrow</div>
			<HeaderWithBackArrow
				headerTitle='장묘'
				handleBackArrowClick={() => {
					return;
				}}
				hasRightConfirmButton={false}
			/>
			<HeaderWithBackArrow
				headerTitle='업체 등록'
				handleBackArrowClick={() => {
					return;
				}}
				hasRightConfirmButton={true}
				handleConfirmButtonClick={() => {
					return;
				}}
			/>
			<div>HeaderWithRightButton</div>
			<div>Admin Main</div>
			<HeaderWithRightbutton
				type='admin'
				headerTitle='내 업체'
				handleButtonClick={() => {
					return;
				}}
			/>
			<div>User Main</div>
			<HeaderWithRightbutton
				type='user'
				headerTitle='내 위치'
				handleButtonClick={() => {
					return;
				}}
			/>
			<div>HeaderWithOnlyText</div>
			<HeaderWithOnlyText headerTitle='내 업체' />
		</div>
	);
}
