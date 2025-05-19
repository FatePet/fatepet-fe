'use client';
import AdditionalInfoList from '@/app/user/view-business/[category]/[businessId]/_components/AdditionalInfoList';
import { getBusinessDetailData } from '@/app/user/view-business/[category]/[businessId]/_components/mockupData';
import OptionalServiceList from '@/app/user/view-business/[category]/[businessId]/_components/OptionalServiceList';
import PackageServiceList from '@/app/user/view-business/[category]/[businessId]/_components/PackageServiceList';
import PrimaryServiceList from '@/app/user/view-business/[category]/[businessId]/_components/PrimaryServiceList';
import TextWithUnderLine from '@/app/user/view-business/[category]/[businessId]/_components/TextWithUnderLine';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import CancelConfirmModal from '@/components/modals/CancelConfirmModal';
import ModalLayout from '@/components/modals/ModalLayout';
import BusinessCard from '@/components/user/BusinessCard';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

function AdminViewBusiness() {
	const router = useRouter();
	const params = useParams();
	const businessId = params.businessId as string;
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

	const handleBackArrowClick = () => {
		router.back();
	};

	const handleGoEditBtnClick = () => {
		router.push(`/admin/edit-business/${businessId}`);
	};

	const handleDeleteBtnClick = () => {
		setIsDeleteModalOpen(true);
	};

	const handleCancelBtnClick = () => {
		setIsDeleteModalOpen(false)
	}

	const handleBusinessDelete = () => {
		// 업체 삭제 api 연동 로직

		// 성공 시 
		router.back();
	}

	return (
		<div className='relative'>
			<HeaderWithBackArrow
				headerTitle=''
				handleBackArrowClick={handleBackArrowClick}
				hasRightConfirmButton={true}
				handleRightButtonClick={handleGoEditBtnClick}
				type='수정'
				handleDeleteButtonClick={handleDeleteBtnClick}
			/>
			{isDeleteModalOpen && (
				<ModalLayout setIsModalOpen={setIsDeleteModalOpen}>
					<CancelConfirmModal
						modalConfirmText='해당 업체를 정말 삭제하실 건가요?'
						leftButtonText='업체 삭제'
						rightButtonText='취소'
						handleLeftButtonClick={handleBusinessDelete}
						handleRightButtonClick={handleCancelBtnClick}
					/>
				</ModalLayout>
			)}
			<div className='flex flex-col gap-[52px] pb-[100px]'>
				<BusinessCard
					businessItem={{
						name: getBusinessDetailData.data.name,
						thumbnailUrl: getBusinessDetailData.data.thumbnailUrl,
						businessHours: getBusinessDetailData.data.businessHours,
						phoneNumber: getBusinessDetailData.data.phoneNumber,
						category: getBusinessDetailData.data.category,
						address: getBusinessDetailData.data.address,
					}}
				/>
				{getBusinessDetailData.data.services.some(
					(service) => service.type === '기본항목',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='기본항목' />
						<PrimaryServiceList
							services={getBusinessDetailData.data.services}
						/>
					</div>
				)}

				{getBusinessDetailData.data.services.some(
					(service) => service.type === '선택항목',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='선택항목' />
						<OptionalServiceList
							services={getBusinessDetailData.data.services}
						/>
					</div>
				)}
				{getBusinessDetailData.data.services.some(
					(service) => service.type === '패키지',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='패키지' />
						<PackageServiceList
							services={getBusinessDetailData.data.services}
						/>
					</div>
				)}
				{(getBusinessDetailData.data.additionalInfo.description ||
					getBusinessDetailData.data.additionalInfo.imageUrl) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='기타정보' />
						<AdditionalInfoList
							additionalInfo={getBusinessDetailData.data.additionalInfo}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default AdminViewBusiness;
