'use client';
import AdditionalInfoList from '@/app/user/view-business/[category]/[businessId]/_components/AdditionalInfoList';
import OptionalServiceList from '@/app/user/view-business/[category]/[businessId]/_components/OptionalServiceList';
import PackageServiceList from '@/app/user/view-business/[category]/[businessId]/_components/PackageServiceList';
import PrimaryServiceList from '@/app/user/view-business/[category]/[businessId]/_components/PrimaryServiceList';
import TextWithUnderLine from '@/app/user/view-business/[category]/[businessId]/_components/TextWithUnderLine';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import CancelConfirmModal from '@/components/modals/CancelConfirmModal';
import ModalLayout from '@/components/modals/ModalLayout';
import BusinessCard from '@/components/user/BusinessCard';
import { useDeleteAdminBusiness } from '@/hooks/api/admin/business/useDeleteAdminBusiness';
import { useGetAdminBusinessDetail } from '@/hooks/api/admin/business/useGetAdminBusinessDetail';
import useAuthStore from '@/store/useAuthStore';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

function AdminViewBusiness() {
	const router = useRouter();
	const params = useParams();
	const businessId = params.businessId as string;
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const { accessToken, setAccessToken } = useAuthStore();
	const { data: businessDetail, isLoading } = useGetAdminBusinessDetail(
		businessId,
		accessToken,
		setAccessToken
	);
	const { mutate: deleteBusiness } = useDeleteAdminBusiness(
		accessToken,
		businessId,
		setAccessToken,
	);

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
		setIsDeleteModalOpen(false);
	};

	const handleBusinessDelete = () => {
		deleteBusiness();
	};

	if (isLoading) {
		return <LoadingSpinner/>
	}

	if (!businessDetail) {
		return null;
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
						rightButtonText='업체 삭제'
						leftButtonText='취소'
						handleRightButtonClick={handleBusinessDelete}
						handleLeftButtonClick={handleCancelBtnClick}
					/>
				</ModalLayout>
			)}
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
					(service) => service.category === '기본항목',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='기본항목' />
						<PrimaryServiceList services={businessDetail.data.services} />
					</div>
				)}

				{businessDetail.data.services.some(
					(service) => service.category === '선택항목',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='선택항목' />
						<OptionalServiceList services={businessDetail.data.services} />
					</div>
				)}
				{businessDetail.data.services.some(
					(service) => service.category === '패키지',
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
		</div>
	);
}

export default AdminViewBusiness;
