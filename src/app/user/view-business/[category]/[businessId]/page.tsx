'use client';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import TextWithUnderLine from './_components/TextWithUnderLine';
import PrimaryServiceList from './_components/PrimaryServiceList';
import OptionalServiceList from './_components/OptionalServiceList';
import PackageServiceList from './_components/PackageServiceList';
import BusinessCard from '@/components/user/BusinessCard';
import AdditionalInfoList from './_components/AdditionalInfoList';
import ConsultModal from './_components/ConsultModal';
import StartConsultButton from '@/components/buttons/StartConsultButton';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertModal from '@/components/modals/AlertModal';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { useGetUserBusinessDetail } from '@/hooks/api/user/business/useGetUserBusinessDetail';
import toast from 'react-hot-toast';

function UserViewBusiness() {
	const router = useRouter();
	const params = useParams();
	const rawCategory = params.category as string;
	const category = decodeURIComponent(rawCategory);
	const businessId = params.businessId as string;
	const [isConsultModalOpen, setIsConsultModalOpen] = useState<boolean>(false);
	const [isRequestSuccessModalOpen, setIsRequestSuccessModalOpen] =
		useState<boolean>(false);
	const {
		data: businessDetail,
		isLoading,
		error,
	} = useGetUserBusinessDetail(businessId);

	const handleBackArrowClick = () => {
		router.back();
	};

	const handleStartConsultBtnClick = () => {
		setIsConsultModalOpen(true);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		toast.error(error.message);
	}

	if (!businessDetail) {
		return null;
	}

	return (
		<div className='relative'>
			<HeaderWithBackArrow
				headerTitle={category}
				handleBackArrowClick={handleBackArrowClick}
				hasRightConfirmButton={false}
			/>
			<div className='flex flex-col gap-[52px] pb-[100px]'>
				<BusinessCard
					businessItem={{
						name: businessDetail.data.name,
						mainImageUrl: businessDetail.data.mainImageUrl,
						businessHours: businessDetail.data.businessHours,
						phoneNumber: businessDetail.data.phoneNumber,
						category: businessDetail.data.category,
						address: businessDetail.data.address,
					}}
				/>
				{businessDetail.data.services.some(
					(service) => service.type === '기본항목',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='기본항목' />
						<PrimaryServiceList services={businessDetail.data.services} />
					</div>
				)}

				{businessDetail.data.services.some(
					(service) => service.type === '선택항목',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='선택항목' />
						<OptionalServiceList services={businessDetail.data.services} />
					</div>
				)}
				{businessDetail.data.services.some(
					(service) => service.type === '패키지',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='패키지' />
						<PackageServiceList services={businessDetail.data.services} />
					</div>
				)}
				{(businessDetail.data.additionalInfo.description ||
					businessDetail.data.additionalInfo.images) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='기타정보' />
						<AdditionalInfoList
							additionalInfo={businessDetail.data.additionalInfo}
						/>
					</div>
				)}
			</div>
			<div className='min-w-[320px] w-full max-w-[550px] fixed bottom-[18px] left-[50%] -translate-x-[50%] z-50 flex justify-center'>
				<StartConsultButton
					handleClick={handleStartConsultBtnClick}
					salePercentageNum={5}
				/>
			</div>
			{isConsultModalOpen && (
				<ModalLayout setIsModalOpen={setIsConsultModalOpen}>
					<ConsultModal
						setIsModalOpen={setIsConsultModalOpen}
						setIsRequestCompleteModalOpen={setIsRequestSuccessModalOpen}
						businessId={businessId}
					/>
				</ModalLayout>
			)}
			{isRequestSuccessModalOpen && (
				<ModalLayout setIsModalOpen={setIsRequestSuccessModalOpen}>
					<AlertModal
						modalConfirmText='상담 요청이 완료되었습니다.'
						setIsModalOpen={setIsRequestSuccessModalOpen}
					/>
				</ModalLayout>
			)}
		</div>
	);
}

export default UserViewBusiness;
